'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var addHelpers = exports.addHelpers = function addHelpers(plop) {
    plop.addHelper('checkValueInArray', function (data, options) {
        var value = options.hash.checkValue || '';
        var index = data.indexOf(value);

        if (index !== -1) {
            var additionalData = {
                flow: options.data.root.flow,
                name: options.data.root.name
            };

            return options.fn(additionalData);
        }
    });

    plop.addHelper('printLifeCycles', function (data) {
        var output = '';

        data.forEach(function (prop) {
            switch (prop) {
                case 'shouldComponentUpdate':
                    output += '\n\tshouldComponentUpdate (nextProps, nextState, nextContext) { \n\n \t}\n';
                    break;
                case 'componentWillMount':
                    output += '\n\tcomponentWillMount () { \n\n \t}\n';
                    break;
                case 'componentDidMount':
                    output += '\n\tcomponentDidMount () { \n\n \t}\n';
                    break;
                case 'componentWillReceiveProps':
                    output += '\n\tcomponentWillReceiveProps (nextProps) { \n\n \t}\n';
                    break;
                case 'componentWillUpdate':
                    output += '\n\tcomponentWillUpdate (nextProps, nextState) { \n\n \t}\n';
                    break;
                case 'componentDidUpdate':
                    output += '\n\tcomponentDidUpdate (prevProps, prevState) { \n\n \t}\n';
                    break;
                case 'componentWillUnmount':
                    output += '\n\tcomponentWillUnmount () { \n\n \t}\n';
                    break;
            }
        });

        return output;
    });
};