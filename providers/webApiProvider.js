const SUFFIX = 'Controller',
      TYPE = 'class ',
      INHERIDATE = 'Controller ',
      NAMESPACE = 'Namespace ',
      ACCESS = 'public ',
      CONTROLLER_ATTRIBUTE = '[Route("api/[controller]")]',
      USING = "Using ",
      SEMICOLON = ";",
      NEWLINE = "\n",
      TAB = "\t",
      TABCODE = (code) => code.map(line => TAB + line);

export function webApiProvider(output, fileNamespace, className, fsLib, pathLib, FileWrapperClass, dependences, ){
    let classDefinition = TAB + ACCESS + TYPE + className + SUFFIX + " : " + INHERIDATE;
    let lines = [NEWLINE, "{", NEWLINE, NEWLINE, NEWLINE, "}", NEWLINE];

    fileNamespace = NAMESPACE + fileNamespace + NEWLINE;
    dependences = dependences.map(dep => USING + dep + SEMICOLON + NEWLINE).join("");

    let result = dependences +
    		         fileNamespace +
    		         ("{" + NEWLINE) +
    		         (TAB + CONTROLLER_ATTRIBUTE + NEWLINE) +
    			       classDefinition +
    			       TABCODE(lines).join("") +
    			       ("}" + NEWLINE);

    let writer = new FileWrapperClass(output + "/" + className + ".cs", fsLib);

    writer.isAccesible((e) => {
      writer.writeFile(result, () => {
        console.log("File Succesfully scarfolded");
      }, (err) => {
        console.log("Error : ", err.message);
      });
    }, () => {
        console.log("The File Already exists");
    });
};
