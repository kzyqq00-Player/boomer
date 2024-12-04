import { argv, stdout } from 'node:process';
import { fastEncrypt } from './website.vars.js';

let shouldOutputNowIndex = (function () {
    const SONIndex = argv.indexOf('-son');
    if (SONIndex > -1 && argv[SONIndex + 1] === 'true') {
        return true;
    } else {
        return false;
    }
})();
let enableCPUDryer = (function () {
    const ECDIndex = argv.indexOf('-ecd');
    if (ECDIndex > -1 && argv[ECDIndex + 1] === 'true') {
        return true;
    } else {
        return false;
    }
})();
let i = 0;

process.on('message', enableCPUDryer ? (data: boolean | 'start') => {
    if (data === 'start') {
        console.time('timer');
        loop();
        return;
    }
    shouldOutputNowIndex = data;
} : (data: boolean) => {
    shouldOutputNowIndex = data;
});

enableCPUDryer && process.send('ready');
function loop() {
    while (true) {
        const rand = Math.random();
        const res = fastEncrypt(rand.toString());

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

                stdout.write('\x1B[1A\x1B[2K');
            }
            setImmediate(loop);
            i++;
            break;
        }

        i++;
    }
}

if (!enableCPUDryer) {
    console.time('timer');
    loop();
}