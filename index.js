import clipboard from 'clipboardy';

let clearedText = '';
setInterval(function () {
    let clippedText = clipboard.readSync();
    if (clippedText !== clearedText) {
        console.log(`📋 ${clippedText}`);
        clearedText = '' + clippedText;
        clipboard.writeSync(clearedText);
    }
}, 1000)


