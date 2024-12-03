import { stdin, argv, exit } from 'node:process';
import { emitKeypressEvents } from 'node:readline';
import { fork, ChildProcess, Serializable } from 'node:child_process';

const shouldOutputNowIndex = argv.includes('--output-now-index') || argv.includes('-oni');

const childs: ChildProcess[] = [];
// @ts-ignore
childs.sendAll = (message: boolean) => {
    // @ts-ignore
    childs.forEach((child: ChildProcess) => {
        child.send(message);
    });
};
for (let i = 0; i < 8; i++) {
    childs.push(fork((/\\dist/.test(argv[1]) || /\/dist/.test(argv[1])) ? 'dist/random_child_process.js' : 'random_child_process.js', [shouldOutputNowIndex.toString()]));
}
emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.on('keypress', (key: string) => {
    switch (key) {
        // @ts-ignore
        case 'c': childs[9].sendAll(false); break;
        // @ts-ignore
        case 'o': childs.sendAll(true); break;
        case '\u0003': exit();
    }
});

if (shouldOutputNowIndex) console.log();