# jayVFS

A virtual file system in NodeJS.

## Install

Get source code

``` bash
git clone https://github.com/Anarcroth/jayVFS.git
```

Navigate in the project directory and run

``` javascript
npm install
```

## Setup

This VFS has it's own twist on a `B+ Tree`. The full documentation can be found in [here](./documentation/DOC.md).

Here are the supported commands:

`ls` - Lists directory contents. \
`rm` - Remove a target file. \
`cd` - Changes the working directory. \
`pwd` - Prints name of current/working directory. \
`cat` - Concatenates files and print on the standard output. \
`date` - Prints or set the system date and time. \
`echo` - Displays a line of text. Can also add or append data to a file. \
`help` - Prints help, or, if specified, prints a specific help listing of a command. \
`mkdir` - Makes a specified directory. \
`rmdir` - Removes a specified directory. \
`touch` - Creates a file. \

## Contributions

All contributions are welcome! If you have an idea for an new feature, feel free to add it or open a task for it.
