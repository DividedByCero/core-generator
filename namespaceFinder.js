"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _utils = require("../utils.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var NAMESPACE_TEXT = "namespace";
/*
 * Get the namespace tree for Startup.cs project file.
 * @param location {String}
 * @param fileName {String}
 * @param opts {Object}
 * @param outputLocation {string}
 * @return {String}
*/

function _default(location, fileName, opts, outputLocation) {
  var startupFileLocation = path.resolve(location, fileName);
  return new Promise(function (resolve, reject) {
    fs.readFile(startupFileLocation, opts, function (err, data) {
      if (err) reject(err);
      var start = data.indexOf(NAMESPACE_TEXT) + NAMESPACE_TEXT.length;
      var end = data.indexOf("{");
      data = data.slice(start, end).trim();

      if (outputLocation) {
        var outputDir = location.split("/").map(function (x) {
          return utils.ToPascalCase(x);
        }).join(".");
        data = "".concat(data, ".", location);
      } else {
        data += ".Controllers";
      }

      resolve(data);
    });
  });
}

;