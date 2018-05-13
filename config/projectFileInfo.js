export class ProjectFileInfo {
	constructor(dir, fsLib, pathLib) {
		this.fsLib = fsLib;
		this.pathLib = pathLib;
		this.dir = dir;

		let projectFile = this.getProjectFile(dir);

		if (projectFile == null)
			this.errorMessage = "Error :: Not project Found";
		else if (projectFile == false)
			this.errorMessage = "Error :: There are more than two project files";
		else {
			this.projectFileName = projectFile;
			this.namespace = this.getNamespace(this.projectFileName);
		}
	}
	getNamespace(FileName) {
		let assemblyTag = "<AssemblyName>";
		let filepath = this.pathLib.resolve(this.dir, FileName);
		let result = this.fsLib.readFileSync(filepath, { encoding: "UTF-8" });
		let startIndex = result.indexOf(assemblyTag) + assemblyTag.length;
		let endIndex = result.indexOf("</AssemblyName>");

		return result.slice(startIndex, endIndex);
	}

	getProjectFile() {
		let rootFiles = [];
		this.fsLib.readdirSync(this.dir).forEach(file => {
			rootFiles.push(file);
		})

		rootFiles = rootFiles.map(file => file.split("."));

		rootFiles = rootFiles.filter(file => file[1] == "csproj");
		switch (rootFiles.length) {
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
