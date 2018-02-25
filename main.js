const path = require("path");
const fs = require("fs");

let readOptions = { encoding : "UTF8" }; 
let location = path.resolve("\.");
let typeFlag = process.argv[2];
let className = process.argv[3];
let controllerFolder = path.resolve(location, "./Controllers");

function getNamespace(callback){
    let fileName = path.resolve(location, "Startup.cs");
    let namespaceKeyword = "namespace";
    fs.readFile(fileName, readOptions, function(err, data){
        if(err){
            callback(false, null);
        }
        else{
            data = data.slice(data.indexOf(namespaceKeyword) + namespaceKeyword.length, data.indexOf("{")).trim() + ".Controllers";            
            callback(true, data);    
        }
    });
}

function generateWebAPIController(){
    let classNamespace;        
    if((typeFlag == "--name" || typeFlag == "-n") && className){
        getNamespace(function(exists, data){
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

fs.access(controllerFolder, function(exists){
    if(exists){
        fs.mkdir("./Controllers", () => {
            generateWebAPIController();
        });
    }
    else{
        generateWebAPIController();
    }
});

