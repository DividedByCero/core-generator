"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonProvider = commonProvider;

var CLASS = 'class ',
    INTERFACE = "interface ",
    NAMESPACE = 'namespace ',
    ACCESS = 'public ',
    USING = "using ",
    SEMICOLON = ";",
    NEWLINE = "\n",
    TAB = "\t",
    TABCODE = function TABCODE(code) {
  return code.map(function (line) {
    return TAB + line;
  });
};

function commonProvider(output, fileNamespace, className, fsLib, pathLib, FileWrapperClass, dependences, isInterface) {
  var classDefinition = TAB + ACCESS + (isInterface ? INTERFACE : CLASS) + className;
  var lines = [NEWLINE, "{", NEWLINE, NEWLINE, NEWLINE, "}", NEWLINE];
  fileNamespace = NAMESPACE + fileNamespace + NEWLINE;
  dependences = dependences.map(function (dep) {
    return USING + dep + SEMICOLON + NEWLINE;
  }).join("");
  var result = dependences + fileNamespace + ("{" + NEWLINE) + classDefinition + TABCODE(lines).join("") + ("}" + NEWLINE);
  var writer = new FileWrapperClass(output + "/" + className + ".cs", fsLib);
  writer.isAccesible(function (e) {
    writer.writeFile(result, function () {
      console.log("Success :: File Succesfully Scarfolded");
    }, function (err) {
      console.log("Error :: ", err.message);
    });
  }, function () {
    console.log("Notification :: The File Already exists");
  });
}

;