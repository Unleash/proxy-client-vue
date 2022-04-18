import { defineConfig } from 'vite'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
// import * as vueRollup from 'rollup-plugin-vue'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'proxy-client-vue',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        typescript({
          include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue']
        })
      ]
      //plugins: [nodeResolve(), commonjs(), typescript(), vueRollup.default()]
    }
  },
  plugins: [vue()]
})
