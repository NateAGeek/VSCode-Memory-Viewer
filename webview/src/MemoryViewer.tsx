import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import MemoryViewerBufferTable from './componenets/MemoryViewerBufferTable';
import MemoryViewerHeader from './componenets/MemoryViewerHeader';
import {vscode} from './utilities/vscode';
import styles from './MemoryViewer.module.css';

const BUFFER_SIZE = 8 * 256;
let ACTIVE_OFFSET_NEGATIVE = 0;
let ACTIVE_OFFSET_POSITIVE = 0;

export default function MemoryViewer() {
  const [bytes, setBytes] = createSignal<any[]>([]);
  const [address, setAddress] = createSignal("");
  const [activeNegativeOffset, setActiveNegativeOffset] = createSignal(0);
  const [activePositiveOffset, setActivePositiveOffset] = createSignal(0);
  const onMessageCallback = (message: any) => {
    console.log("Message", message);
    setBytes([]);
    var binaryString = window.atob(message.data.data);
    var len = binaryString.length;
    var collectedBytes = new Array(len);
    for (var i = 0; i < len; i++) {
      collectedBytes[i] = binaryString.charCodeAt(i);
    }
    if (message.data.direction === "NEGATIVE") {
      console.log("Should have preappended the bytes");
      setBytes([...collectedBytes, ...bytes()]);
    } else {
      setBytes([...bytes(), ...collectedBytes]);
    }
    
  };

  createEffect(() => {
    vscode.postMessage({
      command: "readMemory",
      address: address(),
      offset: 0,
      bufferSize: BUFFER_SIZE
    });
    setActivePositiveOffset(0);
    setActiveNegativeOffset(0);
  });

  onMount(() => {
    window.addEventListener('message', onMessageCallback);
    vscode.postMessage({
      command: "readMemory",
      address: address(),
      offset: activePositiveOffset(),
      bufferSize: BUFFER_SIZE
    });
    setActivePositiveOffset(activePositiveOffset() + BUFFER_SIZE);
  });
  onCleanup(() => {
    window.removeEventListener('message', onMessageCallback);
  });

  return (
    <div class={styles.MemoryViewer}>
      <MemoryViewerHeader 
      onRefresh={() => {
        vscode.postMessage({
          command: "readMemory",
          address: address(),
          offset: 0,
          bufferSize: BUFFER_SIZE
        });
        ACTIVE_OFFSET_POSITIVE = 0;
        ACTIVE_OFFSET_NEGATIVE = 0;
      }}
      onAddressEntered={(address) => {
        console.log("Set address", address);
        setAddress(address);
      }}/>
      <MemoryViewerBufferTable
        startAddress={parseInt(address(), 16) - activeNegativeOffset()}
        bytes={bytes()}
        onScrollTop={() => {
          // vscode.postMessage({
          //   command: "readMemory",
          //   address: address(),
          //   offset: activeNegativeOffset(),
          //   bufferSize: BUFFER_SIZE
          // });
          // setActiveNegativeOffset(activeNegativeOffset() - BUFFER_SIZE);
        }}
        onScrollBottom={() => {
          // vscode.postMessage({
          //   command: "readMemory",
          //   address: address(),
          //   offset: activePositiveOffset(),
          //   bufferSize: BUFFER_SIZE
          // });
          // setActivePositiveOffset(activePositiveOffset() + BUFFER_SIZE);
        }}
      />
    </div>
  );
};

