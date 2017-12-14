import componentGenerator from "./component";
import containerGenerator from "./container";
import storeGenerator from "./redux-store";
import { addHelpers } from './../helpers';

module.exports = (plop) => {
    addHelpers(plop);

    plop.setGenerator('Component', componentGenerator(plop));
    plop.setGenerator('Container', containerGenerator(plop));
    plop.setGenerator('Store', storeGenerator);
};