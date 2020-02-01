![jayvfs](./jayvfs.png "jayvfs")

---

A virtual file system in NodeJS.

## Overview

`jayVFS` is a simple, in-memory, file system, fully equipped to handle basic file and directory manipulations. This is a great FS for storing temporary files in a structured way, that can quickly be handled and altered.

The project has several commands that interact with the FS from the outside (i.e. the `commands`), or one can access the whole `jvfs` structure and use it's interface to extend or just use the FS.

## Run & Demo

The project comes with a demo that shows you the different commands that are built-in. Simply type in your terminal:

``` bash
node demo.js
```

Then you can issue any one of the familiar commands for interacting with any FS (they are listed in the `Commands` section).

If you want to use the FS without the commands, then just provide it with a `.conf` file and import your `jvfs` object to your project. Voila!

``` javascript
const jvfs = require('jvfs');

// your code!
let file = jvfs.getFile(tarNode);
// more of your code!
jvfs.moveWdTo(paramDir);
```

## Install

Get source code

``` bash
git clone https://github.com/Anarcroth/jayVFS.git
```

Navigate in the project directory and run

``` bash
npm install
```

## Setup & Configuration

This VFS has it's own twist on a `B+Tree`. The full documentation can be found in [here](./documentation/DOC.md).

In order to configure the FS, you can look at the `.conf` file that gives the initial file structure. You can change it to anything you like and the FS will structure it in that way.

## Commands

Here are the supported commands (for now):

```
ls - [./] [../] [DIR]; List information about the FILEs (the current directory by default).
rm - [FILE]; Removes specified file.
cd - [./] [../] [DIRECTORY]; Change the working directory of the current shell execution environment.
pwd - Print the name of current working directory.
cat - [FILE]; Concatenate FILE(s) to standard output.
help - [COMMAND]; Print the help of a command.
mkdir - [DIRECTORY]; Create the DIRECTORY, if it does not already exist.
rmdir - [DIRECTORY]; Remove the DIRECTORY, if it is empty.
touch - [FILE]; A FILE argument that does not exist is created empty.
```

## Contributions

All contributions are welcome! If you have an idea for an new feature, feel free to add it or open a task for it.
