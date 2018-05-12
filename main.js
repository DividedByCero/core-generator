import * as path from 'path';
import * as fs from 'fs';

import { resolveWorkingPath, ConvertToNamespaceSample } from './utils.js';
import { ProjectFileInfo } from './config/projectFileInfo.js';
import { FileWrapper } from './config/fileWrapper.js';
import { webApiProvider } from './providers/webApiProvider.js';
import { Commons, WebAPI } from "./config/classDependences.js";

let options = {
    targetTree : resolveWorkingPath(path),
    templateType : process.argv[2],
    Name : process.argv[3], // ClassName TODO: Rewrite ClassName Generator logic.
    outputPath : process.argv[4] // output File (Exclude in Webapi/Controller)
};

let ProjectFile = new projectFileInfo("./");
if(projectFile.errorMessage) {
  console.log(projectFile.errorMessage);
}
else{
  //TODO: Test This.
  let namespace = projectFile.namespace + "." + ConvertToNamespaceSample(options.outputPath);

  switch (options.templateType) {
    case "webapi/controller":
      webApiProvider(namespace, ToPascalCase(options.Name), fs, path, fileWrapper, WebAPI);
      break;
    case "class":
     //TODO : Rewrite behavior.
      break;
    case "interface":
     //TODO : Rewrite behavior.
      break;
    default:
      console.log("asdf");
      break;
  } 
}

