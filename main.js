const path = require("path");
const fs = require("fs");
const finder = require("./namespaceFinder.js");
const webAPIProvider = require("./providers/webApiProvider.js");
const utils = require("./utils.js");

const READOPTIONS = { encoding : "UTF8" },
      ACTUALPATH = path.resolve("\."),
      STARTUPFILE = "Startup.cs";

let arguments = {
    location : ACTUALPATH,
    templateType : process.argv[2],
    controllerFolder : path.resolve(ACTUALPATH, "./Controllers"),
    className : process.argv[3],
    outputFolder : process.argv[4]
};

(function(args){
    this.arguments = args;
    var output = this.arguments.outputFolder || this.arguments.controllerFolder;
    
    if(this.arguments.templateType){    

        utils.createFolderIfNotExists.bind(this);
        var folderResult = utils.createFolderIfNotExists(output);

        folderResult.then(function(result){
            var arguments = this.arguments;

            switch(arguments.templateType){
                case "webapi/controller":
                    let namespaceResult = finder.NamespaceFinder(this.arguments.location, 
                                                                 STARTUPFILE, 
                                                                 READOPTIONS, 
                                                                 this.arguments.outputFolder);

                    namespaceResult.then(function(namespace){
                        webAPIProvider.GenerateWebAPIDocument(namespace, this.arguments.className, 
                                                              READOPTIONS, output, this.arguments.location);
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



