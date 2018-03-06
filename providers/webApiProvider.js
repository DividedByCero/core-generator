const utils = require("../utils.js");

exports.GenerateWebAPIDocument = function(namespace, className, opts, outputDir){
    let templatefile = path.resolve(__dirname, "templates/web-api-controller.cs");

    className = utils.generateClassName(className);
    outputDir = path.resolve(outputDir, className + ".cs");    

    fs.access(outputDir, function(exists){
        if(exists){
            fs.readFile(templatefile, opts, function(err, fileData){
                if(err) console.log(err);

                fileData = fileData.replace("[[CONTROLLER-NAME]]", className);    
                fileData = fileData.replace("[[NAMESPACE]]", namespace);    

                fs.writeFile(outputDir, fileData, () => {
                    console.log("file successfully scarffolded");
                });
            });
        }
        else{
            console.log("Invalid Name, The Controller already exists.");
        }
    });    
}