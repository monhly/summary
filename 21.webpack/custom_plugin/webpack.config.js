const path = require('path')
const webpack = require('webpack')
const BasicPlugin = require('./custom_plugin.js')
const InlinePlugin = require('./InlinePlugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js', //entry可以是对象或者是字符串的形式
  output: {
    //生成自定义的hash文件
    filename: '[name].[chunkhash].js', //文件名
    path: path.resolve(__dirname, 'dist/'), //要求必须是绝对路径
  },

  plugins: [
    // new BasicPlugin(
    //   () => {
    //     // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
    //     console.log('构建成功')
    //   },
    //   (err) => {
    //     // Webpack 构建失败，err 是导致错误的原因
    //     console.error(err)
    //   }
    // ),
    new InlinePlugin({
      match: /\.js|\.css/,
    }),
  ],
}
