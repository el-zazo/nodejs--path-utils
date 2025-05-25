/**
 * @fileoverview Centralized constants for the path-utils library
 * Contains error messages, regular expressions, and default options
 */

// Error messages
const ERROR_MESSAGES = {
  CREATE_PATH: {
    EMPTY_PATH: "Path is Empty",
    INVALID_PATH_SLASHES: "Path Must Be Without '/' in Start and End",
    EMPTY_DIR_IN_PATH: "Path contains an empty name | Like : 'path/to//path' or 'path/to/ /path'",
    DIR_CREATION_ERROR: "Error To Create Directory",
    FILE_CREATION_ERROR: "Error To Create File",
  },
  JSON_FILE: {
    ID: "JsonFile ERROR :",
    EMPTY_PATH: "File Path must be not empty",
    INVALID_TYPE: "File must be json type '.json'",
    NULL_DATA: "Data must be not null",
    READ_ERROR: "in Read data From",
    WRITE_ERROR: "in Write data In",
  },
  TEXT_FILE: {
    ID: "TextFile ERROR :",
    EMPTY_PATH: "File Path must be not empty",
    INVALID_TYPE: "File must be txt type '.txt'",
    READ_ERROR: "in Read data From",
    WRITE_ERROR: "in Write data In",
  },
  READ_DIRECTORY: {
    ID: "READDIR ERROR:",
  },
};

// Regular expressions
const REGEX = {
  SPLIT_DIRS: /(?<!:)\/+/gi,
  PATH_START_END_SLASHES: /(^\/+|\/+$)/gi,
  JSON_EXTENSION: /.json$/gi,
  TXT_EXTENSION: /.txt$/gi,
};

// Default options
const DEFAULT_OPTIONS = {
  DISPLAY_INFO: true,
};

module.exports = {
  ERROR_MESSAGES,
  REGEX,
  DEFAULT_OPTIONS,
};
