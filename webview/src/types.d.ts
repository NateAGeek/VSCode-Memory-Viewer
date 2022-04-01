import * as VSCodeWebviewUIToolkit from '@vscode/webview-ui-toolkit';
declare module 'solid-js/types/jsx' {
  namespace JSX {
      interface IntrinsicElements {
        ['vscode-text-field']: InputHTMLAttributes<VSCodeWebviewUIToolkit.TextField>;
        ['vscode-button']: HTMLAttributes<VSCodeWebviewUIToolkit.Button> & {appearance: string};
        ['vscode-divider']: HTMLAttributes<VSCodeWebviewUIToolkit.Divider>;
      }
  }
}