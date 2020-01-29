![jayvfs](./jayvfs.png "jayvfs")

---

A virtual file system in NodeJS.

## Install

Get source code

``` bash
git clone https://github.com/Anarcroth/jayVFS.git
```

Navigate in the project directory and run

``` bash
npm install
```

## Setup

This VFS has it's own twist on a `B+Tree`. The full documentation can be found in [here](./documentation/DOC.md).

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
