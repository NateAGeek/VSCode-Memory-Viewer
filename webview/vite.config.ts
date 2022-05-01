import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig((_) => ({
  plugins: [solidPlugin()],
  server: {
    fs: {
      allow: ['../node_modules', './'],
    }
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
}));
