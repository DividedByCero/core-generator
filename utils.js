import fs from "fs";

export {ToPascalCase, 
        createFolderIfNotExists, 
        printInfo, 
        resolveParentPath, 
        setFilePathExtensionAsCSharpFile, 
        checkIfFileExist, 
        readFile };

/**
 * 
 * @param {string} value 
 * @return string
 */
function ToPascalCase(value){
    return value[0].toUpperCase() + value.toLowerCase().slice(1, value.length);
}

/**
 * @return string
 */
function resolveParentPath(){
    return path.resolve(__dirname, "..");
}

/**
 * 
 * @param {string} output 
 * @param {string} clsName
 * @return string 
 */
function setFilePathExtensionAsCSharpFile(output, clsName){
    return path.resolve(output, clsName + ".cs");
}

/**
 * 
 * @param {string} output 
 * @param {function} onSuccess 
 * @param {function} onError 
 */
function checkIfFileExist(output, onSuccess, onError){
    fs.access(output, (exists) => {
        if(exists)
            onSuccess();
        else
            onError();
    });    
};

/**
 * 
 * @param {string} url 
 * @param {object} opts 
 * @param {function} onSuccess 
 * @param {function} onError 
 */
function readFile(url, opts, onSuccess, onError) {
    fs.readFile(url, opts, function(err, fileData){
        if(err)
            onError(err);
        else    
            onSuccess(fileData);
    });
}
/**
 * 
 * @param {string} outputFolder 
 * @return Promise
 */
function createFolderIfNotExists(outputFolder) {
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

/**
 * Print CLI call structure info.
 */
function printInfo(){
    console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]");
    console.log("info: template type must be expecified as first parameter.");            
}



