"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getComponentsForAssignContainer = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _nameCheck = require("./nameCheck");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentsDir = _config2.default.absPaths.componentsDir;
var containersDir = _config2.default.absPaths.containersDir;

var components = (0, _nameCheck.getFilesNames)([componentsDir]);
var containers = (0, _nameCheck.getFilesNames)([containersDir]);

var componentsWithContainer = [];

containers.slice(0, -1).forEach(function (item) {
    _fs2.default.readFile("" + containersDir + item, 'utf8', function (err, data) {

        var importValue = data.split('\n')[0];
        var componentName = importValue.split('../components/')[1];

        componentsWithContainer.push(componentName.slice(0, -3));
    });
});

var getComponentsForAssignContainer = exports.getComponentsForAssignContainer = function getComponentsForAssignContainer() {
    if (components.length > 0) {
        var existedComponents = components.slice(0, -1);

        var componentWithoutContainer = existedComponents.filter(function (comp) {
            return componentsWithContainer.indexOf(comp) === -1;
        });

        if (componentWithoutContainer.length > 0) {
            return componentWithoutContainer;
        } else {
            throw new Error('All components have a container. First add a new component!');
        }
    }

    throw new Error('The first you need to create a component');
};