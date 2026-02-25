import * as vscode from 'vscode';

/**
 * File cache to avoid repeated workspace scans
 */
export class FileCache {
  private cache: Map<string, vscode.Uri[]> = new Map();
  private cacheValid = false;
  private watcher: vscode.Disposable | undefined;

  constructor() {
    // Watch for file changes to invalidate cache
    this.watcher = vscode.workspace.onDidChangeTextDocument(() => {
      this.invalidate();
    });
  }

  get(workspacePath: string): vscode.Uri[] | undefined {
    if (this.cacheValid) {
      return this.cache.get(workspacePath);
    }
    return undefined;
  }

  set(workspacePath: string, files: vscode.Uri[]): void {
    this.cache.set(workspacePath, files);
    this.cacheValid = true;
  }

  invalidate(): void {
    this.cacheValid = false;
  }

  dispose(): void {
    this.watcher?.dispose();
  }
}