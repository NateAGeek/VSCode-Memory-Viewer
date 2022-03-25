import * as VSCodeWebviewUIToolkit from '@vscode/webview-ui-toolkit';
declare module 'solid-js/types/jsx' {
  namespace JSX {
      interface IntrinsicElements {
        ['vscode-text-field']: InputHTMLAttributes<VSCodeWebviewUIToolkit.TextField>;
        ['vscode-button']: ButtonHTMLAttributes<VSCodeWebviewUIToolkit.Button>;
      }
  }
}