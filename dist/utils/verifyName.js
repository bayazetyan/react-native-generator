'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyName = undefined;

var _componentNameCheck = require('./componentNameCheck');

var _componentNameCheck2 = _interopRequireDefault(_componentNameCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyName = exports.verifyName = function verifyName(value, type) {
    var regExpSymbols = /[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,\/]/g;
    var regExpNumbers = /^[0-9]/;
    var regExpContainerName = /^(\w)+(container)$/i;

    var checkedValue = type === 'container' ? value + 'Container.js' : value;

    if (regExpContainerName.test(value)) {

        return 'Please set the container name without "Container"'.yellow;
    } else if ((0, _componentNameCheck2.default)(checkedValue, type)) {

        return 'That name already exists.'.red;
    } else if (/\s/g.test(value)) {

        return 'You cannot use whitespace character'.yellow;
    } else if (regExpNumbers.test(value)) {

        return 'The Class name can not start with number'.yellow;
    } else if (regExpSymbols.test(value)) {

        return 'You cannot use symbols: ' + '( - ! @ $ # % ^ & * ( ) _ + | ~ = ` { } [ ] : " ; \' < > ? , / )'.red;
    } else {

        return true;
    }
};