'use strict';

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _helpers = require('./../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (plop) {
    (0, _helpers.addHelpers)(plop);
    plop.setGenerator('Create Component', (0, _component2.default)(plop));
};