import config from "./../config";

const customTemplatePath = config.absPaths.templatePath;
const customTemplateNames = config.absPaths.templateNames;

const DEFAULT_TEMPLATES_PATH = './../../templates';

const templatesPath = {
    component: {
        test: 'test.js.hbs',
        export: 'export.js.hbs',
        es6class: 'es6class.js.hbs',
        component_export: 'component_export.js.hbs',
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