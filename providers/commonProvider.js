const CLASS = 'class ',
      INTERFACE = "interface ",
      NAMESPACE = 'namespace ',
      ACCESS = 'public ',
      USING = "using ",
      SEMICOLON = ";",
      NEWLINE = "\n",
      TAB = "\t",
      TABCODE = (code) => code.map(line => TAB + line);

export function commonProvider(output, fileNamespace, className, fsLib, pathLib, FileWrapperClass, dependences, isInterface){
    let classDefinition = TAB + ACCESS + (isInterface ? INTERFACE : CLASS) + className;
    let lines = [NEWLINE, "{", NEWLINE, NEWLINE, NEWLINE, "}", NEWLINE];

    fileNamespace = NAMESPACE + fileNamespace + NEWLINE;
    dependences = dependences.map(dep => USING + dep + SEMICOLON + NEWLINE).join("");

    let result = dependences +
    		         fileNamespace +
    		         ("{" + NEWLINE) +
    			       classDefinition +
    			       TABCODE(lines).join("") +
    			       ("}" + NEWLINE);

    let writer = new FileWrapperClass(output + "/" + className + ".cs", fsLib);

    writer.isAccesible((e) => {
      writer.writeFile(result, () => {
        console.log("Success :: File Succesfully Scarfolded");
      }, (err) => {
        console.log("Error :: ", err.message);
      });
    }, () => {
        console.log("Notification :: The File Already exists");
    });
};
