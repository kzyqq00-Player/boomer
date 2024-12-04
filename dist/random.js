import { stdin, argv, exit } from 'node:process';
import { emitKeypressEvents } from 'node:readline';
import { fork } from 'node:child_process';
const enableCPUDryer = argv.includes('--cpu-dryer');
const shouldOutputNowIndex = (argv.includes('--output-now-index') || argv.includes('-oni')) && !enableCPUDryer;
const child = enableCPUDryer ? undefined : fork((/\\dist/.test(argv[1]) || /\/dist/.test(argv[1])) ? 'dist/random_child_process.js' : 'random_child_process.js', ['-son', shouldOutputNowIndex.toString(), '-ecd', enableCPUDryer.toString()]);
const childs = enableCPUDryer ? [] : undefined;
let preparedChilds = 0;
const processes = 8;
if (enableCPUDryer) {
    for (let i = 0; i < processes; i++) {
        childs.push(fork((/\\dist/.test(argv[1]) || /\/dist/.test(argv[1])) ? 'dist/random_child_process.js' : 'random_child_process.js', ['-son', shouldOutputNowIndex.toString(), '-ecd', enableCPUDryer.toString()]));
    }
}
emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.on('keypress', enableCPUDryer ? (key) => {
    switch (key) {
        case '\u0003': exit();
    }
} : (key) => {
    switch (key) {
        case 'c':
            child.send(false);
            break;
        case 'o':
            child.send(true);
            break;
        case '\u0003': exit();
    }
});
if (shouldOutputNowIndex)
    console.log();
if (enableCPUDryer) {
    let key = setInterval(() => {
        if (preparedChilds >= processes) {
            childs.forEach((v) => {
                v.send('start');
            });
            clearInterval(key);
        }
    });
    childs.forEach((v) => {
        v.on('message', () => {
            preparedChilds++;
        });
    });
}
