import {typeApp} from "./apps";

export function escapeHtml(s: string): string{
    return s.replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}

export function openApp(name: string): typeApp{
    const app: typeApp = this.apps.find((app: typeApp)=>app.name===name);
    if (!app) return;
    if (app.animating) return;
    if (this.topWindow && app !== this.topWindow) {
        app.zindex.value = this.topWindow.zindex.value + 1;
    }
    if (app.order){
        app.order.value = Date.now();
    }
    app.status.value = 2;
    return app;
}