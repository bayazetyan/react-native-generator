"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _verifyName = require("../utils/verifyName");

var _getTemplate = require("../utils/getTemplate");

var _getTemplate2 = _interopRequireDefault(_getTemplate);

var _customActions = require("../utils/customActions");

var _getComponentsForAssignContainer = require("../utils/getComponentsForAssignContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containersDir = _config2.default.absPaths.containersDir;

module.exports = function (plop) {
    return {
        description: 'Create container',
        prompts: [{
            type: 'input',
            name: 'name',
            default: 'Button',
            message: 'What is name of the container? (ex. Button, LoginForm )'.yellow,
            validate: function validate(value) {
                return (0, _verifyName.verifyName)(value, 'container');
            }
        }, {
            type: 'list',
            name: 'componentName',
            message: 'For what component this container made?'.yellow,
            choices: _getComponentsForAssignContainer.getComponentsForAssignContainer
        }, {
            type: 'confirm',
            name: 'wantModule',
            default: true,
            message: 'Do you want module for this container?'.yellow
        }, {
            type: 'input',
            name: 'actionsNames',
            default: "default",
            message: 'Input actions names by separating them with whitespace or/and comma. If action is async put plus sign on it. Ex: create, edit, update'.yellow,
            when: function when(data) {
                return data.wantModule;
            }
        }, {
            type: 'confirm',
            name: 'wantRootReducer',
            default: true,
            message: 'Do you want create/modify root reducer?'
        }],
        actions: function actions(data) {
            var componentPath = _config2.default.absPaths.componentsDir + data.componentName;

            data.componentRelativePath = _config2.default.prepareRelativePath(_path2.default.relative(containersDir, componentPath));
            data.type = 'container';

            var actions = [{
                type: 'add',
                path: containersDir + '{{properCase name}}Container.js',
                templateFile: (0, _getTemplate2.default)('index', 'container'),
                abortOnFail: true
            }];

            if (_config2.default.isFileExist(containersDir + 'index.js')) {
                actions.push((0, _customActions.modifyExports)(plop, containersDir));
            } else {
                // Add container export to index.js in container root folder
                actions.push({
                    type: 'add',
                    path: containersDir + 'index.js',
                    templateFile: (0, _getTemplate2.default)('export', 'container')
                });
            }

            if (data.wantModule) {
                var modulePathDir = _config2.default.absPaths.modulesDir;
                var modulePath = modulePathDir + '{{dashCase name}}-module.js';

                data.containerModuleReleativePath = _config2.default.prepareRelativePath(_path2.default.relative(containersDir, modulePathDir));
                data.actionsNames = data.actionsNames.trim().split(/[, ]/gm);

                if (data.wantRootReducer) {
                    var rootReducerPath = _config2.default.absPaths.rootReducerPath;

                    data.rootReducerRelativePath = _config2.default.prepareRelativePath(_path2.default.relative(_path2.default.dirname(rootReducerPath), modulePathDir));

                    if (!_config2.default.isFileExist(rootReducerPath)) {
                        actions.push({
                            type: 'add',
                            path: rootReducerPath,
                            templateFile: (0, _getTemplate2.default)('index', 'reducer'),
                            abortOnFail: true
                        });
                    }

                    actions.push({
                        type: 'modify',
                        path: rootReducerPath,
                        pattern: /(BOT: Reducer list)/g,
                        template: "$1\n    {{camelCase name}}: {{camelCase name}}Reducer,",
                        abortOnFail: true
                    }, {
                        type: 'modify',
                        path: rootReducerPath,
                        pattern: /(BOT: Reducer imports)/g,
                        template: "$1\nimport {{camelCase name}}Reducer from './{{rootReducerRelativePath}}/{{dashCase name}}-module';",
                        abortOnFail: true
                    });

                    actions.push({
                        type: 'add',
                        path: modulePath,
                        abortOnFail: true,
                        templateFile: (0, _getTemplate2.default)('index', 'module')
                    });
                }

                return actions;
            }
        }
    };
};