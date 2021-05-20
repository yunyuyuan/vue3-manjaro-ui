import {defineAsyncComponent, reactive, ref, Ref, Component} from 'vue';

type appParams = {
    filepath: Ref
}

export type typeApp = {
    icon: string,
    name: string,
    taskbar?: number,
    order?: Ref,
    readonly position: object ,
    readonly size: object,
    status: Ref,
    maxed: Ref,
    zindex: Ref,
    animating: boolean,
    app: Component,
    params? : appParams
}

export default [{
    name: "chrome",
    icon: "chrome",
    taskbar: 0,
    position: reactive([30, 30]),
    size: reactive([900, 600]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/chrome/index.vue')),
}, {
    name: "dolphin",
    icon: "dolphin",
    taskbar: 1,
    position: reactive([10, 10]),
    size: reactive([700, 500]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/dolphin/index.vue'))
}, {
    name: "settings",
    icon: "settings",
    order: ref(0),
    position: reactive([30, 30]),
    size: reactive([700, 500]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/settings/index.vue'))
}, {
    name: "terminal",
    icon: "terminal",
    taskbar: 2,
    position: reactive([80, 80]),
    size: reactive([700, 500]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/terminal/index.vue'))
}, {
    name: "vscode",
    icon: "vscode",
    taskbar: 3,
    position: reactive([20, 20]),
    size: reactive([800, 500]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/vscode/index.vue'))
}, {
    name: "image viewer",
    icon: "image-viewer",
    order: ref(0),
    position: reactive([10, 10]),
    size: reactive([700, 450]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/image viewer/index.vue')),
    params: {filepath: ref('')}
}, {
    name: "about",
    icon: "about",
    order: ref(0),
    position: reactive([50, 50]),
    size: reactive([450, 400]),
    status: ref(2),
    maxed: ref(false),
    zindex: ref(1),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/about/index.vue'))
}, {
    icon: "music",
    name: "music",
    order: ref(0),
    position: reactive([80, 80]),
    size: reactive([800, 500]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/music/index.vue')),
    params: {filepath: ref('')}
}, {
    name: "gedit",
    icon: "gedit",
    order: ref(0),
    position: reactive([80, 80]),
    size: reactive([800, 500]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/gedit/index.vue')),
    params: {filepath: ref('')}
},
] as Array<typeApp>