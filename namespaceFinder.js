import * as path from "path";
import * as fs from "fs";
import { printInfo, ToPascalCase, createFolderIfNotExists, resolveParentPath, setFileExtensionAsCSharpFile,
         checkIfFileExist, readFile } from "../utils.js";

const NAMESPACE_TEXT = "namespace";

/*
 * Get the namespace tree for Startup.cs project file.
 * @param location {String}
 * @param fileName {String}
 * @param opts {Object}
 * @param outputLocation {string}
 * @return {String}
*/

export default function(location, fileName, opts, outputLocation){
    let startupFileLocation = path.resolve(location, fileName);

    return new Promise(function(resolve, reject){
        fs.readFile(startupFileLocation, opts, function(err, data){
            if(err) reject(err);
            
            let start = data.indexOf(NAMESPACE_TEXT) + NAMESPACE_TEXT.length;
            let end = data.indexOf("{");

            data = data.slice(start, end).trim();

            if(outputLocation) {
                let outputDir = location.split("/")
                                        .map(x => utils.ToPascalCase(x))
                                        .join(".");
    
                data = ("").concat(data, ".", location);            
            }
            else {
                data += ".Controllers";
            }
    
            resolve(data);
        });
    });
};

