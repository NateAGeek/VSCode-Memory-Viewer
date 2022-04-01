import styles from './styles.module.css';

export interface MemoryViewerDataProps {
  // rowBufferLength: number
}

export default function MemoryViewerData({}: MemoryViewerDataProps) {
  const rowBufferLength = 8;

  function buildBufferLength(rowBufferLength: number, boldSteps: number) {
    const headerItems = [];
    for(let i = 0; i < rowBufferLength; i++) {
      headerItems.push((
        <th style={{
          'padding-left': '4px',
          'padding-right': '4px',
        }}>{i.toString().padStart(2, '0')}</th>
      ));
    }
    return headerItems;
  }
  const bytes = Uint8Array.from([72, 45, 25, 4, 55, 6, 7, 8]);
  return (
    <table style={{
      "border-spacing": 0,
    }}>
      <thead style={{
        
      }}>
        <tr>
          <th style={{
            position: 'sticky',
            left: 0,
            'text-align': 'left',
            'background-color': 'var(--vscode-sideBar-background)',
          }} >Address</th>
          {buildBufferLength(rowBufferLength, 4)}
          <th style={{
            'text-align': 'left',
            'padding-left': '32px',

          }}>Decoded Text</th>
        </tr>
        <tr>
          <td colspan="1000">
            <div style={{
              height: '2px',
              width: '95%',
              "margin": '2px auto',
              "background-color": '#CCC'
            }}/>
          </td>
        </tr>
      </thead>
      <tbody>
        <MemoryViewerDataRow address={28} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*2} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*3} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*4} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*5} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*6} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*7} addressLength={8} bytes={bytes}/>
        <MemoryViewerDataRow address={28 + 8*8} addressLength={8} bytes={bytes}/>
      </tbody>
    </table>
  );
} 

export interface MemoryViewerDataRowProps {
  address: number,
  addressLength: number,
  bytes: Uint8Array,
}

function MemoryViewerDataRow({
  address,
  addressLength,
  bytes,
}: MemoryViewerDataRowProps) {

  function buildRowBuffer(bytes: Uint8Array) {
    const bytesHex: string[] = [];
    const bytesAscii: string[] = [];
    return bytes.reduce((acc, byte) => {
      acc.bytesHex.push(byte.toString(16).padStart(2, '0').toLowerCase());
      acc.bytesAscii.push(byte >= 33 && byte <= 126 ? String.fromCharCode(byte) : "·");
      return acc;
    }, {
      bytesHex: [],
      bytesAscii: []
    } as {
      bytesHex: string[],
      bytesAscii: string[]
    });
  }
  const stuff = buildRowBuffer(bytes);
  return (
  <tr>
    <td className='monaco-highlighted-label' style={{
      position: 'sticky',
      left: 0,
      'background-color': 'var(--vscode-sideBar-background)',
      "font-family": 'var(--vscode-editor-font-family)',
      "color": '#c586c0'
    }}>0x{address.toString(16).padStart(addressLength, '0')}:</td>
    {stuff.bytesHex.map((v, i) => 
      <td className='monaco-highlighted-label' style={{
        "font-family": 'var(--vscode-editor-font-family)',
        "text-align": 'center',
        "font-weight": 100
      }}>{v}</td>  
    )}
    <td style={{
      "white-space": "nowrap",
      "padding-left": "32px",
      "font-weight": 600
    }}>
      {stuff.bytesAscii.map((v, i) => (<span style={{
        "padding-right": i !== stuff.bytesAscii.length-1 ? '16px' : '0px',
        "text-align": 'center'
      }}>
        {v}
      </span>))}
    </td>
  </tr>
  );
}