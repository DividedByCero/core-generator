// TODO: Write Descriptions

export function ConvertToNamespaceSample(location){
  let regx = /[a-zA-Z/]/;
  location = location.replace(".", "");
  if (location.split("").every(x => regx.test(x))){
	  location = location.split("/")
	  					 .filter(x => x != '')
	  					 .map(y => ToPascalCase(y))
	  					 .join(".");
	  return location;
  }
  else
  {
  	return false;
  }
}

export function RecursiveMkDir(path, arrayOfDirectories, fsLib, pathLib, callback){
	if((arrayOfDirectories || []).length == 0){
    callback();
    return null;
  }

	let dir = pathLib.resolve(path, arrayOfDirectories[0]);

	fsLib.mkdir(dir, (err) => {
    if(err)
      console.log("folder " + arrayOfDirectories[0] + " exists");
    else
      console.log("folder " + arrayOfDirectories[0] + " created");

		arrayOfDirectories.shift();
		RecursiveMkDir(dir, arrayOfDirectories, fsLib, pathLib, callback);
	});

}

export function ToPascalCase(value){
    return value[0].toUpperCase() + value.toLowerCase().slice(1, value.length);
}

export function resolveParentPath(pathLib){
    return pathLib.resolve(__dirname, "..");
}

export function resolveWorkingPath(pathLib){
    return pathLib.resolve("\.");
}

export function printUsage(){
    console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]");
    console.log("info: template type must be expecified as first parameter.");
}
