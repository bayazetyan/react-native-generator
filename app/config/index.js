"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {};

try {
    var packageJSON = require(_path2.default.resolve('package.json'));

    config = packageJSON && packageJSON.rnGenerator || {};
} catch (err) {
    console.log('rnGenerator config is not defined in package.json file');
}

var externalConfig = {};
var templateNames = {};

try {
    externalConfig = JSON.parse(_fs2.default.readFileSync(_path2.default.resolve('.rnGenerator'), 'utf8'));
    templateNames = externalConfig.templateNames || {};
} catch (err) {
    console.warn("Missing config file or it is not valid.");
}

var isDirExist = function isDirExist(filePath) {
    try {
        return _fs2.default.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
};

var prepareRelativePath = function prepareRelativePath(filePath) {
    return filePath.replace(/[\\]/g, '/');
};

var isFileExist = function isFileExist(filePath) {
    try {
        return _fs2.default.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
};

var functions = {
    isDirExist: isDirExist,
    isFileExist: isFileExist,
    prepareRelativePath: prepareRelativePath
};

var defaultPaths = {
    rootReducerPath: 'src/reducers/index.js',
    componentsDir: 'src/components',
    containerDir: 'src/containers',
    reducersDir: 'src/reducers',
    testRootDir: './__test__',
    rootFile: 'src/app',
    appFile: 'src/app',
    templatePath: ''
};

var paths = _extends({}, defaultPaths, config.paths, externalConfig.paths);

var getAbsPath = function getAbsPath(obj) {
    var results = {};

    for (var str in obj) {
        results[str] = _path2.default.resolve(obj[str]);

        if (obj[str].lastIndexOf('.js') !== obj[str].length - 3) {

            results[str] += '/';
        }
    }
    return results;
};

module.exports = _extends({}, functions, paths, { absPaths: getAbsPath(paths), templateNames: templateNames });