var lkstring = {
  encode( string ){
    var data = require( "./lkcode.json" )
    var outData = [], bytes = [], index = false
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
    for( let byte of split( outData, 2 ) ){
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
    return bytes.join( "" )
    function split( string, len ){
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
    }
    function where( char ){
      for( let line of data ){
        if( line.includes( char ) ){
          return [data.indexOf( line ), line.indexOf( char ) ]
        }
      }
      throw "Char " + char + " not supported"
    }
  },
  decode( code ){
    var data = require( "./lkcode.json" )
    var index, out = "", codeList = code.split( "\xff" ).slice(1)
    for( let chars of codeList){
      for( let charIndex in chars.split( "" )){
        let char = chars[charIndex].charCodeAt().toString(36)
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
