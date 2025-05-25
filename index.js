/**
 * @fileoverview Main entry point for the path-utils library
 * Exports all utility classes and functions
 */

const CreatePath = require("./src/utils/CreatePath");
const JsonFile = require("./src/utils/JsonFIle");
const readDirectory = require("./src/utils/readDirectory");
const TextFile = require("./src/utils/TextFIle");

module.exports = {
  ...CreatePath,
  ...JsonFile,
  ...readDirectory,
  ...TextFile,
};
