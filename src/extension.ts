import * as vscode from 'vscode';

const SETTING_KEY = 'explorer.excludeGitIgnore';

function readCurrentState(): boolean {
  return vscode.workspace.getConfiguration('explorer').get<boolean>('excludeGitIgnore', false);
}

async function writeState(hideIgnored: boolean): Promise<void> {
  const target = vscode.workspace.workspaceFolders?.length
    ? vscode.ConfigurationTarget.Workspace
    : vscode.ConfigurationTarget.Global;

  await vscode.workspace
    .getConfiguration('explorer')
    .update('excludeGitIgnore', hideIgnored, target);
}

function statusText(isHidden: boolean): string {
  return isHidden
    ? '$(eye-closed) Git-Ignored: Hidden'
    : '$(eye) Git-Ignored: Visible';
}

async function setHiddenState(hideIgnored: boolean, statusBar: vscode.StatusBarItem): Promise<void> {
  await writeState(hideIgnored);
  statusBar.text = statusText(hideIgnored);
  const message = hideIgnored
    ? 'Git-ignored files and folders are now hidden.'
    : 'Git-ignored files and folders are now visible.';
  void vscode.window.setStatusBarMessage(message, 2500);
}

export function activate(context: vscode.ExtensionContext): void {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBar.command = 'hideGitIgnored.toggle';
  statusBar.tooltip = 'Toggle visibility of git-ignored files/folders';
  statusBar.text = statusText(readCurrentState());
  statusBar.show();

  const toggle = vscode.commands.registerCommand('hideGitIgnored.toggle', async () => {
    const next = !readCurrentState();
    await setHiddenState(next, statusBar);
  });

  const hide = vscode.commands.registerCommand('hideGitIgnored.hide', async () => {
    await setHiddenState(true, statusBar);
  });

  const show = vscode.commands.registerCommand('hideGitIgnored.show', async () => {
    await setHiddenState(false, statusBar);
  });

  const syncStatus = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(SETTING_KEY)) {
      statusBar.text = statusText(readCurrentState());
    }
  });

  context.subscriptions.push(statusBar, toggle, hide, show, syncStatus);
}

export function deactivate(): void {
  // No resources to dispose manually; VS Code handles subscription cleanup.
}
