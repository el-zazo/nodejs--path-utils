const { existsSync, writeFileSync, readFile } = require("fs");
const { ConsoleMessages } = require("@el-zazo/console-messages");
const { ERROR_MESSAGES, REGEX, DEFAULT_OPTIONS } = require("../data/constants");
const { CreatePath } = require("./CreatePath");

// Destructure constants for easier access
const { JSON_FILE: ERROR } = ERROR_MESSAGES;
const { JSON_EXTENSION } = REGEX;

/**
 * ## Manage a JSON File (READ|WRITE)
 *
 * _the json file will be created if not exist_
 *
 * @class JsonFile
 * @description Handles reading and writing operations for JSON files with proper error handling
 */
class JsonFile {
  #file_path;

  /**
   * Creates an instance of JsonFile
   *
   * @param {String} file_path - Path to the JSON file
   * @param {Object} options - Configuration options
   * @param {Object} [options.initial_value={}] - Initial value if file doesn't exist
   * @param {ConsoleMessages} [options.CM=new ConsoleMessages()] - Console message handler
   * @param {boolean} [options.display=true] - Whether to display console messages
   */
  constructor(file_path, options) {
    const { initial_value = {}, CM = new ConsoleMessages(), display = DEFAULT_OPTIONS.DISPLAY_INFO } = { ...options };
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
   * Validates the file path to ensure it's not empty and has a .json extension
   *
   * @private
   * @returns {boolean} - True if path is valid, false otherwise
   */
  #checkPath() {
    try {
      // Check Path Not Empty
      if (this.#file_path.trim() === "") {
        if (this.display_info) this.CM.error(`${ERROR.ID} ${ERROR.EMPTY_PATH}`);
        return false;
      }

      // Check File Type is JSON
      if (!new RegExp(JSON_EXTENSION).test(this.#file_path)) {
        if (this.display_info) this.CM.error(`${ERROR.ID} ${ERROR.INVALID_TYPE}`);
        return false;
      }

      return true;
    } catch (error) {
      if (this.display_info) this.CM.error(`${ERROR.ID} Unexpected error: ${error.message}`);
      return false;
    }
  }

  /**
   * ### Read File
   * Reads and parses the JSON file content
   *
   * @returns {Promise<Object|null>} - Parsed JSON content or null if error occurs
   */
  read() {
    const err_msg = `${ERROR.ID} ${ERROR.READ_ERROR} '${this.#file_path}'`;

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
   * Writes data to the JSON file
   *
   * @param {Object} [data=null] - Data to write to the file
   * @returns {boolean} - True if write was successful, false otherwise
   */
  write(data = null) {
    const err_msg = `${ERROR.ID} ${ERROR.WRITE_ERROR} '${this.#file_path}'`;

    if (data === null) {
      if (this.display_info) this.CM.error(`${ERROR.ID} ${ERROR.NULL_DATA}`);
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
