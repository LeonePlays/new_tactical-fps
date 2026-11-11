import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths keep the production build portable: it can be served
  // from a domain root, a sub-directory, or a static file host.
  base: './',
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
          return undefined;
        },
      },
    },
  },
});
