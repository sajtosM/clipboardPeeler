#!/usr/bin/env node
import meow from 'meow';
import clipboard from 'clipboardy';


/** @type {meow}
 * CLI arguments
 */
const cli = meow(`
Usage
$ clipboardpeeler

Options
--loop X, -l X    Peel every X milliseconds
--noLog, -nl      Dissable log
--verbose, -X     Verbose Logging

Examples
$ clipboardpeeler --loop 1000
`, {
    importMeta: import.meta,
    flags: {
        loop: {
            type: 'number',
            alias: 'l'
        },
        noLog: {
            type: 'boolean',
            alias: 'n'
        },
        verbose: {
            type: 'boolean',
            alias: 'X'
        }
    }
});

/**
 * Peeler function. Clears the clipboard of unnecessary styling.
 *
 * @param {string|undefined} clearedText the last cleared text
 * @return {string}
 */
const peelText = (clearedText) => {
    let clippedText = clipboard.readSync();
    if (clippedText == '' && clippedText !== clearedText) {
        // in case if we detect an empty clippedText assume that it is a picture or other binary and do not clear it
        console.log('📋 🖼️');
        clearedText = '' + clippedText
            .trim()
            .normalize();
    } else if (clippedText !== clearedText) {
        console.log(`📋 ${clippedText}`);
        clearedText = '' + clippedText
            .trim()
            .normalize();
        clipboard.writeSync(clearedText);
        console.debug('Write done');
    }
    return clearedText;
};

/**
 * Logging config
 */

if (!cli.flags.verbose) {
    console.debug = () => { };
}
if (cli.flags.noLog) {
    console.log = () => { };
}

/**
 * Logic
 */

console.debug(cli.flags);

if (!cli.flags.loop) {
    peelText();
} else {
    let clearedText;
    setInterval(function () {
        clearedText = peelText(clearedText);
    }, cli.flags.loop);
    console.log('🏁 Started scheduler');
}