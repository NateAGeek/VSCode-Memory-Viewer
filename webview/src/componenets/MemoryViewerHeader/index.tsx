

export interface MemoryViewerHeaderProps {

}

export default function MemoryViewerHeader({}: MemoryViewerHeaderProps) {
  return (
    <div style={{
      'display': 'flex',
      'flex-direction': 'row',
      "margin-top": '4px',
      "margin-bottom": '4px',
    }}>
      <vscode-text-field style={{
        flex: '1',
        "margin-right": '4px',
      }} placeholder="Enter Hex Address or Variable Name..."/>
      <vscode-button appearance="icon" aria-label="Confirm">
	      <span class="codicon codicon-refresh"></span>
      </vscode-button>
      <vscode-button appearance="icon" aria-label="Confirm">
	      <span class="codicon codicon-settings"></span>
      </vscode-button>
    </div>
  );
}