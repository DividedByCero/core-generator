import * as path from 'path';
import * as fs from 'fs';

import { resolveWorkingPath, ConvertToNamespaceSample } from './utils.js';
import { ProjectFileInfo } from './config/projectFileInfo.js';
import { FileWrapper } from './config/fileWrapper.js';

let options = {
    targetTree : resolveWorkingPath(path),
    templateType : process.argv[2],
    Name : process.argv[3], // ClassName TODO: Rewrite ClassName Generator logic.
    outputPath : process.argv[4] // output File (Exclude in Webapi/Controller)
};

let ProjectFile = new projectFileInfo("./");
if(projectFile.errorMessage) {
  console.log(projectFile.errorMessage);
  return;
}

//TODO: Test This.
let namespace = projectFile.namespace + "." + ConvertToNamespaceSample(options.outputPath);

switch (options.templateType) {
  case "webapi/controller":
    //TODO : Rewrite behavior.
    break;
  case "class":
   //TODO : Rewrite behavior.
    break;
  case "interface":
   //TODO : Rewrite behavior.
    break;
  default:
    break;
}


// let options = {
//     location : ACTUALPATH,
//     templateType : process.argv[2],
//     controllerFolder : path.resolve(ACTUALPATH, "./Controllers"),
//     className : process.argv[3],
//     outputFolder : process.argv[4]
// };

// (function(opts){
//     let options = opts;
//     let output = options.outputFolder || options.controllerFolder;
//
//     if(options.templateType){
//
//         createFolderIfNotExists.bind(this);
//         let folderResult = createFolderIfNotExists(output);
//
//         folderResult.then(function(result){
//             let location = options.location;
//             let outputLocation = options.outputFolder;
//             let clsName = options.className;
//
//             switch(options.templateType){
//                 case "webapi/controller":
//                     let namespaceResult = NamespaceFinder(location, STARTUPFILE, READOPTIONS, location, outputLocation);
//
//                     namespaceResult.then(function(namespace){
//                         GenerateWebAPIDocument(namespace, clsName, READOPTIONS, output, location);
//                     });
//                     break;
//                 default:
//                     printInfo();
//         }
//         }.bind(this));
//     }
//     else{
//         printInfo();
//     };
//
// })(options);
