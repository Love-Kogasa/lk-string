var lkstring = {
  split( string, len ){
    var out = [], index = 0
    for( let char of string ){
      if( char == "\xff" ){
        out.push( "\xff" )
        out.push( "" )
        continue;
      }else if( index % len == 0 ){
        out.push( "" )
      }
      index += 1
      out[ out.length - 1 ] += char
    }
    return out
  },
  encode( string ){
    // var data = require( "./lkcode.json" )
    var outData = [], bytes = [], index = false
    // 创建词典字符集
    var dcts = dict( string ).join( "" )
    var data = [""].concat(this.split( dcts, 36 ))
    for( let char of string ){
      let charIndex
      if( index !== false && ((charIndex = data[index].indexOf( char )) + 1) ){
        outData.push( charIndex.toString( 36 ) )
        // console.log(data[index], charIndex, data[index][charIndex])
      } else {
        [index, charIndex] = where( char )
        //console.log( where( char ))
        outData = outData.concat( [ "\xff", index.toString( 36 ), charIndex.toString( 36 )] )
      }
    }
    for( let byte of this.split( outData, 2 ) ){
      if( byte == "\xff" ){
        bytes.push( "\xff" )
      } else{
        //console.log(byte, parseInt( byte, 36 ))
        if( byte !== "" ){
          bytes.push( String.fromCharCode( parseInt( byte, 36 ) ))
        }
      }
    }
    //console.log(bytes)
    delete outData
    return dcts + bytes.join( "" )
    function where( char ){
      for( let line of data ){
        if( line.includes( char ) ){
          return [data.indexOf( line ), line.indexOf( char ) ]
        }
      }
      throw "Char " + char + " not supported"
    }
    function dict( string ){
      var map = new Map(), charlist = []
      for( let char of string ){
        map.set( char, (map.get( char ) || 0) + 1 )
      }
      var arr = [...map.entries()].sort( (a,b) => b[1] - a[1] )
      for( let child of arr ){
        charlist.push( child[0] )
      }
      return charlist
    }
  },
  decode( code ){
    var data = [""].concat(this.split( code.split( "\xff" )[0], 36 ))
    var index, out = "", codeList = code.split( "\xff" ).slice(1)
    for( let chars of codeList){
      for( let charIndex in chars.split( "" )){
        let char = chars[charIndex].charCodeAt().toString(36).padStart( 2, "0" )
        if( charIndex == 0 ){
          index = parseInt( char[0], 36 )
          char = char.slice( 1 )
        }
        // 忘了我想写啥了
        for( let byte of char ){
          out += data[index][parseInt( byte, 36 )]
        }
      }
    }
    return out
  }
}

typeof module == "object" && (module.exports = lkstring)
