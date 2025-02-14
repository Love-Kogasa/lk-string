var lkstring = require( "./index" ),
  string = JSON.stringify({
    name: "love-kogasa",
    age: 14,
    description: "a baka tatarakogasa fans"
  }, 0, 4 ),
  code = lkstring.encode( string )
console.log( "源字符串: \t%s\n长度: %d", string, string.length )
console.log( "压缩后字符: \t%s\n长度: %d", code, code.length  )
console.log( "解压后字符: \t%s", lkstring.decode( code ))