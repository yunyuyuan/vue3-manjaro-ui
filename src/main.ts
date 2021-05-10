import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/index.scss'
import IconSvg from "./assets/svg/IconSvg.vue";
import apps from "./utils/apps";

createApp(App)
    .component('svg-icon', IconSvg)
    .provide('apps', apps)
    .mount('#app')
