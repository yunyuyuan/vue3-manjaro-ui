import {defineAsyncComponent, reactive, ref, Ref, Component} from 'vue';

declare interface typeApp{
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
    app: Component
}

export default [{
    icon: "chrome",
    name: "chrome",
    taskbar: 0,
    position: reactive([30, 30]),
    size: reactive([1000, 600]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/chrome/index.vue'))
}, {
    icon: "dolphin",
    name: "dolphin",
    taskbar: 1,
    position: reactive([10, 10]),
    size: reactive([400, 300]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/dolphin/index.vue'))
}, {
    icon: "settings",
    name: "settings",
    order: ref(0),
    position: reactive([30, 30]),
    size: reactive([400, 300]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/settings/index.vue'))
}, {
    icon: "terminal",
    name: "terminal",
    taskbar: 2,
    position: reactive([50, 50]),
    size: reactive([400, 300]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(0),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/terminal/index.vue'))
}, {
    icon: "vscode",
    name: "vscode",
    taskbar: 3,
    position: reactive([20, 20]),
    size: reactive([800, 500]),
    status: ref(2),
    maxed: ref(false),
    zindex: ref(1),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/vscode/index.vue'))
}, {
    icon: "photoshop",
    name: "photoshop",
    order: ref(0),
    position: reactive([10, 10]),
    size: reactive([1000, 600]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(1),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/photoshop/index.vue'))
}, {
    icon: "about",
    name: "about",
    order: ref(0),
    position: reactive([50, 50]),
    size: reactive([500, 350]),
    status: ref(0),
    maxed: ref(false),
    zindex: ref(1),
    animating: false,
    app: defineAsyncComponent(() => import('../views/app/about/index.vue'))
},
] as Array<typeApp>