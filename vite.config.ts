import { defineConfig } from 'vite'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from './package.json'

export default defineConfig({
  base: './', // NOTE: See also https://vite-plugin-ssr.com/base-url
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),

    // NOTE: Last one
    // See also https://www.npmjs.com/package/rollup-plugin-visualizer
    visualizer({
      title: `Stats | Cargo 3D v${pkg.version}`,
      template: 'sunburst', // sunburst, treemap, network
      emitFile: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      // '~sw': path.resolve(__dirname, 'sw.src'),
    },
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue'
    ],
  },
  build: {
    // NOTE: See also https://github.com/marcofugaro/browserslist-to-esbuild/blob/main/test/test.js
    // target: browserslistToEsbuild(),
    outDir: 'dist',
    // rollupOptions: {
    //   output: {},
    // },
  },
})
