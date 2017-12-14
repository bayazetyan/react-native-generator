import config from "./../config";
import path from "path";

import getTemplatePath from "../utils/getTemplate";

const storePath = config.absPaths.storePath;
const reducerPath = config.absPaths.rootReducerPath;

module.exports = {
    description: 'Create redux store configuration',
    prompts: [

    ],
    actions: (data) => {
        const actions = [];

        if(!config.isDirExist(storePath)) {

            data.releativeStoreToReducerPath = config.prepareRelativePath( path.relative(storePath, reducerPath) );

            actions.push({
                type: 'add',
                path: storePath + 'configure-store.js',
                templateFile: getTemplatePath('index', 'store'),
            });
        }

        return actions;
    }
};