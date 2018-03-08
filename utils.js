const fs = require("fs");
/*
 * @param value {String}
 * @return {String}
*/

var ToPascalCase = function(value){
    return value[0].toUpperCase() + value.slice(1, value.length);
};

exports.ToPascalCase = ToPascalCase;

exports.generateClassName = function(className){
    return ToPascalCase(className) + "Controller";
};

exports.createFolderIfNotExists = function(outputFolder){
    return new Promise(function(resolve, reject){
        fs.access(outputFolder, function(exists){
            if(exists){                
                fs.mkdir(outputFolder, function(err){
                    resolve(false);
                });
            }
            else{
                resolve(true);
            }
        });  
    }); 
};

exports.printInfo = function(){
    console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]")
    console.log("info: template type must be expecified as first parameter.")            
}