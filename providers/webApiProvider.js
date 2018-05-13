const SUFFIX = 'Controller',
  TYPE = 'class ',
  INHERIDATE = 'Controller ',
  NAMESPACE = 'namespace ',
  ACCESS = 'public ',
  CONTROLLER_ATTRIBUTE = '[Route("api/[controller]")]',
  USING = "using ",
  SEMICOLON = ";",
  NEWLINE = "\n",
  TAB = "\t",
  TABCODE = (code) => code.map(line => TAB + line);

export function webApiProvider(output, fileNamespace, className, fsLib, pathLib, FileWrapperClass, dependences) {
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

  let writer = new FileWrapperClass(output + "/" + className + SUFFIX + ".cs", fsLib);

  writer.isAccesible((e) => {
    writer.writeFile(result, () => {
      console.log("Success :: File Succesfully Scarfolded");
    }, (err) => {
      console.log("Error :: ", err.message);
    });
  }, () => {
    console.log("Notificacion :: The File Already exists");
  });
};
