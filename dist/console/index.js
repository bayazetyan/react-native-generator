"use strict";

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _container = require("./container");

var _container2 = _interopRequireDefault(_container);

var _reduxStore = require("./redux-store");

var _reduxStore2 = _interopRequireDefault(_reduxStore);

var _helpers = require("./../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (plop) {
    (0, _helpers.addHelpers)(plop);

    plop.setGenerator('Component', (0, _component2.default)(plop));
    plop.setGenerator('Container', (0, _container2.default)(plop));
    plop.setGenerator('Store', _reduxStore2.default);
};