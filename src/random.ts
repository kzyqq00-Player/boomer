import { stdin, argv, exit } from 'node:process';
import { emitKeypressEvents } from 'node:readline';
import { fork } from 'node:child_process';

let shouldOutputNowIndex = argv.includes('--output-now-index') || argv.includes('-oni');
const child = fork((/\\dist/.test(argv[1]) || /\/dist/.test(argv[1])) ? 'dist/random_child_process.js' : 'random_child_process.js', [shouldOutputNowIndex.toString()]);

emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.on('keypress', (key: string) => {
    switch (key) {
        case 'c': child.send(false); break;
        case 'o': child.send(true); break;
        case 't': shouldOutputNowIndex = !shouldOutputNowIndex; break;
        case '\u0003': exit();
    }
});

if (shouldOutputNowIndex) console.log();