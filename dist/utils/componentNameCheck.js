"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _nameCheck = require("./nameCheck");

var _index = require("./../config/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentNameCheck = function componentNameCheck(component, type) {
    var dirs = [];

    switch (type) {
        case 'component':
            dirs = [_index2.default.absPaths.componentsDir];
            break;
        case 'container':
            dirs = [_index2.default.absPaths.containersDir];
            break;
        default:
            dirs = [_index2.default.absPaths.componentsDir, _index2.default.absPaths.containersDir];
    }

    return (0, _nameCheck.nameCheck)(component, dirs);
};

module.exports = componentNameCheck;