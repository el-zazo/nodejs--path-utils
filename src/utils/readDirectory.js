const { readdir } = require("fs");
const { ERROR_MESSAGES } = require("../data/constants");

// Destructure constants for easier access
const { READ_DIRECTORY: ERROR } = ERROR_MESSAGES;

/**
 * ### Get All Elements Name in Directory
 *
 * _you can scape some names`_
 *
 * @function readDirectory
 * @param {string} path - Directory path to read
 * @param {string[]} [names_to_scape=[]] - Array of file/directory names to exclude
 * @returns {Promise<Object>} - Object containing items array, error flag, and error message
 */
function readDirectory(path = "", names_to_scape = []) {
  return new Promise((resolve, reject) => {
    try {
      // Validate path
      if (!path || typeof path !== "string") {
        return resolve({
          items: null,
          err: true,
          err_msg: `${ERROR.ID} Invalid directory path`,
        });
      }

      readdir(path, async (err, items) => {
        if (err) {
          resolve({
            items: null,
            err: true,
            err_msg: `${ERROR.ID} ${err}`,
          });
        } else {
          // Scape Some Items By Name
          items = items.filter((file) => !names_to_scape.includes(file));

          // Return Items
          resolve({ items, err: false, err_msg: "" });
        }
      });
    } catch (error) {
      resolve({
        items: null,
        err: true,
        err_msg: `${ERROR.ID} ${error.message}`,
      });
    }
  });
}

module.exports = { readDirectory };
