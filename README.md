# Clipboard Peeler
> Clear all the trashy🗑️ formatting from your copied text.

I was having the problem that every time I copied something to word or outlook it took the formatting and the language of it that was most of the time not useful. So I made a small script that clears the formatting automatically.

## Usage

- Use `clipboardpeeler` to clear the styling once.
- Use `clipboardpeeler -l 1000` to clear the styling every 1000 milliseconds.
- Use `clipboadpeeler -nl` for no log at all.
- Use `clipboadpeeler -X` for additional debug logging.

```bash
Usage
$ clipboardpeeler

Options
--loop X, -l X    Peel every X milliseconds
--noLog, -nl      Dissable log
--verbose, -X     Verbose Logging

Examples
$ clipboardpeeler --loop 1000
```