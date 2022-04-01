import { createSignal, onMount } from 'solid-js';
import MemoryViewerData from './componenets/MemoryViewerData';
import MemoryViewerHeader from './componenets/MemoryViewerHeader';
// import { VSCodeAPI } from '.';
import styles from './MemoryViewer.module.css';

export default function MemoryViewer() {
  return (
    <div class={styles.MemoryViewer}>
      <div style={{
        "overflow-x": 'scroll'
      }}>
        <MemoryViewerHeader/>
        <MemoryViewerData/>
      </div>
    </div>
  );
};

