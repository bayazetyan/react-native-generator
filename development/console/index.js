import componentGenerator from "./component";
import { addHelpers } from './../helpers';

module.exports = (plop) => {
    addHelpers(plop);
    plop.setGenerator('Create Component', componentGenerator(plop));
};