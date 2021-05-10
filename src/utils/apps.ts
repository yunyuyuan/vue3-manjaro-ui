import {defineAsyncComponent, reactive, ref} from 'vue';

export default [{
        icon: "chrome",
        name: "chrome",
        taskbar: 0,
        position: reactive([30, 30]),
        size: reactive([400, 300]),
        status: ref(0),
        zindex: ref(0),
        app: defineAsyncComponent(()=>import('../views/app/chrome/index.vue'))
    },{
        icon: "dolphin",
        name: "dolphin",
        taskbar: 1,
        position: reactive([10, 10]),
        size: reactive([400, 300]),
        status: ref(0),
        zindex: ref(0),
        app:  defineAsyncComponent(()=>import('../views/app/dolphin/index.vue'))
    },{
        icon: "settings",
        name: "settings",
        taskbar: 2,
        position: reactive([30, 30]),
        size: reactive([400, 300]),
        status: ref(0),
        zindex: ref(0),
        app:  defineAsyncComponent(()=>import('../views/app/settings/index.vue'))
    },{
        icon: "terminal",
        name: "terminal",
        taskbar: 3,
        position: reactive([50, 50]),
        size: reactive([400, 300]),
        status: ref(0),
        zindex: ref(0),
        app:  defineAsyncComponent(()=>import('../views/app/terminal/index.vue'))
    },{
        icon: "vscode",
        name: "vscode",
        taskbar: 4,
        position: reactive([20, 20]),
        size: reactive([800, 500]),
        status: ref(2),
        zindex: ref(1),
        app:  defineAsyncComponent(()=>import('../views/app/vscode/index.vue'))
    },
]