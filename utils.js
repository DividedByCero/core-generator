// TODO: Write Descriptions

export function clearClassName(name){
  let regx = /[a-zA-Z/]/;
  return name.split("").filter(c => regx.test(c)).join("");
}

export function ConvertToNamespaceSample(location){
  let regx = /[a-zA-Z/]/;
  location = location.replace(/[.]/g, "");

  if (location.split("").every(x => regx.test(x))){
	  location = location.split("/").filter(x => x != '');

    if(location.length == 0){
      return null;
    }

    location = location.map(y => ToPascalCase(y))
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
      console.log("Notificacion :: Folder " + arrayOfDirectories[0] + " Already Exists");
    else
      console.log("Notificacion :: Folder " + arrayOfDirectories[0] + " Created");

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

export function PrintUsage(){
let CLIlines = `
[usage]: ntcgen [TEMPLATE TYPE] [CLASSNAME] [OUTPUT_PATH]
[info]:
- Template type must be expecified as first parameter.
- Avoid any non-letter character inside the [CLASSNAME] (All will be ignore).
- Any non-letter character into [OUTPUT_PATH] would cause "Invalid output" notificacion.
- subDirectories expecified in the [OUTPUT_PATH] would been created.

[Templates Types]
- wapi:controller -> WebAPI controller
- cm:class        -> Class
- cm:interface    -> Interface
`;
console.log(CLIlines);
}
