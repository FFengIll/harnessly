import * as vscode from 'vscode';

/**
 * Convert SymbolKind to CompletionItemKind
 */
export function symbolKindToCompletionKind(symbolKind: vscode.SymbolKind): vscode.CompletionItemKind {
  switch (symbolKind) {
    case vscode.SymbolKind.Function:
      return vscode.CompletionItemKind.Function;
    case vscode.SymbolKind.Method:
      return vscode.CompletionItemKind.Method;
    case vscode.SymbolKind.Class:
      return vscode.CompletionItemKind.Class;
    case vscode.SymbolKind.Interface:
      return vscode.CompletionItemKind.Interface;
    case vscode.SymbolKind.Variable:
      return vscode.CompletionItemKind.Variable;
    case vscode.SymbolKind.Constant:
      return vscode.CompletionItemKind.Constant;
    case vscode.SymbolKind.Property:
      return vscode.CompletionItemKind.Property;
    case vscode.SymbolKind.Enum:
      return vscode.CompletionItemKind.Enum;
    case vscode.SymbolKind.EnumMember:
      return vscode.CompletionItemKind.EnumMember;
    case vscode.SymbolKind.Struct:
      return vscode.CompletionItemKind.Struct;
    case vscode.SymbolKind.TypeParameter:
      return vscode.CompletionItemKind.TypeParameter;
    default:
      return vscode.CompletionItemKind.Reference;
  }
}