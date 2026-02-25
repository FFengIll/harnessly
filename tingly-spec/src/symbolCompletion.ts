import * as path from 'path';
import * as vscode from 'vscode';
import { symbolKindToCompletionKind } from './symbolKindMapper';
import { SymbolCache } from './symbolCache';

/**
 * Provide symbol completion using VSCode's symbol provider
 */
export class SymbolCompletion {
  private readonly MAX_SYMBOLS = 100;
  private symbolCache: SymbolCache;
  private preloadInProgress: Set<string> = new Set();

  constructor(symbolCache: SymbolCache) {
    this.symbolCache = symbolCache;
  }

  async provide(
    document: vscode.TextDocument,
    position: vscode.Position,
    textBeforeCursor: string,
    token: vscode.CancellationToken
  ): Promise<vscode.CompletionItem[]> {
    // Match @path/to/file# - extract file path before #
    const match = textBeforeCursor.match(/@([^\s#]+)#$/);
    if (!match) {
      return [];
    }

    const filePath = match[1];
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!workspaceFolder) {
      return [];
    }

    // Resolve path using VSCode utilities
    const targetUri = this.resolveFileUri(filePath, workspaceFolder.uri);
    if (!targetUri) {
      return [];
    }

    if (token.isCancellationRequested) {
      return [];
    }

    // Try to get from cache first
    let symbols = this.symbolCache.get(targetUri.toString());

    if (!symbols) {
      // Not cached, fetch from LSP
      symbols = await this.fetchSymbols(targetUri, token);
      if (symbols && symbols.length > 0 && !token.isCancellationRequested) {
        this.symbolCache.set(targetUri.toString(), symbols);
      }
    }

    if (!symbols || symbols.length === 0) {
      return [];
    }

    return this.createCompletionItems(symbols, document, position);
  }

  /**
   * Preload symbols for a file (called during file scanning)
   */
  async preload(uri: vscode.Uri, token: vscode.CancellationToken): Promise<void> {
    const uriStr = uri.toString();

    // Skip if already cached or already preloading
    if (this.symbolCache.get(uriStr) || this.preloadInProgress.has(uriStr)) {
      return;
    }

    this.preloadInProgress.add(uriStr);

    try {
      const symbols = await this.fetchSymbols(uri, token);
      if (symbols && symbols.length > 0 && !token.isCancellationRequested) {
        this.symbolCache.set(uriStr, symbols);
      }
    } finally {
      this.preloadInProgress.delete(uriStr);
    }
  }

  /**
   * Fetch symbols from LSP
   */
  private async fetchSymbols(
    uri: vscode.Uri,
    token: vscode.CancellationToken
  ): Promise<vscode.DocumentSymbol[] | undefined> {
    try {
      return await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
        'vscode.executeDocumentSymbolProvider',
        uri
      );
    } catch {
      return undefined;
    }
  }

  private resolveFileUri(filePath: string, workspaceUri: vscode.Uri): vscode.Uri | undefined {
    try {
      if (path.isAbsolute(filePath)) {
        return vscode.Uri.file(filePath);
      }
      // Resolve relative to workspace root
      return vscode.Uri.joinPath(workspaceUri, filePath);
    } catch {
      return undefined;
    }
  }

  private createCompletionItems(
    symbols: vscode.DocumentSymbol[],
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];

    // Calculate range: from after # to cursor position
    const lineText = document.lineAt(position.line).text;
    const hashIndexInLine = lineText.lastIndexOf('#', position.character);

    if (hashIndexInLine === -1) {
      return [];
    }

    const range = new vscode.Range(
      position.line,
      hashIndexInLine + 1,
      position.line,
      position.character
    );

    let count = 0;
    const processSymbols = (symbols: vscode.DocumentSymbol[], parentName = '') => {
      for (const symbol of symbols) {
        if (count >= this.MAX_SYMBOLS) {
          break;
        }

        const fullName = parentName ? `${parentName}.${symbol.name}` : symbol.name;

        const startLine = symbol.range.start.line + 1;
        const endLine = symbol.range.end.line + 1;

        const item = new vscode.CompletionItem({
          label: symbol.name,
          description: `Lines ${startLine}-${endLine}`
        }, symbolKindToCompletionKind(symbol.kind));

        item.insertText = `:${startLine}-${endLine} ${fullName}`;
        item.range = range;
        item.sortText = `${String(symbol.range.start.line).padStart(6, '0')}-${symbol.name}`;

        // Delete the # after insertion
        item.additionalTextEdits = [
          vscode.TextEdit.delete(new vscode.Range(position.line, hashIndexInLine, position.line, hashIndexInLine + 1))
        ];

        items.push(item);
        count++;

        if (symbol.children?.length > 0) {
          processSymbols(symbol.children, fullName);
        }
      }
    };

    processSymbols(symbols);
    return items;
  }
}