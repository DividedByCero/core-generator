const utils = require("../utils.js");
const path = require("path");
const fs = require("fs");

exports.GenerateWebAPIDocument = function(namespace, className, opts, outputDir, actualPath){
    // had to use ".." because __dirname target to this file location.
    var programLocation = path.resolve(__dirname, "..");

    var templatefile = path.resolve(programLocation, "templates/web-api-controller.cs");
    //building a castle of abstractions. XD
    className = utils.ToPascalCase(className) + "Controller";

    //../location/filename.cs
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

                fs.writeFile(outputDir, fileData, function() {
                    console.log("File successfully scarffolded.");
                });
            });
        }
        else{
            console.log("Invalid name, the Controller already exists...");
        }
    });    
}