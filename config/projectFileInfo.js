"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectFileInfo = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProjectFileInfo =
/*#__PURE__*/
function () {
  function ProjectFileInfo(dir, fsLib, pathLib) {
    _classCallCheck(this, ProjectFileInfo);

    this.fsLib = fsLib;
    this.pathLib = pathLib;
    this.dir = dir;
    var projectFile = this.getProjectFile(dir);
    if (projectFile == null) this.errorMessage = "Error :: Not project Found";else if (projectFile == false) this.errorMessage = "Error :: There are more than two project files";else {
      this.projectFileName = projectFile;
      this.namespace = this.getNamespace(this.projectFileName);
    }
  }

  _createClass(ProjectFileInfo, [{
    key: "getNamespace",
    value: function getNamespace(FileName) {
      var assemblyTag = "<AssemblyName>";
      var filepath = this.pathLib.resolve(this.dir, FileName);
      var result = this.fsLib.readFileSync(filepath, {
        encoding: "UTF-8"
      });
      var startIndex = result.indexOf(assemblyTag) + assemblyTag.length;
      var endIndex = result.indexOf("</AssemblyName>");
      return result.slice(startIndex, endIndex);
    }
  }, {
    key: "getProjectFile",
    value: function getProjectFile() {
      var rootFiles = [];
      this.fsLib.readdirSync(this.dir).forEach(function (file) {
        rootFiles.push(file);
      });
      rootFiles = rootFiles.map(function (file) {
        return file.split(".");
      });
      rootFiles = rootFiles.filter(function (file) {
        return file[1] == "csproj";
      });

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
  }]);

  return ProjectFileInfo;
}();

exports.ProjectFileInfo = ProjectFileInfo;