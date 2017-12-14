export const addHelpers = (plop) => {
    plop.addHelper('checkValueInArray', (data, options) => {
        const value = options.hash.checkValue || '';
        const index = data.indexOf(value);

        if (index !== -1) {
            const additionalData = {
                flow: options.data.root.flow,
                name: options.data.root.name,
            };

            return options.fn(additionalData);
        }
    });

    plop.addHelper('printLifeCycles', (data) => {
        let output = '';

        data.forEach(prop => {
            switch (prop) {
                case 'shouldComponentUpdate':
                    output += `\n\tshouldComponentUpdate (nextProps, nextState, nextContext) { \n\n \t}\n`;
                    break;
                case 'componentWillMount':
                    output += `\n\tcomponentWillMount () { \n\n \t}\n`;
                    break;
                case 'componentDidMount':
                    output += `\n\tcomponentDidMount () { \n\n \t}\n`;
                    break;
                case 'componentWillReceiveProps':
                    output += `\n\tcomponentWillReceiveProps (nextProps) { \n\n \t}\n`;
                    break;
                case 'componentWillUpdate':
                    output += `\n\tcomponentWillUpdate (nextProps, nextState) { \n\n \t}\n`;
                    break;
                case 'componentDidUpdate':
                    output += `\n\tcomponentDidUpdate (prevProps, prevState) { \n\n \t}\n`;
                    break;
                case 'componentWillUnmount':
                    output += `\n\tcomponentWillUnmount () { \n\n \t}\n`;
                    break;
            }
        });

        return output;
    });
};