const path = require("path");
const fs = require("fs");

let readOptions = { encoding : "UTF8" }; 
let location = path.resolve("\.");
let templateType = process.argv[2];
let typeFlag = process.argv[3];
let className = process.argv[4];
let controllerFolder = path.resolve(location, "./Controllers");

function getNamespaceNameFromStartupFile(callback){
    let fileName = path.resolve(location, "Startup.cs");
    let namespaceKeyword = "namespace";
    fs.readFile(fileName, readOptions, function(err, data){
        if(err){
            callback(false, null);
        }
        else{
            let startpos = data.indexOf(namespaceKeyword) + namespaceKeyword.length;
            let endpos = data.indexOf("{");
            data = data.slice(startpos, endpos).trim() + ".Controllers";            
            callback(true, data);    
        }
    });
}

function webApiControllerDispacher(){
    let classNamespace;        
    if((typeFlag == "--name" || typeFlag == "-n") && className){
        getNamespaceNameFromStartupFile(function(exists, data){
            if(exists){
                classNamespace = data;
                className = className[0].toUpperCase() + className.slice(1,className.length) + "Controller";
                let fileName = className + ".cs";        
                fs.access(path.resolve(controllerFolder, fileName), function(exists){
                    if(exists){
                            let plainFile = fs.readFile(path.resolve(__dirname, "templates/web-api-controller.cs"), readOptions, function(err, fileData){
                                if(err) throw err;
                                fileData = fileData.replace("[[CONTROLLER-NAME]]", className);    
                                fileData = fileData.replace("[[NAMESPACE]]", classNamespace);    
                                let output = path.resolve(controllerFolder, fileName);
                                fs.writeFile(output, fileData, () => {
                                    console.log("file successfully scarffolded");
                                });
                            });
                    }
                    else{
                        console.log("Invalid Name, The Controller already exists.");
                        return;
                    }
                });
            }
            else{
                console.log("can't scarfford, entryFile (Startup.cs) not found.")
            }
        });
    }
    else{
        console.log("The flag --name must be expecified");
    };   
}

function generateFile(){
    if(templateType == "webapi/controller"){
        webApiControllerDispacher();
    }
    else{
        console.log("Template type must be expecified as first parameter")
    }
}

fs.access(controllerFolder, function(exists){
    if(exists){
        fs.mkdir("./Controllers", () => {
            generateFile();
        });
    }
    else{
        generateFile();
    }
});

