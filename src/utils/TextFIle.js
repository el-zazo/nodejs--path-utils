const { existsSync, writeFileSync, readFile } = require("fs");
const { ConsoleMessages } = require("@el-zazo/console-messages");
const { ERROR_MESSAGES, REGEX, DEFAULT_OPTIONS } = require("../data/constants");
const { CreatePath } = require("./CreatePath");

// Destructure constants for easier access
const { TEXT_FILE: ERROR } = ERROR_MESSAGES;
const { TXT_EXTENSION } = REGEX;

/**
 * ## Manage a Text File (READ|WRITE|PUSH|UNSHIFT)
 *
 * _the json file will be created if not exist_
 *
 * @class TextFile
 * @description Handles reading and writing operations for text files with proper error handling
 */
class TextFile {
  #file_path;

  /**
   * Creates an instance of TextFile
   *
   * @param {String} file_path - Path to the text file
   * @param {Object} options - Configuration options
   * @param {String} [options.initial_value=""] - Initial value if file doesn't exist
   * @param {ConsoleMessages} [options.CM=new ConsoleMessages()] - Console message handler
   * @param {boolean} [options.display=true] - Whether to display console messages
   */
  constructor(file_path = "", options) {
    const { initial_value = "", CM = new ConsoleMessages(), display = DEFAULT_OPTIONS.DISPLAY_INFO } = { ...options };
    this.display_info = display;
    this.#file_path = file_path;
    this.CM = CM;

    // Create path creator instance
    this.pathCreator = new CreatePath(display, CM);

    // Check Path
    this.#checkPath();

    // Create File if Not Exist
    if (!existsSync(file_path)) {
      this.pathCreator.make_file(file_path, initial_value);
    }
  }

  /**
   * ### Check Path
   * Validates the file path to ensure it's not empty and has a .txt extension
   *
   * @private
   * @returns {boolean} - True if path is valid, false otherwise
   */
  #checkPath() {
    try {
      // Check Path Not Empty
      if (this.#file_path.trim() === "") {
        if (this.display_info) this.CM.error(`${ERROR.ID}: ${ERROR.EMPTY_PATH}`);
        return false;
      }

      // Check File Type is TXT
      if (!new RegExp(TXT_EXTENSION).test(this.#file_path)) {
        if (this.display_info) this.CM.error(`${ERROR.ID}: ${ERROR.INVALID_TYPE}`);
        return false;
      }

      return true;
    } catch (error) {
      if (this.display_info) this.CM.error(`${ERROR.ID}: Unexpected error: ${error.message}`);
      return false;
    }
  }

  /**
   * ### Read File
   * Reads the text file content
   *
   * @returns {Promise<string|null>} - File content as string or null if error occurs
   */
  read() {
    const err_msg = `${ERROR.ID}: ${ERROR.READ_ERROR} '${this.#file_path}'`;

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
   * Writes text to the file, replacing any existing content
   *
   * @param {string} [text=""] - Text to write to the file
   * @returns {boolean} - True if write was successful, false otherwise
   */
  write(text = "") {
    const err_msg = `${ERROR.ID}: ${ERROR.WRITE_ERROR} '${this.#file_path}'`;

    if (this.#checkPath()) {
      try {
        writeFileSync(this.#file_path, text);
        return true;
      } catch (error) {
        if (this.display_info) this.CM.error(`${err_msg}\nError Message : '${error.message}'`);
        return false;
      }
    }
    return false;
  }

  /**
   * ### Push in File
   * Set Data in last point in File
   *
   * @param {string} [text=""] - Text to append to the end of the file
   * @param {boolean} [in_new_ligne=false] - Whether to add a new line before the text
   * @returns {Promise<boolean>} - True if operation was successful, false otherwise
   */
  async push(text = "", in_new_ligne = false) {
    try {
      if (this.#checkPath()) {
        const old_content = await this.read();
        if (old_content === null) return false;

        const new_content = `${old_content}${in_new_ligne ? "\n" : ""}${text}`;

        // Save New Content
        return this.write(new_content);
      }
      return false;
    } catch (error) {
      if (this.display_info) this.CM.error(`${ERROR.ID}: Error appending to file: ${error.message}`);
      return false;
    }
  }

  /**
   * ### Unshift in File
   * Set Data in first point in File
   *
   * @param {string} [text=""] - Text to prepend to the beginning of the file
   * @param {boolean} [in_new_ligne=false] - Whether to add a new line after the text
   * @returns {Promise<boolean>} - True if operation was successful, false otherwise
   */
  async unshift(text = "", in_new_ligne = false) {
    try {
      if (this.#checkPath()) {
        const old_content = await this.read();
        if (old_content === null) return false;

        const new_content = `${text}${in_new_ligne ? "\n" : ""}${old_content}`;

        // Save New Content
        return this.write(new_content);
      }
      return false;
    } catch (error) {
      if (this.display_info) this.CM.error(`${ERROR.ID}: Error prepending to file: ${error.message}`);
      return false;
    }
  }
}

module.exports = { TextFile };
