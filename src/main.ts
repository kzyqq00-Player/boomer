import { encrypt } from './website.vars.js';
import * as readline from 'readline';
const inputer = readline.createInterface({
    input: process.stdin,
});
(async function () {
    while (1) {
        await new Promise<void>((resolve) => {
            inputer.question('Please input want to encrypted password:', (password) => {
                console.log(encrypt(password));
                resolve();
            });
        });
    }
})();