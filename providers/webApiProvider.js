"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTROLLERSUFFIX = "Controller";

function _default(namespace, className, opts, outputDir, actualPath) {
  var programLocation = (0, _utils.resolveParentPath)();

  var templatefile = _path.default.resolve(programLocation, "templates/web-api-controller.cs");

  className = (0, _utils.ToPascalCase)(className) + CONTROLLERSUFFIX;
  outputDir = (0, _utils.setFileExtensionAsCSharpFile)(outputDir, className);
  (0, _utils.checkIfFileExist)(outputDir, function () {
    (0, _utils.readFile)(templatefile, opts, function (fileData) {
      fileData = fileData.replace("[[CONTROLLER-NAME]]", className);
      fileData = fileData.replace("[[NAMESPACE]]", namespace);

      _fs.default.writeFile(outputDir, fileData, function () {
        console.log("File successfully scarffolded.");
      });
    }, function (err) {
      console.log(err);
    });
  }, function () {
    console.log("Invalid name, the Controller already exists...");
  });
}

;