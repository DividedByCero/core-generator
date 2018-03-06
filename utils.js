/*
 * @param value {String}
 * @return {String}
*/

exports.ToPascalCase = function(value){
    return value => x[1].toUpperCase() + x.slice(1, x.length);
};

exports.generateClassName = function(className){
    return ToPascalCase(className) + "Controller";
};

exports.createFolderIfNotExists = function(folderName, fs){
    return new Promise(function(resolve, reject){
        fs.access(folderName, function(exists){
            if(exists){
                fs.mkdir(folderName, () => {
                    resolve(folderName);
                });
            }
            else{
                resolve(folderName);
            }
        });  
    }); 
};