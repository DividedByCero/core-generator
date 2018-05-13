import * as path from 'path';
import * as fs from 'fs';

import { resolveWorkingPath, ConvertToNamespaceSample, ToPascalCase, clearClassName, RecursiveMkDir, PrintUsage } from './utils.js';
import { ProjectFileInfo } from './config/projectFileInfo.js';
import { FileWrapper } from './config/fileWrapper.js';
import { webApiProvider } from './providers/webApiProvider.js';
import { commonProvider } from './providers/commonProvider.js';
import { Commons, WebAPI } from "./config/classDependences.js";

let options = {
  rootPath: resolveWorkingPath(path),
  templateType: process.argv[2],
  Name: process.argv[3],
  outputPath: process.argv[4]
};

let projectFileObject = new ProjectFileInfo(options.rootPath, fs, path);

function init(projectFile) {
  if (projectFile.errorMessage) {
    console.log(projectFile.errorMessage);
  }
  else {
    options.Name = ToPascalCase(clearClassName(options.Name));
    //TODO: Test This.
    let subnamespaces = ConvertToNamespaceSample(options.outputPath);
    let namespace = projectFile.namespace + (subnamespaces == null ? "" : "." + subnamespaces);

    let arrayOfDirectories = namespace.split(".");
    arrayOfDirectories.shift();
    let outputFile = path.resolve(options.rootPath, arrayOfDirectories.join("/"));

    RecursiveMkDir(options.rootPath, arrayOfDirectories, fs, path, () => {
      switch (options.templateType) {
        case "wapi:controller":
          webApiProvider(outputFile, namespace, options.Name, fs, path, FileWrapper, WebAPI);
          break;
        case "cm:class":
          commonProvider(outputFile, namespace, options.Name, fs, path, FileWrapper, Commons, false);
          break;
        case "cm:interface":
          commonProvider(outputFile, namespace, "I" + options.Name, fs, path, FileWrapper, Commons, true);
          break;
        default:
          console.log("Notificacion :: Please type a valid TemplateType, type --help for more information.");
          break;
      }
    });
  }
}

if (options.templateType) {
  if (options.templateType == "--help") {
    PrintUsage();
  }
  else {
    if (options.Name)
      init(projectFileObject);
  }
}
else {
  console.log("Notification :: templateType and Name should be expecified, type --help for more information");
}
