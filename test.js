var lkstring = require( "./index" ),
  string = "123456789 hello, world",
  code = lkstring.encode( string )
console.log( "源字符串: \t%s\n长度: %d", string, string.length )
console.log( "压缩后字符: \t%s\n长度: %d", code, code.length  )
console.log( "解压后字符: \t%s", lkstring.decode( code ))