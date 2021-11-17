// let a = '你好'
// module.exports = {
//   a: '我不在了',
//   b: 'hello',
// }
// console.log(module)
let time = require('../03.npm/index')
let now_time = new Date()
console.log(time.dataFormate(now_time))
console.log(time.replce_str('<nihao shijie >'))
