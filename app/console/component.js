import config from "./../config";
import path from "path";

import { modifyExports } from "../utils/customActions";
import getTemplatePath from "../utils/getTemplate";
import { verifyName } from "../utils/verifyName";

const reactLifeCycles = [
    'shouldComponentUpdate',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
];

module.exports = (plop) => (
    {
        description: 'Create component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is name of the component?',
                default: 'Button',
                validate: (value) => verifyName(value, 'component')
            },
            {
                type: 'confirm',
                name: 'flow',
                default: false,
                message: 'Do you use a static type? (Flow)',
            },
            {
                type: 'list',
                name: 'extendedComponent',
                default: 'PureComponent',
                message: 'Which component you will use?',
                choices: ['PureComponent', 'Component'],
            },
            {
                pageSize: 10,
                type: 'checkbox',
                name: 'properties',
                default: ['constructor'],
                message: 'Select the component properties',
                choices: ['constructor', 'propTypes', 'defaultProps', ...reactLifeCycles ]
            },
            {
                type: 'confirm',
                name: 'wantTest',
                default: false,
                message: 'Should the component have test?',
            }
        ],
        actions: (data) => {
            const componentsDir = config.absPaths.componentsDir;
            data.type = 'component';

            const actions = [{
                type: 'add',
                abortOnFail: true,
                templateFile: getTemplatePath('index', 'component'),
                path: componentsDir + '{{properCase name}}/{{properCase name}}.js',
            },{
                type: 'add',
                abortOnFail: true,
                path: componentsDir + '{{properCase name}}/index.js',
                templateFile: getTemplatePath('component_export', 'component'),
            }];

            if(config.isFileExist(`${componentsDir}index.js`)) {
                // Add component export to index.js in component root folder
                actions.push(modifyExports(plop, componentsDir))
            }else {
                // Add container export to index.js in container root folder
                actions.push({
                    type: 'add',
                    path: `${componentsDir}index.js`,
                    templateFile: getTemplatePath('export', 'component'),
                });
            }

            if(data.wantTest) {
                const testFileDir = config.absPaths.testRootDir;

                data.releativeTestToComponentPath = config.prepareRelativePath( path.relative(testFileDir, componentsDir) );

                actions.push({
                    type: 'add',
                    abortOnFail: true,
                    templateFile: getTemplatePath('test', 'component'),
                    path: testFileDir + 'components/{{properCase name}}/{{properCase name}}.js',
                });

            }
            return actions;
        }
    }
);