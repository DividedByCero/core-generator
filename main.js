"use strict";

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _utils = require("./utils.js");

var _projectFileInfo = require("./config/projectFileInfo.js");

var _fileWrapper = require("./config/fileWrapper.js");

var _webApiProvider = require("./providers/webApiProvider.js");

var _commonProvider = require("./providers/commonProvider.js");

var _classDependences = require("./config/classDependences.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var options = {
  rootPath: (0, _utils.resolveWorkingPath)(path),
  templateType: process.argv[2],
  Name: process.argv[3],
  outputPath: process.argv[4]
};
var projectFileObject = new _projectFileInfo.ProjectFileInfo(options.rootPath, fs, path);

function init(projectFile) {
  if (projectFile.errorMessage) {
    console.log(projectFile.errorMessage);
  } else {
    options.Name = (0, _utils.ToPascalCase)((0, _utils.clearClassName)(options.Name)); //TODO: Test This.

    var subnamespaces = (0, _utils.ConvertToNamespaceSample)(options.outputPath);
    var namespace = projectFile.namespace + (subnamespaces == null ? "" : "." + subnamespaces);
    var arrayOfDirectories = namespace.split(".");
    arrayOfDirectories.shift();
    var outputFile = path.resolve(options.rootPath, arrayOfDirectories.join("/"));
    (0, _utils.RecursiveMkDir)(options.rootPath, arrayOfDirectories, fs, path, function () {
      switch (options.templateType) {
        case "wapi:controller":
          (0, _webApiProvider.webApiProvider)(outputFile, namespace, options.Name, fs, path, _fileWrapper.FileWrapper, _classDependences.WebAPI);
          break;

        case "cm:class":
          (0, _commonProvider.commonProvider)(outputFile, namespace, options.Name, fs, path, _fileWrapper.FileWrapper, _classDependences.Commons, false);
          break;

        case "cm:interface":
          (0, _commonProvider.commonProvider)(outputFile, namespace, "I" + options.Name, fs, path, _fileWrapper.FileWrapper, _classDependences.Commons, true);
          break;

        default:
          console.log("Notificacion :: Please type a valid TemplateType, type --help for more information.");
          break;
      }
    });
  }
}

if (options.templateType) {
  if (options.templateType == "--help") {
    (0, _utils.PrintUsage)();
  } else {
    if (options.Name) init(projectFileObject);
  }
} else {
  console.log("Notification :: templateType and Name should be expecified, type --help for more information");
}