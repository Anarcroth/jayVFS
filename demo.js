const cparser = require('./src/parser');

var stdin = process.openStdin();

stdin.addListener('data', function(c) {
    let command = c.toString().trim();
    if (command === 'exit') {
        console.log('Exiting . . .');
        process.exit(0);
    }
    try {
        let response = cparser.parse(command);
        console.log(response);
    } catch (e) {
        console.log(e.message);
    }
});
