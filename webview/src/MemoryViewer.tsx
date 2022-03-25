import { createSignal, createEffect } from 'solid-js';
import { VSCodeAPI } from '.';
import styles from './MemoryViewer.module.css';

export default function MemoryViewer() {
  const [memory, setMemory] = createSignal('');
  const [memoryBuffer, setMemoryBuffer] = createSignal('');
  createEffect(() => {
    VSCodeAPI.onMessage(message => {
      console.log("Message from extension:", message.data.data);
      const hexs = Uint8Array.from(atob(message.data.data), c => c.charCodeAt(0));
      const hexString = Array.from(hexs).map(c => c.toString(16).padStart(2, '0')).join('|0x');
      setMemoryBuffer(hexString);
    });
  });

  return (
    <div class={styles.MemoryViewer}>
      <div style={{
        "display": 'flex',
        "align-items": 'center',
      }}>
        <span style={{
          "margin-right": '0.5em',
        }}>Address:</span>
        <vscode-text-field onInput={(e) => {
          setMemory(e.target.value);
        }}/>
        <vscode-button onClick={() => {
          VSCodeAPI.postMessage({
            command: 'readMemory',
            address: memory(),
          });
        }}>Send Message</vscode-button>
      </div>
      <div>
        {memory()}
        <h1>Memory Buffer</h1>
        {memoryBuffer()}
      </div>
    </div>
  );
};

