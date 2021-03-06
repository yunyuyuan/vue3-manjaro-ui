import {defineConfig, Plugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs";
import { basename } from 'path';
import {dataToEsm} from "rollup-pluginutils";
import {dolphinFiles} from "./filesystem";

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

// Todo: How to use fs in vite?
const filesystemPlugin:Plugin = {
  name: 'get-file-system-dirs',
  transform(ipt: string, filepath: string) {
    // shim filesystem.ts
    if (basename(filepath) === 'filesystem.ts') {
      return {
        code: dataToEsm({dolphinFiles})
      }
    }
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), rawSvgPlugin, filesystemPlugin],
})