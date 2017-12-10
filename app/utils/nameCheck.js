import config from "./../config";
import fs from "fs";

const getFilesNames = (dirs) => {
    let allFiles = [];
    
    dirs.forEach((dir) => {
        const files = config.isDirExist(dir) ? fs.readdirSync(dir) : [];
        
        allFiles = allFiles.concat(files);
    });

    return allFiles;
};

const nameCheckDir = (component, dirs) => {
    const components = getFilesNames(dirs);

    const existDirs = components.slice(0, -1);

    if(existDirs.length) {
        console.log('\n  Existent directories: ', '\x1b[36m ', existDirs ,' \x1b[0m', '\n');
    }

    const regExp = new RegExp(`^${component}$`, 'i');

    return components.find((item) => item.match(regExp))
};

module.exports = nameCheckDir;