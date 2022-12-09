import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: 'proxy-client-vue',
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: format => `index.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        }
      }
    }
  },
  plugins: [dts()]
})
