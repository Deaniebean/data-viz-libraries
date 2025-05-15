import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,              // Automatically opens report in browser
      filename: 'stats.html',  // Optional: name of the output file
      gzipSize: true,          // Optional: show gzip sizes
      brotliSize: true         // Optional: show brotli sizes
    })
  ],
  base: "/data-viz-libraries/",
});