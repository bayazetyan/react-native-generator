import fs from "fs";

import { nameCheck } from "./nameCheck";
import config from "./../config/index";

const componentNameCheck = (component, type) => {
  let dirs = [];

  switch (type) {
      case 'component':
          dirs = [config.absPaths.componentsDir];
          break;
      case 'container':
          dirs = [config.absPaths.containersDir];
          break;
      default:
          dirs = [config.absPaths.componentsDir, config.absPaths.containersDir];
  }

  return nameCheck(component, dirs);
};

module.exports = componentNameCheck;