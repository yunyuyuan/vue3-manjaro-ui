import { createApp, ref } from 'vue'
import App from './App.vue'

import './assets/style/index.scss'
import "@fontsource/noto-sans"
import "@fontsource/source-code-pro"

import VMdEditor from './utils/gedit'

import IconSvg from "./assets/svg/IconSvg.vue";
import apps from "./utils/apps";

createApp(App)
    .component('svg-icon', IconSvg)
    .provide('apps', apps)
    .provide('lock', ref(process.env.NODE_ENV !== 'development'))
    .provide('power', ref(''))
    .use(VMdEditor)
    .mount('#app')
