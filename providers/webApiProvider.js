const utils = require("../utils.js");
const path = require("path");
const fs = require("fs");

exports.GenerateWebAPIDocument = function(namespace, className, opts, outputDir, actualPath){
    let templatefile = path.resolve(path.resolve(__dirname, ".."), "templates/web-api-controller.cs");
    className = utils.generateClassName(className);
    outputDir = path.resolve(outputDir, className + ".cs");    

    fs.access(outputDir, function(exists){
        if(exists){
            fs.readFile(templatefile, opts, function(err, fileData){
                if(err) {
                    console.log(err);
                    return;
                }

                fileData = fileData.replace("[[CONTROLLER-NAME]]", className);    
                fileData = fileData.replace("[[NAMESPACE]]", namespace);    

                fs.writeFile(outputDir, fileData, () => {
                    console.log("file successfully scarffolded");
                });
            });
        }
        else{
            console.log("Invalid Name, The Controller already exists.");
        }
    });    
}