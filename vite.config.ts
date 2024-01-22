import { defineConfig } from 'vite'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: './', // NOTE: See also https://vite-plugin-ssr.com/base-url
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
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
