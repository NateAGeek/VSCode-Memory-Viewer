/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import '../../node_modules/@vscode/webview-ui-toolkit/dist/toolkit';
import '../../node_modules/@vscode/codicons/dist/codicon.css';
import MemoryViewer from './MemoryViewer';

// declare const acquireVsCodeApi: Function;

// interface VSCodeApi {
//     getState: () => any;
//     setState: (newState: any) => any;
//     postMessage: (message: any) => void;
// }

// class VSCodeWrapper {
//     private readonly vscodeApi: VSCodeApi;

//     /**
//      * Send message to the extension framework.
//      * @param message
//      */
//     public postMessage(message: any): void {
//         this.vscodeApi.postMessage(message);
//     }

//     /**
//      * Add listener for messages from extension framework.
//      * @param callback called when the extension sends a message
//      * @returns function to clean up the message eventListener.
//      */
//     public onMessage(callback: (message: any) => void): () => void {
//         window.addEventListener('message', callback);
//         return () => window.removeEventListener('message', callback);
//     }
// }

// Singleton to prevent multiple fetches of VsCodeAPI.
// export const VSCodeAPI: VSCodeWrapper = new VSCodeWrapper();

render(() => <MemoryViewer />, document.getElementById('root') as HTMLElement);
