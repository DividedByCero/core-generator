"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileWrapper = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FileWrapper =
/*#__PURE__*/
function () {
  function FileWrapper(filepath, fsLib) {
    _classCallCheck(this, FileWrapper);

    this.filepath = filepath;
    this.encoding = "UTF8";
    this.fsLib = fsLib;
  }
  /**
   *
   * @param {function} onSuccess
   * @param {function} onError
   * @return {Promise} result
   */


  _createClass(FileWrapper, [{
    key: "readFile",
    value: function readFile(onSuccess, onError) {
      this.fsLib.readFile(this.filepath, this.encoding, function (error, data) {
        if (error) onError(error);else onSuccess(data);
      });
    }
    /**
     *
     * @param {function} onSuccess
     * @param {function} onError
     * @return {Promise} result
     */

  }, {
    key: "isAccesible",
    value: function isAccesible(onSuccess, onError) {
      this.fsLib.access(this.filepath, function (exists) {
        if (exists) onSuccess(true);else onError(false);
      });
    }
  }, {
    key: "writeFile",
    value: function writeFile(data, onSuccess, onError) {
      var _this = this;

      this.fsLib.writeFile(this.filepath, data, this.encoding, function (err) {
        if (err) {
          onError(err);
        } else {
          onSuccess(_this.filepath);
        }
      });
    }
  }]);

  return FileWrapper;
}();

exports.FileWrapper = FileWrapper;