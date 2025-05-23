const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { ConsoleMessages } = require("@elzazo/console-messages");

// Config
const SPLIT_DIRS_REGEXP = /(?<!:)\//gi;

/**
 * ## Create Path
 * > Create Complete Paths For file or directory like `path/to/path` or `path/to/file.ext` or `D:/path/to/path`
 */
class CreatePath {
  /**
   * @param {boolean} [display_info=true]
   * @param {ConsoleMessages} CM
   */
  constructor(display_info = true, CM = null) {
    this.display_info = display_info;
    this.CM = CM || new ConsoleMessages();
  }

  /**
   * ### First Steep in Path Creation
   *
   * #### params:
   * ```txt
   *    type : Directory or File
   * ```
   *
   * #### steeps:
   * - Delete `/` From Start And End in Path
   * - Check Path is Empty
   * - Check Path Already Exist
   * - Check Empty Dir Exist in Path | Like: `path/to//path` or `path/to/ /path`
   *
   * _Every Steep With Message Displaying_
   *
   * #### return:
   * ```txt
   * => [Continue, Result, New_Path]
   *
   *    Continue : Boolean indicate Continue After First Steep Or Not
   *    Result   : Boolean indicate Path Creation Process Don or Not
   *    New_Path : New Path After First Steep Filter & Modification
   * ```
   *
   */
  #firstSteep(path = "", type = "") {
    if (this.display_info) this.CM.normal(`Start Create ${type} Path '${path}'`);

    // Delete '/' From Start And End in Path
    path = path.replace(/(^\/*|\/*$)/gi, "");
    if (/(^\/+|\/+$)/.test(path)) {
      if (this.display_info) this.CM.warning(`\t${type} Path Must Be Without '/' in Start and End`);
    }

    // Check Path is Empty
    if (path.trim() === "") {
      if (this.display_info) this.CM.error(`\t${type} Path is Empty\n`);
      return [false, false, path];
    }

    // Check Path Already Exist
    if (existsSync(path)) {
      if (this.display_info) this.CM.succes(`\t${type} '${path}' Already Exist\n`);
      return [false, true, path];
    }

    // Check Empty Dir Exist in Path | Like: 'path/to//path' or 'path/to/ /path'
    for (let dir of path.split(SPLIT_DIRS_REGEXP)) {
      if (dir.trim() === "") {
        if (this.display_info) this.CM.error(`\t${type} Path '${path}' containe an empty name | Like : 'path/to//path' or 'path/to/ /path'\n`);
        return [false, false, path];
      }
    }

    return [true, false, path];
  }

  /**
   * ### Create Directory
   */
  make_dir(path = "", called_from_makeFilePath = false) {
    if (!called_from_makeFilePath) {
      // Run First Steep
      const [Continue, Result, New_Path] = this.#firstSteep(path, "Directory");
      if (!Continue) return Boolean(Result);
      path = New_Path;
    }

    // Separate Dirs
    const Dirs = path.split(SPLIT_DIRS_REGEXP);

    // Start Creation
    let global_path = ``;
    for (let [index, dir] of Object.entries(Dirs)) {
      // Add Current Dir To Global Path | If Not Last Dir Add '/'
      global_path += dir + (+index === Dirs.length - 1 ? "" : "/");

      if (existsSync(global_path)) {
        if (this.display_info) this.CM.succes(`\tDirectory '${global_path}' Already Exist.`);
      } else {
        try {
          mkdirSync(global_path);
          if (this.display_info) this.CM.succes(`\tDirectory '${global_path}' Was Created.`);
        } catch (error) {
          if (this.display_info) this.CM.error(`\tError To Create Directory '${global_path}' | Error Message : ${error.message}\n`);
          return false;
        }
      }
    }

    if (!called_from_makeFilePath && this.display_info) this.CM.normal("");
    return true;
  }

  /**
   * ### Create File
   */
  make_file(path = "", filecontent = "") {
    // Run First Steep
    const [Continue, Result, New_Path] = this.#firstSteep(path, "File");
    if (!Continue) return Boolean(Result);
    path = New_Path;

    // Get Dirs Path
    const split_path = path.split("/"); // .replace(/(^\/*|\/*$)/gi, "").
    const dirs_path = split_path.slice(0, split_path.length - 1).join("/");

    // Create Dirs In Path If Exists
    if (split_path.length !== 1) if (!this.make_dir(dirs_path, true)) return false;

    // Create File
    try {
      // Convert FileContent To JSON If Path End With '.json'
      if (/.json$/gi.test(path)) filecontent = JSON.stringify(filecontent);

      // Save File
      writeFileSync(path, filecontent);

      if (this.display_info) this.CM.succes(`\tFile '${path}' Was Created.\n`);
      return true;
    } catch (error) {
      if (this.display_info) this.CM.error(`\tError To Create File '${path}' | Error: ${error.message}\n`);
      return false;
    }
  }
}

module.exports = { CreatePath };
