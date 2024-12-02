import { encrypt } from './website.vars.js';
import * as readline from 'readline';
const inputer = readline.createInterface({
    input: process.stdin,
});

const enabledEncriptToAnyChar = process.argv.includes('--encrypt-to-any-char') || process.argv.includes('-e2ac');
const keepSpecialChars = (process.argv.includes('--keep-special-chars') || process.argv.includes('-ksc')) && enabledEncriptToAnyChar;

(async function () {
    while (1) {
        await new Promise<void>((resolve) => {
            inputer.question('', (password) => {
                console.log(encrypt(password, enabledEncriptToAnyChar, keepSpecialChars));
                resolve();
            });
        });
    }
})();