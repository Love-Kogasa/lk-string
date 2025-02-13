# lk-string
lk-string ~~A pirated version of lz-string~~ A compact string compression library.  
Used for quick data compression, currently supports only some English characters and most English symbols (you can encode special characters as URL encoding and then compress them).

## Usage
You can try LKstring compression online ([There](http://lk-string.lapis-net.top/page/)).  
JavaScript example:
```javascript
var lkstring = require("lkstring"),
string = "123456789 hello, world",
code = lkstring.encode(string)
console.log("Original string: \t%s\nLength: %d", string, string.length)
console.log("Compressed string: \t%s\nLength: %d", code, code.length)
console.log("Decompressed string: \t%s", lkstring.decode(code))
/** --- Output ---
 * Original string:    123456789 hello, world
 * Length: 22
 * Compressed string:    ÿ$&pºĄÿQʗ̮ΊťΠ̦
 * Length: 14
 * Decompressed string:    123456789 hello, world
 */
```

## Principle
The principle of lk-string is very simple, defining a strongly regular character-number encoding.
*lk-string compression steps*
* Convert the string to lk encoding (see lkcode.json for details, character encoding equals the string array index plus the character index in the string).
* Use the character \\x99 to separate each segment of characters during encoding (character segments are identified by \\x99 as the segment header).
* The first character of each segment is the index of the character set array where this segment of characters is located, and the subsequent characters are the indices of the corresponding characters in the string.
* Every two characters are merged into one character, for example, 31, 32 merged into 312.
Return the string.
