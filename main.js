const path = require("path");
const fs = require("fs");
const namespaceFinder = require("./namespaceFinder.js");
const webAPIProvider = require("./providers/webApiProvider.js");
const utils = require("./utils.js");

let readOptions = { encoding : "UTF8" };

let actualPath = path.resolve("\.");

let arguments = {
    location : actualPath,
    templateType : process.argv[2],
    controllerFolder : path.resolve(actualPath, "./Controllers"),
    className : process.argv[3],
    outputFolder : process.argv[4]
};

if(arguments.className){
    utils.createFolderIfNotExists(arguments, fs).then(function(args){
        switch(args.templateType){
            case "webapi/controller":
                NamespaceFinder(outputFolder, "Startup.cs", fs, readOptions, out).then(function(namespace){
                    webAPIProvider.GenerateWebAPIDocument(namespace, arguments.className, readOptions, out);
                });
            default:
                console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]")
                console.log("info: template type must be expecified as first parameter.")
        
        }    
    }).catch(function(out){
        console.log(out, templateType);
        console.log("Error, there are not permission into the folder that this process was executed.");
    });    
};

