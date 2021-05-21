// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
import mime from "mime";

export type typeFile = {
    name: string,
    mime: string,
    isDir: boolean,
    sub?: Array<typeFile>
}

function recursiveReadDir(dirs: Array<string>, array: Array<typeFile>){
    // @ts-ignore
    for (const dirent of fs.readdirSync(path.resolve(__dirname, ...['public'].concat(dirs)), {withFileTypes: true})){
        const isDir = dirent.isDirectory();
        const file: typeFile = {
            name: dirent.name,
            mime: isDir?'folder':mime.getType(dirent.name),
            isDir,
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
export {dolphinFiles}