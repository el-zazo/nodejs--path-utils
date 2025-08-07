# Path Utils

A comprehensive Node.js utility library for file and directory operations with robust error handling.

## Features

- **CreatePath**: Create directories and files with proper path handling
- **JsonFile**: Read and write JSON files with error handling
- **TextFile**: Read, write, append, and prepend text files
- **readDirectory**: List directory contents with filtering options

## Installation

```bash
npm install @el-zazo/path-utils
```

## Usage Examples

### CreatePath

Create directories and files with proper path handling:

```js
const { CreatePath } = require("@el-zazo/path-utils");

// Initialize with default options
const CP = new CreatePath();

// Create a file with JSON content
CP.make_file("files/file1.json", { message: "Hello World!" });

// Create nested directories
CP.make_dir("test2/test3/test4");
CP.make_dir("test2/test4/test3");
```

### JsonFile

Manage JSON files with proper error handling:

```js
const { JsonFile } = require("@el-zazo/path-utils");

async function run() {
  // Initialize with file path
  const JF = new JsonFile("./test/test.json");

  // Read data
  const data = await JF.read();

  // Update data
  data.type = "desc";

  // Write data back to file
  JF.write(data);
}

run();
```

### TextFile

Manage text files with read, write, append, and prepend operations:

```js
const { TextFile } = require("@el-zazo/path-utils");

async function run() {
  // Initialize with file path
  const TF = new TextFile("./test/test.txt");

  // Write content (replaces existing content)
  TF.write("1. First Line");

  // Append content
  await TF.push("2. New Line At End");
  await TF.push("3. New Line At End", true); // with new line

  // Prepend content
  await TF.unshift("4. New Line At Start\n");
  await TF.unshift("5. New Line At Start", true); // with new line

  // Read content
  const content = await TF.read();
  console.log(content);
}

run();
```

Output:

```
5. New Line At Start
4. New Line At Start
1. First Line
2. New Line At End
3. New Line At End
```

### readDirectory

List directory contents with filtering options:

```js
const { readDirectory } = require("@el-zazo/path-utils");

async function run() {
  // Get all files in current directory
  const result = await readDirectory(__dirname);
  console.log(result);

  // Get all files except node_modules and .git
  const filtered = await readDirectory(__dirname, ["node_modules", ".git"]);
  console.log(filtered);
}

run();
```

## API Reference

### CreatePath

```js
const CP = new CreatePath(display_info, CM);
```

- `display_info` (boolean, optional): Whether to display console messages (default: true)
- `CM` (ConsoleMessages, optional): Console message handler instance

Methods:

- `make_dir(path)`: Creates a directory path
- `make_file(path, content)`: Creates a file with the specified content

### JsonFile

```js
const JF = new JsonFile(file_path, options);
```

- `file_path` (string): Path to the JSON file
- `options` (object, optional):
  - `initial_value` (object): Initial value if file doesn't exist (default: {})
  - `CM` (ConsoleMessages): Console message handler
  - `display` (boolean): Whether to display console messages (default: true)

Methods:

- `read()`: Reads and parses the JSON file content
- `write(data)`: Writes data to the JSON file

### TextFile

```js
const TF = new TextFile(file_path, options);
```

- `file_path` (string): Path to the text file
- `options` (object, optional):
  - `initial_value` (string): Initial value if file doesn't exist (default: "")
  - `CM` (ConsoleMessages): Console message handler
  - `display` (boolean): Whether to display console messages (default: true)

Methods:

- `read()`: Reads the text file content
- `write(text)`: Writes text to the file
- `push(text, in_new_ligne)`: Appends text to the end of the file
- `unshift(text, in_new_ligne)`: Prepends text to the beginning of the file

### readDirectory

```js
readDirectory(path, names_to_scape);
```

- `path` (string): Directory path to read
- `names_to_scape` (array, optional): Array of file/directory names to exclude

Returns a Promise that resolves to an object with:

- `items` (array): Array of file/directory names
- `err` (boolean): Whether an error occurred
- `err_msg` (string): Error message if an error occurred

## License

ISC
