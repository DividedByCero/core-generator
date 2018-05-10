"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.checkIfFileExist = exports.setFileExtensionAsCSharpFile = exports.resolveParentPath = exports.printInfo = exports.createFolderIfNotExists = exports.ToPascalCase = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @param value {String}
 * @return {String}
*/
var ToPascalCase = function ToPascalCase(value) {
  return value[0].toUpperCase() + value.toLowerCase().slice(1, value.length);
};

exports.ToPascalCase = ToPascalCase;

var resolveParentPath = function resolveParentPath() {
  return path.resolve(__dirname, "..");
};

exports.resolveParentPath = resolveParentPath;

var setFileExtensionAsCSharpFile = function setFileExtensionAsCSharpFile(output, clsName) {
  return path.resolve(output, clsName + ".cs");
};

exports.setFileExtensionAsCSharpFile = setFileExtensionAsCSharpFile;

var checkIfFileExist = function checkIfFileExist(output, onSuccess, onError) {
  _fs.default.access(output, function (exists) {
    if (exists) onSuccess();else onError();
  });
};

exports.checkIfFileExist = checkIfFileExist;

var readFile = function readFile(url, opts, onSuccess, onError) {
  _fs.default.readFile(url, opts, function (err, fileData) {
    if (err) onError(err);else onSuccess(fileData);
  });
};
/*
 * @param outputFolder {String}
 * @return {Promise}
*/


exports.readFile = readFile;

var createFolderIfNotExists = function createFolderIfNotExists(outputFolder) {
  return new Promise(function (resolve, reject) {
    _fs.default.access(outputFolder, function (exists) {
      if (exists) {
        _fs.default.mkdir(outputFolder, function (err) {
          resolve(false);
        });
      } else {
        resolve(true);
      }
    });
  });
};

exports.createFolderIfNotExists = createFolderIfNotExists;

var printInfo = function printInfo() {
  console.log("usage: core-generate [TEMPLATE TYPE] [--name | -n] [CLASSNAME]");
  console.log("info: template type must be expecified as first parameter.");
};

exports.printInfo = printInfo;