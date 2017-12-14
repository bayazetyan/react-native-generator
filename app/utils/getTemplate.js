import config from "./../config";

const customTemplatePath = config.absPaths.templatePath;
const customTemplateNames = config.absPaths.templateNames;

const DEFAULT_TEMPLATES_PATH = './../../templates';

const templatesPath = {
    component: {
        test: 'test.js.hbs',
        export: 'export.js.hbs',
        index: 'index.js.hbs',
        component_export: 'component_export.js.hbs',
    },
    container: {
        index: 'index.js.hbs',
        export: 'export.js.hbs',
    },
    module: {
        index: 'index.js.hbs',
    },
    reducer: {
        index: 'index.js.hbs',
    },
    store: {
        index: 'index.js.hbs',
    },
    ...customTemplateNames,
};

const getTemplatePath = (templateName, templateDirName) => {
    const currentTemplate = templatesPath[templateDirName][templateName];

    const path = `${customTemplatePath}${templateDirName}/${currentTemplate}`;
    const isTemplateExist = config.isFileExist(path);

    if (!isTemplateExist) {
        return `${DEFAULT_TEMPLATES_PATH}/${templateDirName}/${currentTemplate}`;
    } else {
        return path;
    }
};

module.exports = getTemplatePath;