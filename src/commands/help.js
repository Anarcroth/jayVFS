/*
  Display possible commands to user.
*/
let help = function(param) {
    switch (param) {
    case 'ls':
        return 'ls [FILE]\nList information about the FILEs (the current directory by default).';
    case 'rm':
        return 'rm [FILE]\nRemoves specified file. By default, it does not remove directories.';
    case 'cp':
        return '\nTBD';
    case 'cd':
        return 'cd [DIRECTORY]\nChange the working directory of the current shell execution environment.';
    case 'mv':
        return '\nTBD';
    case 'pwd':
        return 'pwd\nPrint the name of current working directory';
    case 'cat':
        return 'cat [FILE]\nConcatenate FILE(s) to standard output.';
    case 'date':
        return 'date\nDisplay the current time.';
    case 'echo':
        return 'echo [STRING]\nDisplay a line of text.';
    case 'help':
        return 'help [COMMAND]\nPrint the help of a command.';
    case 'mkdir':
        return 'mkdir [DIRECTORY]\nCreate the DIRECTORY, if it does not already exist.';
    case 'rmdir':
        return 'rmdir [DIRECTORY]\nRemove the DIRECTORY, if it is empty.';
    case 'touch':
        return 'touch [FILE]\nA  FILE  argument  that  does not exist is created empty.';
    case 'clear':
        return 'clear\nClear the terminal screen.';
    default:
        return 'These are the commands that are available\n' +
            'ls' + '\tcd' + '\tpwd\n' +
            'cat' + '\tdate' + '\techo\n' +
            'mkdir' + '\trmdir' + '\ttouch\n' +
            'clear' + '\thelp\n';
    }
};

module.exports = help;
