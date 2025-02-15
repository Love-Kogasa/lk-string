# lk-string
[English](https://github.com/Love-Kogasa/lk-string/blob/main/README-EN.md).  
lk-string ~~一个盗版的lz-string~~一个小巧的字符串压缩库  
用于对字符串数据进行压缩  

## 使用
您可以通过([ClickMe](http://lk-string.lapis-net.top/page/))在线试用LKstring压缩  
JavaScript示例
```js
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
```

## 原理
lk-string原理Very简单，定义一种规律性强字符数字编码  
*lk-string压缩步骤*
* 将字符串挨个转换为编码(编码为根据字符出现频率动态生成，字符编码等于字符集数组索引加字符集中字符的索引).  
* 编码过程中使用字符\\x99分割每一段字符(字符分段以\\x99为段首标识符)
* 每段字符第一位为这一段字符所在的字符集数组索引，后续字符为对应字符的字符集中的索引
* 每两个字符合并为一个字符，比如31, 32合并为312
* 返回字符串
