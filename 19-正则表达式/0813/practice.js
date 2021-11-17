// var reg=/\d{2,5}/g;
// var string = "1 22 123 1234 12345 123456";
// console.log( string.match(reg) );
//输出 :[ '22', '123', '1234', '12345', '12345' ];

// var reg=/\d{2,5}?/g;
// var string = "1 22 123 1234 12345 123456";
// console.log( string.match(reg) );

//加上问号以后,进行惰性匹配,尽可能少的匹配
/**
 * [
  '22', '12', '12',
  '34', '12', '34',
  '12', '34', '56'
]
 */

/**
 * {m,} 表示至少出现 m 次。
    {m} 等价于 {m,m}，表示出现 m 次。 ?
    等价于 {0,1}，表示出现或者不出现。
    记忆方式：问号的意思表示，有吗？
    +
    等价于 {1,}，表示出现至少一次。 记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。 *
    等价于 {0,}，表示出现任意次，有可能不出现。
    记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。
 * 
 */

// var reg=/\d+/g;
// //此时加上问号以后,就按照一次进行匹配
// var string = "1 22 123 1234 12345 123456";
// console.log( string.match(reg) );

// 多选分支
/**
 * (p1|p2|p3)
 *
 */
//  var regex = /good|goodbye/g;
//  var string = "goodbye";
//  console.log( string.match(regex) );
//此时输出的是good,而不是goodbye
//  可见 分支结构也是惰性的,前面的只要匹配上了,后面的就不尝试了

/**
 * 习题练习:
 * 匹配一个16进制的字符,可以使用字符组[0-9a-fA-F]{6}
 */
// var reg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
// var string = "#ffbbad #Fc01DF #FFF #ffE";
// console.log( string.match(reg) );
// [ '#ffbbad', '#Fc01DF', '#FFF', '#ffE' ]

// var regex = /id=".*?"/
// // .匹配除了\n以外的任意字符

// var string = '<div id="container" class="main"></div>';
// console.log(string.match(regex));

//正则中的位置匹配
// ^ $ \b \B (?=p)/  (?!p)  \w标识的是[0-9a-zA-Z]标识的是数字.大小写字母和下划线之间的位置 \W非单词字符之间的关系

/**
 * ^ 匹配开头的位置
 * $ 匹配结尾的位置
 * \b 是单次边界,具体就是\w与\W之间的位置,也包括\w和^之间的位置,和\w和$之间的位置
 * 
 * 
 * 
 * 
 * 
 */

// var result='jsjjss.js'
// console.log(result.replace(/\b/g,'#'))
// // #jsjjss#.#js#

// var result='jsjjss.js'
// console.log(result.replace(/\B/g,'#'))
// \B就是\b的反面的意思,是一个非单词的边界
// j#s#j#j#s#s.j#s


// (?=p)和(?!p)
// (?=p),其中的p是一个子模式,即p前面的位置,或者说,该位置后面的字符都要匹配P
// var result='hello'
// console.log(result.match(/(?=l)/g))
// 此时输出的是['','']获取字符之间的是空的字符串
/**
 * 
 */
// console.log(result.replace(/(?=l)/g,'#'))
//此时输出的就是 he#l#lo

// (?!p)就是(?=p)的反面的意思,比如说:
// var result='hello';
// console.log(result.replace(/(?!l)/g,'#'))
// #h#ell#o# 此时输出的内容就除了l以外其他字符前面的数据

//位置的理解:
/**
 * 对于位置的理解我们可以理解成空的字符串"",
 * 比如hello的字符串就等价于以下的位置
 * hello==""+"h"+"e"+""+"l"+""+"l"+""+"o"+""
 */
// var result="2131312";
// console.log(result.replace(/(?=\d{3})/g,','))
// 2131,312 此时输出的就是在值得后面加上,

// var regex = /^I love (JavaScript|Regular Expression)/;
// let result='I love JavaScript and Regular Expression';
// let result1='I love Regular Expression'
// console.log('result', result.match(regex) );
/**
 * result [
    'I love JavaScript',
    'JavaScript',
    index: 0,
    input: 'I love JavaScript and Regular Expression',
    groups: undefined
    ]
 */
// console.log('result1',result1.match(regex) );
/**
 * result1 [
    'I love Regular Expression',
    'Regular Expression',
    index: 0,
    input: 'I love Regular Expression',
    groups: undefined
   ]
 * 
 * 
 * 
 */




//日期的匹配
// var date='2020-01-02'
// var reg=/\d{4}-\d{2}-\d{2}/
// console.log(date.match(reg))
// [ '2020-01-02', index: 0, input: '2020-01-02', groups: undefined ] 此时智慧匹配一次
// var date='2020-01-02'
// var reg=/(\d{4})-(\d{2})-(\d{2})/
// console.log(date.match(reg))
// match 返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（括号里）匹配的
// 内容，然后是匹配下标，最后是输入的文本。另外，正则表达式是否有修饰符 g，match
// 返回的数组格式是不一样的。
// g返回的值就是 ['2020-01-02']
/**
 * [
  '2020-01-02',
  '2020',
  '01',
  '02',
  index: 0,
  input: '2020-01-02',
  groups: undefined
]
 * 
 * 
 */
// var date='2020-01-02'
// var reg=/(\d{4})-(\d{2})-(\d{2})/g
// // console.log(reg.exec(date))
// console.log(reg.test(date))
// console.log('RegExp.$1',RegExp.$1)
/**
 * [
  '2020-01-02',
  '2020',
  '01',
  '02',
  index: 0,
  input: '2020-01-02',
  groups: undefined
]
 * 
 * 
 * 
 */
// var date='2020-01-02'
// var reg=/(\d{4})-(\d{2})-(\d{2})/
// // console.log(reg.exec(date))
// console.log(date.replace(reg,function(...params){
//     console.log('获取的params',params)
//     // 此时输出的params就是:[ '2020-01-02', '2020', '01', '02', 0, '2020-01-02' ]
//     return '萨达'
// }))

var date='2020-01-02'
var date1='2020-01.02'
var reg=/\d{4}(-|\/|.)\d{2}\1\d{2}/
// console.log(reg.exec(date))
// console.log(date.replace(reg,function(...params){
//     console.log('获取的params',params)
//     // 此时输出的params就是:[ '2020-01-02', '2020', '01', '02', 0, '2020-01-02' ]
//     return '萨达'
// }))
console.log(reg.test(date))
console.log(reg.test(date1))

