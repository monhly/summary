/**
 * 手动实现一个loader
 * loader的职责很单一,只需要完成一种转换,所以在开的时候只需要关心输入和输出就行
 */
const { getOptions } = require('loader-utils')
module.exports = function (source) {
  console.log('获取的source')
  return 'app哈哈;' + source
}
//每个loader都是无状态的,确保在不同的模块之间进行不同的保存状态;
