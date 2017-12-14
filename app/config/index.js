import fs from "fs";
import path from "path";

let config = {};

try {
    const packageJSON = require(path.resolve('package.json'));

    config = (packageJSON && packageJSON.rnGenerator) || {};
} catch (err) {
    console.log('rnGenerator config is not defined in package.json file')
}

let externalConfig = {};
let templateNames = {};

try {
    externalConfig = JSON.parse(fs.readFileSync(path.resolve('.rnGenerator'), 'utf8'));
    templateNames = externalConfig.templateNames || {};
} catch (err) {
    console.warn("Missing config file or it is not valid.");
}

const isDirExist = (filePath) => {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err)  {
        return false;
    }
};

const prepareRelativePath = (filePath) => {
    return filePath.replace(/[\\]/g, '/')
};

const isFileExist = (filePath) => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err)  {
        return false;
    }
};

const functions = {
    isDirExist,
    isFileExist,
    prepareRelativePath
};

const defaultPaths = {
    rootReducerPath: 'src/reducers/index.js',
    componentsDir: 'src/components',
    containersDir: 'src/containers',
    modulesDir: 'src/modules',
    testRootDir: './__test__',
    rootFile: 'src/index.js',
    appFile: 'src/app.js',
    templatePath: '',
};

const paths = { ...defaultPaths, ...config.paths, ...externalConfig.paths };

const getAbsPath = (obj) => {
    const results = {};

    for(const str in obj) {
        results[str] = path.resolve(obj[str]);

        if (obj[str].lastIndexOf('.js') !== obj[str].length - 3)  {

            results[str] += '/';
        }
    }
    return results;
};

module.exports = { ...functions, ...paths, absPaths: getAbsPath(paths), templateNames };