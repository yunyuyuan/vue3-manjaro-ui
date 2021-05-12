import {typeApp} from "./apps";
import {inject} from 'vue';

export default {
    setup (){
        return {
            apps: inject('apps') as Array<typeApp>
        }
    },
    computed: {
        topWindow ():typeApp {
            return this.apps.slice().sort((a:typeApp, b:typeApp)=>b.zindex.value-a.zindex.value)[0]
        }
    }
}