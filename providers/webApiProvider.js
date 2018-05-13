"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webApiProvider = webApiProvider;

var SUFFIX = 'Controller',
    TYPE = 'class ',
    INHERIDATE = 'Controller ',
    NAMESPACE = 'namespace ',
    ACCESS = 'public ',
    CONTROLLER_ATTRIBUTE = '[Route("api/[controller]")]',
    USING = "using ",
    SEMICOLON = ";",
    NEWLINE = "\n",
    TAB = "\t",
    TABCODE = function TABCODE(code) {
  return code.map(function (line) {
    return TAB + line;
  });
};

function webApiProvider(output, fileNamespace, className, fsLib, pathLib, FileWrapperClass, dependences) {
  var classDefinition = TAB + ACCESS + TYPE + className + SUFFIX + " : " + INHERIDATE;
  var lines = [NEWLINE, "{", NEWLINE, NEWLINE, NEWLINE, "}", NEWLINE];
  fileNamespace = NAMESPACE + fileNamespace + NEWLINE;
  dependences = dependences.map(function (dep) {
    return USING + dep + SEMICOLON + NEWLINE;
  }).join("");
  var result = dependences + fileNamespace + ("{" + NEWLINE) + (TAB + CONTROLLER_ATTRIBUTE + NEWLINE) + classDefinition + TABCODE(lines).join("") + ("}" + NEWLINE);
  var writer = new FileWrapperClass(output + "/" + className + SUFFIX + ".cs", fsLib);
  writer.isAccesible(function (e) {
    writer.writeFile(result, function () {
      console.log("Success :: File Succesfully Scarfolded");
    }, function (err) {
      console.log("Error :: ", err.message);
    });
  }, function () {
    console.log("Notificacion :: The File Already exists");
  });
}

;