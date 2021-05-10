import {defineConfig, Plugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs";
import {resolve} from "path";
import {dataToEsm} from "rollup-pluginutils";

const rawSvgPlugin:Plugin = {
  name: 'raw-svg-file-loader',
  transform(svg: string, filepath: string) {
    if (filepath.slice(-4) !== '.svg') return null;
    const content = fs.readFileSync(filepath).toString()
    return {
      code: dataToEsm(content)
    }
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), rawSvgPlugin],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
