"use strict";

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _customActions = require("../utils/customActions");

var _getTemplate = require("../utils/getTemplate");

var _getTemplate2 = _interopRequireDefault(_getTemplate);

var _verifyName = require("../utils/verifyName");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reactLifeCycles = ['shouldComponentUpdate', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

module.exports = function (plop) {
    return {
        description: 'Add component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'What is name of the component?',
            default: 'Button',
            validate: _verifyName.verifyName
        }, {
            type: 'confirm',
            name: 'flow',
            default: false,
            message: 'Do you use a static type? (Flow)'
        }, {
            type: 'list',
            name: 'extendedComponent',
            default: 'PureComponent',
            message: 'Which component you will use for extend? (PureComponent / Component)',
            choices: ['PureComponent', 'Component']
        }, {
            pageSize: 10,
            type: 'checkbox',
            name: 'properties',
            default: ['constructor'],
            message: 'Select the component properties',
            choices: ['constructor', 'propTypes', 'defaultProps'].concat(reactLifeCycles)
        }, {
            type: 'confirm',
            name: 'wantTest',
            default: false,
            message: 'Should the component have test?'
        }],
        actions: function actions(data) {
            var componentsDir = _config2.default.absPaths.componentsDir;

            var actions = [{
                type: 'add',
                abortOnFail: true,
                templateFile: (0, _getTemplate2.default)('es6class', 'component'),
                path: componentsDir + '{{properCase name}}/{{properCase name}}.js'
            }, {
                type: 'add',
                abortOnFail: true,
                path: componentsDir + '{{properCase name}}/index.js',
                templateFile: (0, _getTemplate2.default)('component_export', 'component')
            }];

            if (_config2.default.isFileExist(componentsDir + "index.js")) {
                // Add component export to index.js in component root folder
                actions.push((0, _customActions.modifyExports)(plop));
            } else {
                // Add container export to index.js in container root folder
                actions.push({
                    type: 'add',
                    path: componentsDir + "index.js",
                    templateFile: (0, _getTemplate2.default)('export', 'component')
                });
            }

            if (data.wantTest) {
                var testFileDir = _config2.default.absPaths.testRootDir;

                data.releativeTestToComponentPath = _config2.default.prepareRelativePath(_path2.default.relative(testFileDir, componentsDir));

                actions.push({
                    type: 'add',
                    abortOnFail: true,
                    templateFile: (0, _getTemplate2.default)('test', 'component'),
                    path: testFileDir + 'components/{{properCase name}}/{{properCase name}}.js'
                });
            }
            return actions;
        }
    };
};