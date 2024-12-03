import { argv } from 'node:process';
import { encrypt } from './website.vars.js';
let shouldOutputNowIndex = argv.includes('true') ? true : false;
let i = 0;
process.on('message', (data) => {
    shouldOutputNowIndex = data;
});
function loop() {
    while (true) {
        const rand = Math.random();
        const res = encrypt(rand.toString());
        if (/^\d+$/.test(res)) {
            console.timeLog('timer');
            console.log(i);
            console.log(rand);
            console.log(res);
            console.log();
        }
        if (i % 10000 === 0) {
            if (shouldOutputNowIndex) {
                console.log(i);
                let start = Date.now();
                while (Date.now() - start < 35) { }
                process.stdout.write('\x1B[1A\x1B[2K');
            }
            else {
                setImmediate(loop);
                i++;
                break;
            }
        }
        i++;
    }
}
console.time('timer');
loop();
