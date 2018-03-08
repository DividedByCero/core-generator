const utils = require("./utils.js");
const path = require("path");
const fs = require("fs");

/*
 * Get the namespace tree for Startup.cs project file.
 * @param location {String}
 * @param fileName {String}
 * @param opts {Object}
 * @param outputLocation {string}
 * @return {String}
*/

exports.NamespaceFinder = function(location, fileName, opts, outputLocation){
    let NAMESPACE_TEXT = "namespace";
    let StartupFileLocation = path.resolve(location, fileName);


    return new Promise(function(resolve, reject){
        fs.readFile(StartupFileLocation, opts, function(err, data){
            if(err) reject(err);
            
            let start = data.indexOf(NAMESPACE_TEXT) + NAMESPACE_TEXT.length;
            let end = data.indexOf("{");

            data = data.slice(start, end).trim();
            if(outputLocation)
            {
                let outputDir = location.split("/")
                                        .map(x => utils.ToPascalCase(x))
                                        .join(".");
    
                data = ("").concat(data, ".", location);            
            }
            else{
                data += ".Controllers";
            }
    
            resolve(data);
        });
    });
};

