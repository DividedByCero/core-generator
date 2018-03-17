import * as path from "path";
import * as fs from "fs";
import NamespaceFinder from "./NamespaceFinder.js";
import GenerateWebAPIDocument from "./providers/webApiProvider.js";
import { printInfo, createFolderIfNotExists } from "./utils.js";

const READOPTIONS = { encoding : "UTF8" },
      ACTUALPATH = path.resolve("\."),
      STARTUPFILE = "Startup.cs";

let options = {
    location : ACTUALPATH,
    templateType : process.argv[2],
    controllerFolder : path.resolve(ACTUALPATH, "./Controllers"),
    className : process.argv[3],
    outputFolder : process.argv[4]
};

(function(opts){
    let options = opts;
    let output = options.outputFolder || options.controllerFolder;
    
    if(options.templateType){    

        createFolderIfNotExists.bind(this);
        let folderResult = createFolderIfNotExists(output);

        folderResult.then(function(result){
            let location = options.location;
            let outputLocation = options.outputFolder;
            let clsName = options.className;

            switch(options.templateType){
                case "webapi/controller":
                    let namespaceResult = NamespaceFinder(location, STARTUPFILE, READOPTIONS, location, outputLocation);

                    namespaceResult.then(function(namespace){
                        GenerateWebAPIDocument(namespace, clsName, READOPTIONS, output, location);
                    });
                    break;
                default:
                    printInfo();
        }        
        }.bind(this));
    }
    else{
        printInfo();
    };
    
})(options);

//TODO : refactor into ES6

