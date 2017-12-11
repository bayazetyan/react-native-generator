'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyName = undefined;

var _componentNameCheck = require('./componentNameCheck');

var _componentNameCheck2 = _interopRequireDefault(_componentNameCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyName = exports.verifyName = function verifyName(value) {
    var regExpSymbols = /[-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g;
    var regExpNumbers = /^[0-9]/;

    if ((0, _componentNameCheck2.default)(value)) {

        return 'That component already exists.';
    } else if (/\s/g.test(value)) {

        return 'You cannot use whitespace character';
    } else if (regExpNumbers.test(value)) {

        return 'The Class name can not start with number';
    } else if (regExpSymbols.test(value)) {

        return 'You cannot use symbols: ' + '( - ! @ $ # % ^ & * ( ) _ + | ~ = ` { } [ ] : " ; \' < > ? , . / )'.red;
    } else {
        return true;
    }
};