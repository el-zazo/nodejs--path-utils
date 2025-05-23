const CreatePath = require("./utils/CreatePath");
const JsonFIle = require("./utils/JsonFIle");
const readDirectory = require("./utils/readDirectory");
const TextFIle = require("./utils/TextFIle");

module.exports = {
  ...CreatePath,
  ...JsonFIle,
  ...readDirectory,
  ...TextFIle,
};
