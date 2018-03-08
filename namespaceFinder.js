const utils = require("./utils.js");

/*
 * @param treeLocation {String}
 * @param fileName {String}
 * @param fs {fs Node Lib Object}
 * @param opts {Object}
 * @param outputDir {string}
 * @return {String}
*/
exports.NamespaceFinder = function(args, fileName, fs, opts){
    let NAMESPACE_TEXT = "namespace";
    let StartupFileLocation = path.resolve(args.location, fileName);

    return new Promise(function(resolve, reject){
        fs.readFile(StartupFileLocation, opts, function(err, data){
            if(err) reject(err);
            
            let start = data.indexOf(NAMESPACE_TEXT) + NAMESPACE_TEXT.length;
            let end = data.indexOf("{");

            data = data.slice(startpos, endpos).trim();
            if(outputDir)
            {
                let outputDir = outputDir.split("/")
                                         .map(x => utils.ToPascalCase(x))
                                         .join(".");
    
                data = ("").concat(data, ".", outputDir);            
            }
            else{
                data += ".Controllers";
            }
    
            resolve(data);
        });
    });
};

