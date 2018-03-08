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

exports.createFolderIfNotExists = function(args, fs){
    return new Promise(function(resolve, reject){
        args.controllerFolder = args.outputFolder || args.controllerFolder;
        fs.access(args.outputFolder, function(exists){
            if(exists){
                fs.mkdir(folderName, () => {
                    resolve(args);
                });
            }
            else{
                resolve(args);
            }
        });  
    }); 
};