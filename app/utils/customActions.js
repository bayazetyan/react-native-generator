import fs from "fs";
import config from "../config";

const componentsDir = config.absPaths.componentsDir;

export const modifyExports = (plop) => (answers) => {
    const message = 'modify ' + componentsDir + 'index.js';
    const newComponent = `export ${capitalize(answers.name)} from './${capitalize(answers.name)}';`;

    fs.readFile(componentsDir + 'index.js', 'utf8', function (err,data) {
        const parseToArray = data.split('\n');

        // Add new component export
        parseToArray.push(newComponent);
        // Sort rows
        parseToArray.sort((currentItem, prevItem) => currentItem.length - prevItem.length);

        fs.writeFile(componentsDir + 'index.js', parseToArray.join('\n'), 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    return plop.renderString(message, answers);
};

export const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
};