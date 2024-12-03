import { stdin, argv, exit } from 'node:process';
import { emitKeypressEvents } from 'node:readline';
import { fork } from 'node:child_process';
const shouldOutputNowIndex = argv.includes('--output-now-index') || argv.includes('-oni');
const multipleProcesses = argv.includes('--cpu-dryer');
const child = fork((/\\dist/.test(argv[1]) || /\/dist/.test(argv[1])) ? 'dist/random_child_process.js' : 'random_child_process.js', [shouldOutputNowIndex.toString()]);
const childs = multipleProcesses ? [] : undefined;
if (multipleProcesses) {
    for (let i = 0; i < 7; i++) {
        childs.push(fork((/\\dist/.test(argv[1]) || /\/dist/.test(argv[1])) ? 'dist/random_child_process.js' : 'random_child_process.js', [shouldOutputNowIndex.toString()]));
    }
}
emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.on('keypress', multipleProcesses ? (key) => {
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
