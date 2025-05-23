const { readdir } = require("fs");

const ERROR_ID = "READDIR ERROR:";

/**
 * ### Get All Elements Name in Directory
 *
 * _you can scape some names`_
 */
function readDirectory(path = "", names_to_scape = []) {
  return new Promise((resolve, reject) => {
    try {
      readdir(path, async (err, items) => {
        if (err) resolve({ items: null, err: true, err_msg: `${ERROR_ID} ${err}` });
        else {
          // Scape Some Items By Name
          items = items.filter((file) => !names_to_scape.includes(file));

          // Return Items
          resolve({ items, err: false, err_msg: "" });
        }
      });
    } catch (error) {
      resolve({ items: null, err: true, err_msg: `${ERROR_ID} ${error.message}` });
    }
  });
}

module.exports = { readDirectory };
