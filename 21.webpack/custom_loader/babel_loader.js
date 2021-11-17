//手动实现babel-loader插件
let babel = require('@babel/core')
const { getOptions } = require('loader-utils')

function loader(source) {
  console.log(Object.keys(this))
  //设置了sourceMap就能够拿到sourceMap,未设置的话获取的就是undefined
  console.log(this.sourceMap)
  let ad = getOptions(this) //获取传入的options
  console.log(ad)
  babel.transform(
    source,
    {
      ...ad,
      sourceMap: true,
    },
    function (err, result) {
      console.log(result)
    }
  )
  return source
}
module.exports = loader
