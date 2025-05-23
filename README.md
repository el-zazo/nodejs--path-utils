# Create Path

code:

```js
const CP = new CreatePath();

// Create File
CP.make_file("files/file1.json", { message: "Hello World!" });

// Create Directory
CP.make_dir("test2/test3/test4");
CP.make_dir("test2/test4/test3");
CP.make_dir("test2/test3/test2");
CP.make_dir("test2/test2/test4");
```

result:

```txt
> 00001 | Start Create File Path 'files/file1.json'
> 00002 |       Directory 'files' Was Created. √
> 00003 |       File 'files/file1.json' Was Created. √
> 00004 |
> 00005 | Start Create Directory Path 'test2/test3/test4'
> 00006 |       Directory 'test2/' Was Created. √
> 00007 |       Directory 'test2/test3/' Was Created. √
> 00008 |       Directory 'test2/test3/test4' Was Created. √
> 00009 |
> 00010 | Start Create Directory Path 'test2/test4/test3'
> 00011 |       Directory 'test2/' Already Exist. √
> 00012 |       Directory 'test2/test4/' Was Created. √
> 00013 |       Directory 'test2/test4/test3' Was Created. √
> 00014 |
> 00015 | Start Create Directory Path 'test2/test3/test2'
> 00016 |       Directory 'test2/' Already Exist. √
> 00017 |       Directory 'test2/test3/' Already Exist. √
> 00018 |       Directory 'test2/test3/test2' Was Created. √
> 00019 |
> 00020 | Start Create Directory Path 'test2/test2/test4'
> 00021 |       Directory 'test2/' Already Exist. √
> 00022 |       Directory 'test2/test2/' Was Created. √
> 00023 |       Directory 'test2/test2/test4' Was Created. √
> 00024 |
```

# Read Directory

code:

```js
const run = async () => console.log(await readDirectory(__dirname));

run();
```

result:

```txt
{
  items: [ 'db.js', 'model.js', 'path.js', 'server_2.js', 'test' ],
  err: false,
  err_msg: ''
}
```

# Json File

code:

```js
async function run() {
  const JF = new JsonFile("./test/test.json");

  // Read Data
  const data = await JF.read();

  // Update Data
  data.type = "desc";

  // Write Data
  JF.write(data);
}

run();
```

# Text File

code:

```js
async function run() {
  const TF = new TextFIle("./test/test.txt");

  // Write
  // --------

  // Method 1
  TF.write("1. First Line");

  // Method 2
  await TF.push("\n2. New Line At End");
  await TF.push("3. New Line At End", true);

  // Method 3
  await TF.unshift("4. New Line At Start\n");
  await TF.unshift("5. New Line At Start", true);

  // Read
  // --------

  const last_content = await TF.read();
  console.log(last_content);
}

run();
```

result:

```txt
5. New Line At Start
4. New Line At Start
1. First Line
2. New Line At End
3. New Line At End
```
