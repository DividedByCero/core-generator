export class ProjectFileInfo {
  constructor(dir, fsLib, pathLib){
    this.fsLib = fsLib;
    this.pathLib = pathLib;

    let projectFile = this.getProjectFile(dir);

    if(projectFile == null)
      this.errorMessage = "Not project Found";
    else if(projectFile == false)
      this.errorMessage = "There are more than two project files";
    else {
      this.projectFileName = projectFile;
      this.namespace = getNamespace(this.projectFileName);
    }
  }
  private getNamespace(FileName){
  	let assemblyTag = "<AssemblyName>";
  	let filepath = this.pathLib.resolve("./", FileName);
  	let result = this.fsLib.readFileSync(filepath, {encoding : "UTF-8"});
  	let startIndex = result.indexOf(assemblyTag) + assemblyTag.length;
  	let endIndex = result.indexOf("</AssemblyName>");

  	return result.slice(startIndex, endIndex);
  }

  private getProjectFile(dir) {
  	let rootFiles = [];
  	this.fsLib.readdirSync(testFolder).forEach(file => {
  		rootFiles.push(file);
  	})

  	rootFiles = rootFiles.map(file => file.split("."));

  	rootFiles = rootFiles.filter(file => file[1] == "csproj");

  	switch(rootFiles.length){
  		case 0:
  			return null;
  			break;
  		case 1:
  			return rootFiles[0].join(".");
  			break;
  		default:
  			return false;
  			break;
  	}
  }

}
