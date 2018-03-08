const path = require("path");
const fs = require("fs");
const finder = require("./namespaceFinder.js");
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

(function(args){
    this.arguments = args;
    var output = this.arguments.outputFolder || this.arguments.controllerFolder;
    if(this.arguments.templateType){    

        utils.createFolderIfNotExists.bind(this);
        var func = utils.createFolderIfNotExists(output);

        func.then(function(result){
            var arguments = this.arguments;

            switch(arguments.templateType){
                case "webapi/controller":
                    let result = finder.NamespaceFinder(this.arguments.location, 
                                                        "Startup.cs", 
                                                        readOptions, 
                                                        this.arguments.outputFolder);

                    result.then(function(namespace){
                        webAPIProvider.GenerateWebAPIDocument(namespace, this.arguments.className, 
                                                              readOptions, output, this.arguments.location);
                    });
                    break;
                default:
                    utils.printInfo();
        }        
        }.bind(this));
    }
    else{
        utils.printInfo();
    };
    
})(arguments);



