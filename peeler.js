#!/usr/bin/env node
import meow from 'meow';
import clipboard from 'clipboardy';



/** @type {object}
 * CLI arguments
 */
const cli = meow(`
    Usage
      $ clipboardpeeler

    Options
      --loop, -l Peel the

    Examples
      $ clipboardpeeler --loop 1000
`, {
    importMeta: import.meta,
    flags: {
        loop: {
            type: 'number',
            alias: 'l'
        }
    }
});

/**
 * Peeler function. Clears the clipboard of unnecessary styling.
 *
 * @param {string} clearedText the last cleared text
 * @return {string}
 */
const peelText = (clearedText) => {
    let clippedText = clipboard.readSync();
    if (clippedText !== clearedText) {
        console.debug(`📋 ${clippedText}`);
        clearedText = '' + clippedText
            .trim()
            .normalize();
        clipboard.writeSync(clearedText);
    }
    return clearedText;
};

/**
 * Logic
 */

if (!cli.flags.loop) {
    peelText();
} else {
    let clearedText;
    setInterval(function () {
        clearedText = peelText(clearedText);
    }, cli.flags.loop);
    console.log('🏁 Started scheduler');
}