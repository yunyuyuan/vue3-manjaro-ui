import { createApp, ref } from 'vue'
import App from './App.vue'

import './assets/style/index.scss'
import "@fontsource/noto-sans"

import IconSvg from "./assets/svg/IconSvg.vue";
import apps from "./utils/apps";

createApp(App)
    .component('svg-icon', IconSvg)
    .provide('apps', apps)
    .provide('lock', ref(true))
    .provide('power', ref(''))
    .mount('#app')
