'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.capitalize = exports.modifyExports = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modifyExports = exports.modifyExports = function modifyExports(plop, dir) {
    return function (answers) {
        var name = answers.name,
            type = answers.type;

        var message = 'modify ' + dir + 'index.js';
        var newComponent = 'export ' + capitalize(name) + ' from \'./' + capitalize(name) + (type === 'container' ? 'Container' : '') + '\';';

        _fs2.default.readFile(dir + 'index.js', 'utf8', function (err, data) {
            var parseToArray = data.split('\n');

            // Add new export
            parseToArray.push(newComponent);
            // Sort rows
            parseToArray.sort(function (currentItem, prevItem) {
                return currentItem.length - prevItem.length;
            });

            _fs2.default.writeFile(dir + 'index.js', parseToArray.join('\n'), 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });

        return plop.renderString(message, answers);
    };
};

var capitalize = exports.capitalize = function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
};