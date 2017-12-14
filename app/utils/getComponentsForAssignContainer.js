import fs from "fs";

import config from "./../config";
import { getFilesNames } from "./nameCheck";

const componentsDir = config.absPaths.componentsDir;
const containersDir = config.absPaths.containersDir;

const components = getFilesNames([componentsDir]);
const containers = getFilesNames([containersDir]);

const componentsWithContainer = [];

containers.slice(0,-1).forEach(item => {
    fs.readFile(`${containersDir}${item}`, 'utf8', function (err,data) {

        const importValue = data.split('\n')[0];
        const componentName = importValue.split('../components/')[1];

        componentsWithContainer.push(componentName.slice(0, -3));
    });
});

export const getComponentsForAssignContainer = () => {
    if (components.length > 0) {
        const existedComponents = components.slice(0,-1);

        const componentWithoutContainer = existedComponents.filter(comp => componentsWithContainer.indexOf(comp) === -1);

        if (componentWithoutContainer.length > 0) {
            return componentWithoutContainer;
        } else {
            throw new Error('All components have a container. First add a new component!');
        }
    }

    throw new Error('The first you need to create a component');
};