import { createApp, ref } from 'vue'
import App from './App.vue'

import './assets/style/index.scss'
import "@fontsource/noto-sans"
import "@fontsource/source-code-pro"

import VMdEditor from './utils/gedit'
import VueAudio from 'vue-audio-better'

import IconSvg from "./assets/svg/IconSvg.vue";
import apps from "./utils/apps";

createApp(App)
    .component('svg-icon', IconSvg)
    .provide('apps', apps)
    .provide('lock', ref(true))
    .provide('power', ref(''))
    .use(VMdEditor)
    .use(VueAudio)
    .mount('#app')
