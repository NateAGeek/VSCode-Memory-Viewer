import { CancellationToken, Uri, Webview, WebviewView, WebviewViewProvider, WebviewViewResolveContext } from "vscode";
import { getUri } from "./utilites/getUri";
import * as vscode from 'vscode';

export class MemoryViewerViewProvider implements WebviewViewProvider {
  public static readonly viewType = "memoryViewer.webview";

  constructor(private readonly _extensionUri: Uri) {}

  resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    token: CancellationToken
  ): void | Thenable<void> {
    // Allow scripts in the webview
    webviewView.webview.options = {
      enableScripts: true,
    };

    // Set the HTML content that will fill the webview view
    webviewView.webview.html = this._getWebviewContent(webviewView.webview, this._extensionUri);

    // Sets up an event listener to listen for messages passed from the webview view context
    // and executes code based on the message that is recieved
    this._setWebviewMessageListener(webviewView);
  }

  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ]);
    const mainUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "index.js"]);
    const solidVendorUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "vendor.js"]);
    const stylesUri = getUri(webview, extensionUri, ["webview", "dist", "assets", "index.css"]);

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script type="module" src="${toolkitUri}"></script>
          <script type="module" crossorigin src="${mainUri}"></script>
          <link rel="modulepreload" href="${solidVendorUri}">
          <link rel="stylesheet" href="${stylesUri}">
          <title>Memory Viewer</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>
        </body>
      </html>
		`;
  }

  private _setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message) => {
      console.log("Received message from webview: ", message);
      switch (message.command) {
        case "readMemory":
          const activeDebugSession = vscode.debug.activeDebugSession;
          if (activeDebugSession !== undefined) {
            activeDebugSession.customRequest("readMemory", {
              memoryReference: message.address,
              count: 100,
            }).then((response) => {
              console.log("Got response", response);
              webviewView.webview.postMessage(response);
            });
          } else {
            console.log("Not is a valid session...");
          }
          break;
      }
    });
  }
}