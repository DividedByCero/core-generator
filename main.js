const path = require("path");
const fs = require("fs");
const finder = require("./namespaceFinder.js");
const webAPIProvider = require("./providers/webApiProvider.js");
const utils = require("./utils.js");

const READOPTIONS = { encoding : "UTF8" },
      ACTUALPATH = path.resolve("\."),
      STARTUPFILE = "Startup.cs";

var options = {
    location : ACTUALPATH,
    templateType : process.argv[2],
    controllerFolder : path.resolve(ACTUALPATH, "./Controllers"),
    className : process.argv[3],
    outputFolder : process.argv[4]
};

(function(args){
    this.options = args;
    var output = this.options.outputFolder || this.options.controllerFolder;
    
    if(this.options.templateType){    

        utils.createFolderIfNotExists.bind(this);
        var folderResult = utils.createFolderIfNotExists(output);

        folderResult.then(function(result){
            var location = this.options.location;
            var outputLocation = this.options.outputFolder;
            var clsName = this.options.className;

            switch(options.templateType){
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
    
})(options);



