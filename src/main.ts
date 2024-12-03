import { encrypt } from './website.vars.js';
import * as readline from 'readline';
const inputer = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const enabledEncriptToAnyChar = process.argv.includes('--encrypt-to-any-char') || process.argv.includes('-e2ac');
const keepSpecialChars = (process.argv.includes('--keep-special-chars') || process.argv.includes('-ksc')) && enabledEncriptToAnyChar;

inputer.prompt();
inputer.on('line', (password) => {
    console.log(encrypt(password, enabledEncriptToAnyChar, keepSpecialChars));
    inputer.prompt();
});
process.on('SIGINT', () => {
    process.exit(0);
});