const { existsSync, writeFileSync, readFile } = require("fs");
const { ConsoleMessages } = require("@elzazo/console-messages");

// Config
const ERROR_ADRESS = `TextFIle ERROR`;
const OPTIONS = {
  /**
   * ### Initial Value
   *
   * _default value is empty string_
   */
  initial_value: "",

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
 * ## Manage a Text File (READ|WRITE|PUSH|UNSHIFT)
 *
 * _the json file will be created if not exist_
 */
class TextFIle {
  #file_path;

  /**
   * @param {String} file_path
   * @param {OPTIONS} options
   */
  constructor(file_path = "", options) {
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
      if (this.display_info) this.CM.error(`${ERROR_ADRESS}: File Path must be not empty`);
      return false;
    }

    // Check File Type is JSON
    if (!this.#file_path.trim().endsWith("txt")) {
      if (this.display_info) this.CM.error(`${ERROR_ADRESS}: File must be txt type '.txt'`);
      return false;
    }

    return true;
  }

  /**
   * ### Read File
   */
  read() {
    const err_msg = `TextFIle ERROR: in Read data From '${this.#file_path}'`;

    if (this.#checkPath()) {
      return new Promise((resolve, reject) => {
        try {
          readFile(this.#file_path, (err, file_content) => {
            if (err) {
              if (this.display_info) this.CM.error(`${err_msg}\nError Message : '${String(err)}'`);
              resolve(null);
            } else resolve(String(file_content));
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
   * Write in File
   *
   * @param {string} [text=""]
   */
  write(text = "") {
    const err_msg = `TextFIle ERROR: in Write data In '${this.#file_path}'`;

    if (this.#checkPath()) {
      try {
        writeFileSync(this.#file_path, text);
      } catch (error) {
        if (this.display_info) this.CM.error(`${err_msg}\nError Message : '${error.message}'`);
      }
    }
  }

  /**
   * ### Push in File
   * Set Data in last point in File
   *
   * ```txt
   *    in_new_ligne : Boolean indicate push in new ligne
   * ```
   */
  async push(text = "", in_new_ligne = false) {
    if (this.#checkPath()) {
      const old_content = await this.read();
      const new_content = `${old_content}${in_new_ligne ? "\n" : ""}${text}`;

      // Save New Content
      this.write(new_content);
    }
  }

  /**
   * ### Unshift in File
   * Set Data in first point in File
   *
   * ```txt
   *    in_new_ligne : Boolean indicate unshift in new ligne
   * ```
   */
  async unshift(text = "", in_new_ligne = false) {
    if (this.#checkPath()) {
      const old_content = await this.read();
      const new_content = `${text}${in_new_ligne ? "\n" : ""}${old_content}`;

      // Save New Content
      this.write(new_content);
    }
  }
}

module.exports = { TextFIle };
