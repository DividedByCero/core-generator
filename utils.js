const fs = require("fs");

/*
 * @param value {String}
 * @return {String}
*/
var ToPascalCase = function(value){
    return value[0].toUpperCase() + value.toLowerCase().slice(1, value.length);
};

/*
 * @param outputFolder {String}
 * @return {Promise}
*/
var createFolderIfNotExists = function(outputFolder){
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

var printInfo = function(){
    console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]")
    console.log("info: template type must be expecified as first parameter.")            
}

exports.ToPascalCase = ToPascalCase;
exports.createFolderIfNotExists = createFolderIfNotExists;
exports.printInfo = printInfo;
