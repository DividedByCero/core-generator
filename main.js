import * as path from 'path';
import * as fs from 'fs';

import { resolveWorkingPath, ConvertToNamespaceSample, ToPascalCase, clearClassName, RecursiveMkDir } from './utils.js';
import { ProjectFileInfo } from './config/projectFileInfo.js';
import { FileWrapper } from './config/fileWrapper.js';
import { webApiProvider } from './providers/webApiProvider.js';
import { commonProvider } from './providers/commonProvider.js';
import { Commons, WebAPI } from "./config/classDependences.js";

let options = {
    rootPath : resolveWorkingPath(path),
    templateType : process.argv[2],
    Name : process.argv[3], // ClassName TODO: Rewrite ClassName Generator logic.
    outputPath : process.argv[4] // output File (Exclude in Webapi/Controller)
};

let projectFileObject = new ProjectFileInfo(options.rootPath, fs, path);

function init(projectFile) {
  if(projectFile.errorMessage) {
    console.log(projectFile.errorMessage);
  }
  else{
    options.Name = ToPascalCase(clearClassName(options.Name));
    //TODO: Test This.
    let subnamespaces = ConvertToNamespaceSample(options.outputPath);
    let namespace = projectFile.namespace + (subnamespaces == null ? "" : "." + subnamespaces);

    let arrayOfDirectories = namespace.split(".");
    arrayOfDirectories.shift();
    let outputFile = path.resolve(options.rootPath, arrayOfDirectories.join("/"));

    RecursiveMkDir(options.rootPath, arrayOfDirectories, fs, path, () => {
      switch (options.templateType) {
        case "wapi::controller":
          webApiProvider(outputFile, namespace, options.Name, fs, path, FileWrapper, WebAPI);
          break;
        case "cm::class":
          commonProvider(outputFile, namespace, options.Name, fs, path, FileWrapper, Commons, false);
          break;
        case "cm::interface":
          commonProvider(outputFile, namespace, "I" + options.Name, fs, path, FileWrapper, Commons, true);
          break;
        default:
          console.log("asdf");
          break;
      }
    });
  }
}

if(options.templateType && options.Name){
  init(projectFileObject);
}
else{
  console.log("Need to expecified the template type and name");
}
