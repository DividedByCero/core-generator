import path from "path";
import fs from "fs";
import { printInfo, ToPascalCase, createFolderIfNotExists, resolveParentPath, setFileExtensionAsCSharpFile,
         checkIfFileExist, readFile } from "../utils.js";

const CONTROLLERSUFFIX = "Controller";

export default function(namespace, className, opts, outputDir, actualPath){
    let programLocation = resolveParentPath();
    let templatefile = path.resolve(programLocation, "templates/web-api-controller.cs");

    className = ToPascalCase(className) + CONTROLLERSUFFIX;
    outputDir = setFileExtensionAsCSharpFile(outputDir, className);    

    checkIfFileExist(outputDir, () => {
        readFile(templatefile, opts, (fileData) => {
            fileData = fileData.replace("[[CONTROLLER-NAME]]", className);    
            fileData = fileData.replace("[[NAMESPACE]]", namespace);    

            fs.writeFile(outputDir, fileData, function() {
                console.log("File successfully scarffolded.");
            });
        }, (err) => {
            console.log(err);
        });
    }, () => {
        console.log("Invalid name, the Controller already exists...");
    });
};