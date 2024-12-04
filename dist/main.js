import { encrypt } from './website.vars.js';
import { createInterface } from 'node:readline';
import { argv, stdin, stdout, exit } from 'node:process';
const readline = createInterface({
    input: stdin,
    output: stdout,
});
const enabledEncriptToAnyChar = argv.includes('--encrypt-to-any-char') || argv.includes('-e2ac');
const keepSpecialChars = (argv.includes('--keep-special-chars') || argv.includes('-ksc')) && enabledEncriptToAnyChar;
readline.prompt();
readline.on('line', (password) => {
    console.log(encrypt(password, enabledEncriptToAnyChar, keepSpecialChars));
    readline.prompt();
});
process.on('SIGINT', () => {
    exit();
});
