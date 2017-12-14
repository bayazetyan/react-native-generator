'use strict';

var inquirer = require('inquirer');

var prompt = inquirer.createPromptModule();

prompt([{
    pageSize: 10,
    type: 'checkbox',
    name: 'properties',
    default: ['constructor'],
    message: 'Select the component properties',
    choices: ['constructor', 'propTypes', 'defaultProps']
}]).then(function (answer) {
    console.log('LOG ::: answer ::: ', answer);
});