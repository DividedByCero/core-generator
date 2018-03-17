import fs from "fs";

/*
 * @param value {String}
 * @return {String}
*/
let ToPascalCase = (value) => value[0].toUpperCase() + value.toLowerCase().slice(1, value.length);

let resolveParentPath = () => path.resolve(__dirname, "..");

let setFileExtensionAsCSharpFile = (output, clsName) => path.resolve(output, clsName + ".cs");

let checkIfFileExist = (output, onSuccess, onError) => {
    fs.access(output, (exists) => {
        if(exists)
            onSuccess();
        else
            onError();
    });    
};

let readFile = (url, opts, onSuccess, onError) => {
    fs.readFile(url, opts, function(err, fileData){
        if(err)
            onError(err);
        else    
            onSuccess(fileData);
    });
}

/*
 * @param outputFolder {String}
 * @return {Promise}
*/
let createFolderIfNotExists = (outputFolder) => {
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

let printInfo = () => {
    console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]");
    console.log("info: template type must be expecified as first parameter.");            
}



export {ToPascalCase, createFolderIfNotExists, printInfo, resolveParentPath, setFileExtensionAsCSharpFile, 
        checkIfFileExist, readFile };
