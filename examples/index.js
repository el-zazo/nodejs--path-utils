/**
 * @fileoverview Examples demonstrating the usage of path-utils library
 */

const { CreatePath, JsonFile, TextFile, readDirectory } = require("../index");
const path = require("path");

// Example paths
const JSON_FILE_PATH = "output/data.json";
const TEXT_FILE_PATH = "output/data.txt";

/**
 * CreatePath example
 */
async function createPathExample() {
  console.log("\n--- CreatePath Example ---");

  const CP = new CreatePath();

  // Create directory
  CP.make_dir("output/nested/folders");

  // Create file with content
  CP.make_file("output/hello.txt", "Hello, World!");

  // Create JSON file
  CP.make_file("output/config.json", {
    name: "path-utils",
    version: "1.1.0",
    features: ["CreatePath", "JsonFile", "TextFile", "readDirectory"],
  });
}

/**
 * JsonFile example
 */
async function jsonFileExample() {
  console.log("\n--- JsonFile Example ---");

  // Initialize with file path and options
  const JF = new JsonFile(JSON_FILE_PATH, {
    initial_value: { created: new Date().toISOString(), items: [] },
  });

  // Read data
  const data = await JF.read();
  console.log("Initial data:", data);

  // Update data
  data.items.push({ id: 1, name: "Item 1" });
  data.items.push({ id: 2, name: "Item 2" });
  data.lastUpdated = new Date().toISOString();

  // Write data back to file
  JF.write(data);

  // Read updated data
  const updatedData = await JF.read();
  console.log("Updated data:", updatedData);
}

/**
 * TextFile example
 */
async function textFileExample() {
  console.log("\n--- TextFile Example ---");

  // Initialize with file path
  const TF = new TextFile(TEXT_FILE_PATH);

  // Write content
  TF.write("1. First Line");
  console.log("Initial content written");

  // Append content
  await TF.push("2. Appended without new line");
  await TF.push("3. Appended with new line", true);
  console.log("Content appended");

  // Prepend content
  await TF.unshift("0. Prepended without new line");
  await TF.unshift("-1. Prepended with new line", true);
  console.log("Content prepended");

  // Read content
  const content = await TF.read();
  console.log("Final content:\n", content);
}

/**
 * readDirectory example
 */
async function readDirectoryExample() {
  console.log("\n--- readDirectory Example ---");

  // Read all files in examples directory
  const result = await readDirectory("output");
  console.log("Files in examples directory:", result);
}

/**
 * Run all examples
 */
async function runExamples() {
  try {
    await createPathExample();
    await jsonFileExample();
    await textFileExample();
    await readDirectoryExample();

    console.log("\nAll examples completed successfully!");
  } catch (error) {
    console.error("Error running examples:", error);
  }
}

runExamples();
