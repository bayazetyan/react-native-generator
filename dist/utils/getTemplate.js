'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customTemplatePath = _config2.default.absPaths.templatePath;
var customTemplateNames = _config2.default.absPaths.templateNames;

var DEFAULT_TEMPLATES_PATH = './../../templates';

var templatesPath = _extends({
    component: {
        test: 'test.js.hbs',
        export: 'export.js.hbs',
        index: 'index.js.hbs',
        component_export: 'component_export.js.hbs'
    },
    container: {
        index: 'index.js.hbs',
        export: 'export.js.hbs'
    },
    module: {
        index: 'index.js.hbs'
    },
    reducer: {
        index: 'index.js.hbs'
    }
}, customTemplateNames);

var getTemplatePath = function getTemplatePath(templateName, templateDirName) {
    var currentTemplate = templatesPath[templateDirName][templateName];

    var path = '' + customTemplatePath + templateDirName + '/' + currentTemplate;
    var isTemplateExist = _config2.default.isFileExist(path);

    if (!isTemplateExist) {
        return DEFAULT_TEMPLATES_PATH + '/' + templateDirName + '/' + currentTemplate;
    } else {
        return path;
    }
};

module.exports = getTemplatePath;