"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nameCheck = exports.getFilesNames = undefined;

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilesNames = exports.getFilesNames = function getFilesNames(dirs) {
    var allFiles = [];

    dirs.forEach(function (dir) {
        var files = _config2.default.isDirExist(dir) ? _fs2.default.readdirSync(dir) : [];

        allFiles = allFiles.concat(files);
    });

    return allFiles;
};

var nameCheck = exports.nameCheck = function nameCheck(component, dirs) {

    var components = getFilesNames(dirs);

    var existDirs = components.slice(0, -1);

    if (existDirs.length) {
        console.log('\n  Existent directories: ', '\x1b[36m ', existDirs, ' \x1b[0m', '\n');
    }

    var regExp = new RegExp("^" + component + "$", 'i');

    return components.find(function (item) {
        return item.match(regExp);
    });
};