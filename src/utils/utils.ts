import {typeApp} from "./apps";
import {typeFile, dolphinFiles} from "../../filesystem";

export function escapeHtml(s: string): string{
    return s.replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}

export function findMimeFiles (type: RegExp): Array<string>{
    const ret = [];
    function findImage (path: Array<string>){
        let files = dolphinFiles as Array<typeFile>;
        for (const i of path){
            files = files.find(v=>v.isDir&&v.name===i).sub;
        }
        const pathStr = path.join('/');
        files.forEach(file=>{
            if (type.test(file.mime)){
                ret.push(pathStr+'/'+file.name);
            }else if (file.isDir){
                findImage(path.concat(file.name));
            }
        })
    }
    findImage([]);
    return ret;
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