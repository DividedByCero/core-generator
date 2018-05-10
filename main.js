"use strict";

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _NamespaceFinder = _interopRequireDefault(require("./NamespaceFinder.js"));

var _webApiProvider = _interopRequireDefault(require("./providers/webApiProvider.js"));

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var READOPTIONS = {
  encoding: "UTF8"
},
    ACTUALPATH = path.resolve("\."),
    STARTUPFILE = "Startup.cs";
var options = {
  location: ACTUALPATH,
  templateType: process.argv[2],
  controllerFolder: path.resolve(ACTUALPATH, "./Controllers"),
  className: process.argv[3],
  outputFolder: process.argv[4]
};

(function (opts) {
  var options = opts;
  var output = options.outputFolder || options.controllerFolder;

  if (options.templateType) {
    _utils.createFolderIfNotExists.bind(this);

    var folderResult = (0, _utils.createFolderIfNotExists)(output);
    folderResult.then(function (result) {
      var location = options.location;
      var outputLocation = options.outputFolder;
      var clsName = options.className;

      switch (options.templateType) {
        case "webapi/controller":
          var namespaceResult = (0, _NamespaceFinder.default)(location, STARTUPFILE, READOPTIONS, location, outputLocation);
          namespaceResult.then(function (namespace) {
            (0, _webApiProvider.default)(namespace, clsName, READOPTIONS, output, location);
          });
          break;

        default:
          (0, _utils.printInfo)();
      }
    }.bind(this));
  } else {
    (0, _utils.printInfo)();
  }

  ;
})(options); //TODO : refactor into ES6