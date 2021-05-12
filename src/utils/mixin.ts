import {typeApp} from "./apps";

export default {
    inject: ['apps'],
    computed: {
        topWindow ():typeApp {
            return this.apps.slice().sort((a:typeApp, b:typeApp)=>b.zindex.value-a.zindex.value)[0]
        }
    }
}