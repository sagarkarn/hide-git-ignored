# Hide Git Ignored

A Visual Studio Code extension that toggles visibility of git-ignored files and folders in Explorer.

## Features

- Command: **Hide Git-Ignored: Toggle**
- Command: **Hide Git-Ignored: Hide**
- Command: **Hide Git-Ignored: Show**
- Status bar button for one-click toggle

The extension updates VS Code's built-in setting `explorer.excludeGitIgnore`.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Compile:

   ```bash
   npm run compile
   ```

3. Press `F5` in VS Code to launch an Extension Development Host.

## Package extension

```bash
npx vsce package
```

## Icon attribution

- Explorer button icon file: `media/eye-slash.svg`
- Source: Bootstrap Icons (open source)
- URL: https://github.com/twbs/icons/blob/main/icons/eye-slash.svg
- License: MIT
