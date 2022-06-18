import { createSignal } from "solid-js";


export interface MemoryViewerHeaderProps {
  onAddressEntered: (address: string) => void
  onRefresh: () => void
}

export default function MemoryViewerHeader({
  onAddressEntered,
  onRefresh
}: MemoryViewerHeaderProps) {
  return (
    <div style={{
      'display': 'flex',
      'flex-direction': 'row',
      "margin-top": '4px',
      "margin-bottom": '4px',
    }}>
      <vscode-text-field
      onKeyUp={(e: any) => {
        if(e.key === "Enter") {
          console.log("e", e);
          e.target.blur();
          onAddressEntered(e.target.value);
        }
      }}
      style={{
        flex: '1',
        "margin-right": '4px',
      }} placeholder="Enter Hex Address or Variable Name...">
        <span slot="end" class="codicon codicon-search"></span>
      </vscode-text-field>
      <vscode-button onClick={() => {onRefresh()}} appearance="icon" aria-label="Confirm">
	      <span class="codicon codicon-refresh"></span>
      </vscode-button>
      <vscode-button appearance="icon" aria-label="Confirm">
	      <span class="codicon codicon-settings"></span>
      </vscode-button>
    </div>
  );
}