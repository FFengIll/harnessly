import * as vscode from 'vscode';
import { VibelyCompletionProvider } from './completionProvider';

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Vibely extension is now active!');

  const provider = new VibelyCompletionProvider();

  const selector: vscode.DocumentSelector = [
    { scheme: 'file', language: 'vibely' },
    { scheme: 'file', language: 'markdown' }
  ];

  // Register with both trigger characters for different contexts
  const completionDisposable = vscode.languages.registerCompletionItemProvider(
    selector,
    provider,
    '@',
    '#'
  );

  const triggerCommand = vscode.commands.registerCommand(
    'tingly-spec.triggerCompletion',
    () => vscode.commands.executeCommand('editor.action.triggerSuggest')
  );

  context.subscriptions.push(completionDisposable, triggerCommand);

  console.log('Vibely completion provider registered');
}

/**
 * Extension deactivation
 */
export function deactivate() {
  console.log('Vibely extension deactivated');
}
