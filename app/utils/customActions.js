import fs from "fs";

export const modifyExports = (plop, dir) => (answers) => {
    const { name, type } = answers;
    const message = 'modify ' + dir + 'index.js';
    const newComponent = `export ${capitalize(name)} from './${capitalize(name)}${type === 'container' ? 'Container' : '' }';`;

    fs.readFile(dir + 'index.js', 'utf8', function (err,data) {
        const parseToArray = data.split('\n');

        // Add new export
        parseToArray.push(newComponent);
        // Sort rows
        parseToArray.sort((currentItem, prevItem) => currentItem.length - prevItem.length);

        fs.writeFile(dir + 'index.js', parseToArray.join('\n'), 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    return plop.renderString(message, answers);
};

export const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
};