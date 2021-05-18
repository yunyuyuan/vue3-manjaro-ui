import fs from "fs";
import path from "path";
import mime from "mime";

export type typeFile = {
    name: string,
    mime: string,
    isDir: boolean,
    sub?: Array<typeFile>
}

function recursiveReadDir(dirs: Array<string>, array: Array<typeFile>){
    for (const dirent of fs.readdirSync(path.resolve(__dirname, ...['public'].concat(dirs)), {withFileTypes: true})){
        const file: typeFile = {
            name: dirent.name,
            mime: mime.getType(dirent.name)||'folder',
            isDir: dirent.isDirectory(),
        }
        array.push(file);
        if (file.isDir){
            file.sub = [];
            recursiveReadDir(dirs.slice().concat(dirent.name), file.sub);
        }
    }
}

const dolphinFiles: Array<typeFile> = [];
recursiveReadDir(['dolphin-files'], dolphinFiles);
export {dolphinFiles};