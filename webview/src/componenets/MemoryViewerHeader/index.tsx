

export interface MemoryViewerHeaderProps {

}

export default function MemoryViewerHeader({}: MemoryViewerHeaderProps) {
  return (
    <div>
      <vscode-text-field placeholder="Enter Address..."/>
      <vscode-button appearance="icon" aria-label="Confirm">
	      <span class="codicon codicon-refresh"></span>
      </vscode-button>
    </div>
  );
}