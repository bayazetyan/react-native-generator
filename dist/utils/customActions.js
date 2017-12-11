"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.capitalize = exports.modifyExports = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentsDir = _config2.default.absPaths.componentsDir;

var modifyExports = exports.modifyExports = function modifyExports(plop) {
    return function (answers) {
        var message = 'modify ' + componentsDir + 'index.js';
        var newComponent = "export " + capitalize(answers.name) + " from './" + capitalize(answers.name) + "';";

        _fs2.default.readFile(componentsDir + 'index.js', 'utf8', function (err, data) {
            var parseToArray = data.split('\n');

            // Add new component export
            parseToArray.push(newComponent);
            // Sort rows
            parseToArray.sort(function (currentItem, prevItem) {
                return currentItem.length - prevItem.length;
            });

            _fs2.default.writeFile(componentsDir + 'index.js', parseToArray.join('\n'), 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });

        return plop.renderString(message, answers);
    };
};

var capitalize = exports.capitalize = function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
};