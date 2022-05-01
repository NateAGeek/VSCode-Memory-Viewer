import { createEffect, createSignal } from 'solid-js';
import MemoryViewerBufferTable from './componenets/MemoryViewerBufferTable';
import MemoryViewerHeader from './componenets/MemoryViewerHeader';
// import { VSCodeAPI } from '.';
import styles from './MemoryViewer.module.css';

export default function MemoryViewer() {
  const [bytes, setBytes] = createSignal(Array.from({length:  (8 * 100)}, _ => Math.floor(
    Math.random() * 255
  )));

  createEffect(() => {
    console.log("bytes", bytes());
  });

  return (
    <div class={styles.MemoryViewer}>
      <MemoryViewerHeader/>
      <MemoryViewerBufferTable
        startAddress={0}
        bytes={bytes()}
        onScrollBottom={() => {
          console.log('scroll bottom');
          setBytes([...bytes(), ...Array.from({length:  (8 * 100)}, _ => Math.floor(
            Math.random() * 255
          ))]);
        }}
        onScrollTop={() => {
          console.log('scroll top');
          setBytes([...Array.from({length:  (8 * 100)}, _ => Math.floor(
            Math.random() * 255
          )), ...bytes()]);
        }}
      />
    </div>
  );
};

