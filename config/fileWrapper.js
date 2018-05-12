export class FileWrapper {
  constructor(filepath, fsLib){
    this.filepath = filepath;
    this.encoding : "UTF8";
    this.fsLib = fsLib;
  }

  /**
   *
   * @param {function} onSuccess
   * @param {function} onError
   * @return {Promise} result
   */
  public readFile(onSuccess, onError) {
      this.fsLib.readFile(this.filepath, this.encoding, (error, data) => {
          if(error)
              onError(error);
          else
              onSuccess(data);
      });
  }

  /**
   *
   * @param {function} onSuccess
   * @param {function} onError
   * @return {Promise} result
   */

  public isAccesible(onSuccess, onError){
      this.fsLib.access(this.filepath, (exists) => {
          if(exists)
              onSuccess(true);
          else
              onError(false);
      });
  };
}
