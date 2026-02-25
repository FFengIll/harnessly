import * as vscode from 'vscode';
import { FileCache } from './fileCache';
import { FileCompletion } from './fileCompletion';
import { SymbolCompletion } from './symbolCompletion';

/**
 * Vibely Completion Provider
 * Provides:
 * 1. File path completion triggered by '@'
 * 2. Symbol completion triggered by '#' after a file path
 */
export class VibelyCompletionProvider implements vscode.CompletionItemProvider {
  private fileCompletion: FileCompletion;
  private symbolCompletion: SymbolCompletion;

  constructor() {
    const fileCache = new FileCache();
    this.fileCompletion = new FileCompletion(fileCache);
    this.symbolCompletion = new SymbolCompletion();
  }

  /**
   * Main completion entry point
   * Always checks if cursor is in a valid completion context:
   * - After '@' for file path completion
   * - After '@path#' for symbol completion
   */
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[] | undefined> {
    const lineText = document.lineAt(position.line).text;
    const textBeforeCursor = lineText.substring(0, position.character);

    // Check if we're in symbol completion context: @path/to/file#
    const symbolMatch = textBeforeCursor.match(/@([^\s#]+)#$/);
    if (symbolMatch) {
      return this.symbolCompletion.provide(document, position, textBeforeCursor, token);
    }

    // Check if we're in file completion context: @partial/path
    const fileMatch = textBeforeCursor.match(/@([^\s#]*)$/);
    if (fileMatch) {
      // If ends with #, provide symbol completion
      if (textBeforeCursor.endsWith('#')) {
        return this.symbolCompletion.provide(document, position, textBeforeCursor, token);
      }
      // Otherwise provide file completion
      return this.fileCompletion.provide(document, position, textBeforeCursor, token);
    }

    return undefined;
  }
}