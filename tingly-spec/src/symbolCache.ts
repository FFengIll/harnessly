import * as vscode from 'vscode';

/**
 * Symbol cache to avoid repeated LSP calls
 * Maps file URI to its symbols and version
 */
export class SymbolCache {
  private cache: Map<string, {
    symbols: vscode.DocumentSymbol[];
    timestamp: number;
  }> = new Map();
  private watcher: vscode.Disposable | undefined;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Invalidate cache when documents change
    this.watcher = vscode.workspace.onDidChangeTextDocument((e) => {
      this.invalidate(e.document.uri.toString());
    });
  }

  get(uri: string): vscode.DocumentSymbol[] | undefined {
    const entry = this.cache.get(uri);
    if (!entry) {
      return undefined;
    }

    // Check if cache is still valid
    const now = Date.now();
    if (now - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(uri);
      return undefined;
    }

    return entry.symbols;
  }

  set(uri: string, symbols: vscode.DocumentSymbol[]): void {
    this.cache.set(uri, {
      symbols,
      timestamp: Date.now()
    });
  }

  invalidate(uri: string): void {
    this.cache.delete(uri);
  }

  clear(): void {
    this.cache.clear();
  }

  dispose(): void {
    this.watcher?.dispose();
  }
}