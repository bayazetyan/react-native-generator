import path from "path";
import config from "./../config";

import { verifyName } from "../utils/verifyName";
import getTemplatePath from "../utils/getTemplate";
import { modifyExports } from "../utils/customActions";
import { getComponentsForAssignContainer } from "../utils/getComponentsForAssignContainer";

const containersDir = config.absPaths.containersDir;

module.exports = (plop) => ({
    description: 'Create container',
    prompts: [
        {
            type: 'input',
            name: 'name',
            default: 'Button',
            message: 'What is name of the container? (ex. Button, LoginForm )'.yellow,
            validate: (value) => verifyName(value, 'container'),
        },
        {
            type: 'list',
            name: 'componentName',
            message: 'For what component this container made?'.yellow,
            choices: getComponentsForAssignContainer,
        },
        {
            type: 'confirm',
            name: 'wantModule',
            default: true,
            message: 'Do you want module for this container?'.yellow,
        },
        {
            type: 'input',
            name: 'actionsNames',
            default: "default",
            message: 'Input actions names by separating them with whitespace or/and comma. If action is async put plus sign on it. Ex: create, edit, update'.yellow,
            when: (data) => data.wantModule,
        },
        {
            type: 'confirm',
            name: 'wantRootReducer',
            default: true,
            message: 'Do you want create/modify root reducer?',
        },
    ],
    actions: (data) => {
        const componentPath = config.absPaths.componentsDir + data.componentName;

        data.componentRelativePath = config.prepareRelativePath(path.relative(containersDir, componentPath));
        data.type = 'container';

        const actions = [{
            type: 'add',
            path: containersDir + '{{properCase name}}Container.js',
            templateFile: getTemplatePath('index', 'container'),
            abortOnFail: true,
        }];

        if (config.isFileExist(containersDir + 'index.js')) {
            actions.push(modifyExports(plop, containersDir))
        } else {
            // Add container export to index.js in container root folder
            actions.push({
                type: 'add',
                path: containersDir + 'index.js',
                templateFile: getTemplatePath('export', 'container'),
            });
        }

        if (data.wantModule) {
            const modulePathDir = config.absPaths.modulesDir;
            const modulePath = modulePathDir + '{{dashCase name}}-module.js';

            data.containerModuleReleativePath = config.prepareRelativePath(path.relative(containersDir, modulePathDir));
            data.actionsNames = data.actionsNames.trim().split(/[, ]/gm);

            if (data.wantRootReducer) {
                const rootReducerPath = config.absPaths.rootReducerPath;

                data.rootReducerRelativePath = config.prepareRelativePath(path.relative(path.dirname(rootReducerPath), modulePathDir));

                if (!config.isFileExist(rootReducerPath)) {
                    actions.push({
                        type: 'add',
                        path: rootReducerPath,
                        templateFile: getTemplatePath('index', 'reducer'),
                        abortOnFail: true,
                    });
                }

                actions.push({
                    type: 'modify',
                    path: rootReducerPath,
                    pattern: /(BOT: Reducer list)/g,
                    template:
                        `$1
    {{camelCase name}}: {{camelCase name}}Reducer,`,
                    abortOnFail: true,
                }, {
                    type: 'modify',
                    path: rootReducerPath,
                    pattern: /(BOT: Reducer imports)/g,
                    template:
                        `$1
import {{camelCase name}}Reducer from './{{rootReducerRelativePath}}/{{dashCase name}}-module';`,
                    abortOnFail: true,
                });

                actions.push({
                    type: 'add',
                    path: modulePath,
                    abortOnFail: true,
                    templateFile: getTemplatePath('index', 'module'),
                });
            }

            return actions;
        }
    }
});