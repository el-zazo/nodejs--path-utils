const { existsSync, writeFileSync, readFile } = require("fs");
const { ConsoleMessages } = require("@elzazo/console-messages");

// Config
const ERROR_ID = `JsonFile ERROR :`;
const OPTIONS = {
  /**
   * ### Initial Value
   *
   * _default value is `{}`_
   */
  initial_value: {},

  /**
   * ### Console Message Handler
   *
   * _default value is `new ConsoleMessages()`_
   */
  CM: new ConsoleMessages(),

  /**
   * ### Display info
   *
   * _default value is `true`_
   */
  display: true,
};

/**
 * ## Manage a JSON File (READ|WRITE)
 *
 * _the json file will be created if not exist_
 */
class JsonFile {
  #file_path;

  /**
   * @param {String} file_path
   * @param {OPTIONS} options
   */
  constructor(file_path, options) {
    const { initial_value, CM, display } = { ...OPTIONS, ...options };
    this.display_info = display;
    this.#file_path = file_path;
    this.CM = CM;

    // Check Path
    this.#checkPath(true);

    // Create File if Not Exist
    if (!existsSync(file_path)) this.write(initial_value);
  }

  /**
   * ### Check Path
   */
  #checkPath() {
    // Check Path Not Empty
    if (this.#file_path.trim() === "") {
      if (this.display_info) this.CM.error(`${ERROR_ID} File Path must be not empty`);
      return false;
    }

    // Check File Type is JSON
    if (!/.json$/gi.test(this.#file_path)) {
      if (this.display_info) this.CM.error(`${ERROR_ID} File must be json type '.json'`);
      return false;
    }

    return true;
  }

  /**
   * ### Read File
   */
  read() {
    const err_msg = `${ERROR_ID} in Read data From '${this.#file_path}'`;

    if (this.#checkPath()) {
      return new Promise((resolve, reject) => {
        try {
          readFile(this.#file_path, (err, file_content) => {
            if (err) {
              if (this.display_info) this.CM.error(`${err_msg}\nError Message : '${String(err)}'`);
              resolve(null);
            } else resolve(JSON.parse(file_content));
          });
        } catch (error) {
          if (this.display_info) this.CM.error(`${err_msg}\nError Message : '${error.message}'`);
          resolve(null);
        }
      });
    }

    return null;
  }

  /**
   * ### Write in File
   *
   * @param {null} [data=null]
   */
  write(data = null) {
    const err_msg = `${ERROR_ID} in Write data In '${this.#file_path}'`;

    if (data === null) {
      if (this.display_info) this.CM.error(`${ERROR_ID} Data must be not null`);
      return false;
    }

    if (this.#checkPath()) {
      try {
        writeFileSync(this.#file_path, JSON.stringify(data));
        return true;
      } catch (error) {
        if (this.display_info) this.CM.error(`${err_msg}\nError Message : '${error.message}'`);
        return false;
      }
    }

    return false;
  }
}

module.exports = { JsonFile };
