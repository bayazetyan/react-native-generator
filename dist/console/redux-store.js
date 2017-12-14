"use strict";

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _getTemplate = require("../utils/getTemplate");

var _getTemplate2 = _interopRequireDefault(_getTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storePath = _config2.default.absPaths.storePath;
var reducerPath = _config2.default.absPaths.rootReducerPath;

module.exports = {
    description: 'Create redux store configuration',
    prompts: [],
    actions: function actions(data) {
        var actions = [];

        if (!_config2.default.isDirExist(storePath)) {

            data.releativeStoreToReducerPath = _config2.default.prepareRelativePath(_path2.default.relative(storePath, reducerPath));

            actions.push({
                type: 'add',
                path: storePath + 'configure-store.js',
                templateFile: (0, _getTemplate2.default)('index', 'store')
            });
        }

        return actions;
    }
};