import styles from './styles.module.css';

export interface MemoryViewerBufferTableProps {
  // rowBufferLength: number
  startAddress: number,
  bytes:  number[],
  onScrollTop: () => void,
  onScrollBottom: () => void,
}

function buildBufferLength(rowBufferLength: number) {
  const headerItems = [];
  for(let i = 0; i < rowBufferLength; i++) {
    headerItems.push((
      <th style={{
        position: 'sticky',
        top: 0,
        "z-index": 998,
        'padding-left': '4px',
        'padding-right': '4px',
        'background-color': 'var(--vscode-sideBar-background)',
      }}>{i.toString().padStart(2, '0')}</th>
    ));
  }
  return headerItems;
}
function buildBufferRows(startAddress: number, bytes: number[], rowBufferLength: number) {
  const rows = [];
  for(let addressStep = 0; addressStep < bytes.length; addressStep += rowBufferLength) {
    rows.push((
      <MemoryViewerDataRow address={startAddress + addressStep} bytes={bytes.slice(addressStep, addressStep + rowBufferLength)} addressLength={8}/>
    ));
  }
  return rows;
}

const debounce = function(func: Function, delay: number) {
  let timer: number;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer); 
    timer = setTimeout(()=> {
      func.apply(context, args);
    }, delay);
  };
};

export default function MemoryViewerBufferTable(props: MemoryViewerBufferTableProps) {
  const rowBufferLength = 8;
  const handleScroll = debounce((event: 
  UIEvent & {
    currentTarget: HTMLDivElement;
    target: Element;
  }) => {
    if(event.target.scrollTop >= event.target.scrollHeight - event.target.clientHeight) {
      props.onScrollBottom();
    } else if (event.target.scrollTop <= 0) {
      props.onScrollTop();
    }
  }, 250);

  return (
    <div onScroll={handleScroll} style={{
      "overflow-y": 'scroll',
    }}>
      <div class={""}/>
    <table style={{
      "border-spacing": 0,
    }}>
      <thead>
        <tr>
          <th colspan={100}>
            <div style={{
              height: '1px',
              width: '100%',
              "background-color": '#424242'
            }}/>
          </th>
        </tr>
        <tr>
          <th style={{
            position: 'sticky',
            left: 0,
            top: 0,
            "z-index": 999,
            'text-align': 'left',
            'background-color': 'var(--vscode-sideBar-background)',
          }} >Address</th>
          {buildBufferLength(rowBufferLength)}
          <th style={{
            position: 'sticky',
            top: 0,
            "z-index": 998,
            'text-align': 'left',
            'padding-left': '32px',
            'width': '100%',
            'background-color': 'var(--vscode-sideBar-background)',
          }}>Decoded ASCII Text</th>
        </tr>
        <tr>
          <td colspan={100}>
            <div style={{
              height: '1px',
              width: '100%',
              "background-color": '#424242'
            }}/>
          </td>
        </tr>
      </thead>
      <tbody>
        {buildBufferRows(props.startAddress, props.bytes, rowBufferLength)}
      </tbody>
    </table>
    </div>
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
      <td style={{
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
        display: 'inline-block',
        "padding-right": i !== stuff.bytesAscii.length-1 ? '16px' : '0px',
        width: '8px',
        "text-align": 'center'
      }}>
        {v}
      </span>))}
    </td>
  </tr>
  );
}