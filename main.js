const path = require("path");
const fs = require("fs");
const finder = require("./namespaceFinder.js");
const webAPIProvider = require("./providers/webApiProvider.js");
const utils = require("./utils.js");

const READOPTIONS = { encoding : "UTF8" },
      ACTUALPATH = path.resolve("\."),
      STARTUPFILE = "Startup.cs";

var arguments = {
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
            var location = this.arguments.location;
            var outputLocation = this.arguments.outputFolder;
            var clsName = this.arguments.className;

            switch(arguments.templateType){
                case "webapi/controller":
                    let namespaceResult = finder.NamespaceFinder(location, STARTUPFILE, READOPTIONS, location, outputLocation);

                    namespaceResult.then(function(namespace){
                        webAPIProvider.GenerateWebAPIDocument(namespace, clsName, READOPTIONS, output, location);
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



