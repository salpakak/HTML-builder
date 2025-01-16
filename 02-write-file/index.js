const fs = require('fs');
const readline = require('readline');
const filePath = './02-write-file/output.txt';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter your text');
let exitFlag = false;
rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    exitFlag = true;
    console.log('Bye!');
    rl.close();
  } else {
    fs.appendFile(filePath, input + '\n', (err) => {
      if (err) {
        console.error('error', err);
      } else {
        console.log(
          'The text has been successfully added to the file. Enter the following text or type "exit" to exit.:',
        );
      }
    });
  }
});
rl.on('close', () => {
  if (!exitFlag) {
    console.log('Bye!');
  }
  process.exit(0);
});
process.on('SIGINT', () => {
  console.log('\nBye!');
  rl.close();
});
