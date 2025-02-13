(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./lkcode.json":2}],2:[function(require,module,exports){
module.exports=[  "",
  "1234567890abcdefghijklmnopqrstuvwxyz",
  "{}[]=\n,\"' :abcdefghijklmnopqrstuvwxyz",
  "{}[]=\n,\"' :ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "%0123456789=&$ABCDEFGHIJKLMNOPQRSTU",
  "%0123456789=&$nVXYZABCDEFGHIJKLMNOPQ",
  "<>!/=\n\"' :abcdefghijklmnopqrstuvwxyz",
  "#|_&-+()/*\"':;!?[]{}=<>%\\,.$~…@` \t\n–",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
]
},{}],3:[function(require,module,exports){
var lks = require( "./index" ),
source = document.getElementById( "source" ),
output = document.getElementById( "result" ),
file = document.getElementById( "file" ),
upload = document.getElementById( "upload" ),
snc = document.getElementById( "snc" ),
onc = document.getElementById( "onc" ),
real = document.getElementById( "real" )

source.oninput = () => {
  output.value = lks.encode( encodeURIComponent( source.value ))
  snc.textContent = encodeURIComponent( source.value ).length
  onc.textContent = output.value.length
  real.textContent = encodeURIComponent( source.value )
}
output.oninput = () => {
  source.value = decodeURIComponent( lks.decode( output.value ))
  snc.textContent = source.value.length
  real.textContent = lks.decode( output.value )
}
file.onchange = () => {
  if( file.files[0] ){
    var reader = new FileReader()
    reader.onload = (e) => {
      source.value = e.target.result
      source.oninput()
    }
    reader.readAsText(file.files[0])
  }
}
upload.onclick = () => {
  file.click()
}

source.value = "123456789hello,world"
source.oninput()
},{"./index":1}]},{},[3]);
