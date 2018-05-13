"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearClassName = clearClassName;
exports.ConvertToNamespaceSample = ConvertToNamespaceSample;
exports.RecursiveMkDir = RecursiveMkDir;
exports.ToPascalCase = ToPascalCase;
exports.resolveParentPath = resolveParentPath;
exports.resolveWorkingPath = resolveWorkingPath;
exports.PrintUsage = PrintUsage;

// TODO: Write Descriptions
function clearClassName(name) {
  var regx = /[a-zA-Z/]/;
  return name.split("").filter(function (c) {
    return regx.test(c);
  }).join("");
}

function ConvertToNamespaceSample(location) {
  var regx = /[a-zA-Z/]/;
  location = location.replace(/[.]/g, "");

  if (location.split("").every(function (x) {
    return regx.test(x);
  })) {
    location = location.split("/").filter(function (x) {
      return x != '';
    });

    if (location.length == 0) {
      return null;
    }

    location = location.map(function (y) {
      return ToPascalCase(y);
    }).join(".");
    return location;
  } else {
    return false;
  }
}

function RecursiveMkDir(path, arrayOfDirectories, fsLib, pathLib, callback) {
  if ((arrayOfDirectories || []).length == 0) {
    callback();
    return null;
  }

  var dir = pathLib.resolve(path, arrayOfDirectories[0]);
  fsLib.mkdir(dir, function (err) {
    if (err) console.log("Notificacion :: Folder " + arrayOfDirectories[0] + " Already Exists");else console.log("Notificacion :: Folder " + arrayOfDirectories[0] + " Created");
    arrayOfDirectories.shift();
    RecursiveMkDir(dir, arrayOfDirectories, fsLib, pathLib, callback);
  });
}

function ToPascalCase(value) {
  return value[0].toUpperCase() + value.toLowerCase().slice(1, value.length);
}

function resolveParentPath(pathLib) {
  return pathLib.resolve(__dirname, "..");
}

function resolveWorkingPath(pathLib) {
  return pathLib.resolve("\.");
}

function PrintUsage() {
  var CLIlines = "\n[usage]: ntcgen [TEMPLATE TYPE] [CLASSNAME] [OUTPUT_PATH]\n[info]:\n- Template type must be expecified as first parameter.\n- Avoid any non-letter character inside the [CLASSNAME] (All will be ignore).\n- Any non-letter character into [OUTPUT_PATH] would cause \"Invalid output\" notificacion.\n- subDirectories expecified in the [OUTPUT_PATH] would been created.\n\n[Templates Types]\n- wapi:controller -> WebAPI controller\n- cm:class        -> Class\n- cm:interface    -> Interface\n";
  console.log(CLIlines);
}