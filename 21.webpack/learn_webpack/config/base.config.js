const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    indexa: './src/a.js',
    indexb: './src/b.js',
  }, //entry可以是对象或者是字符串的形式
  output: {
    //生成自定义的hash文件
    filename: 'js/[name].[fullhash].js', //文件名
    path: path.resolve(__dirname, '../dist/'), //要求必须是绝对路径
  },
  //   devServe:{
  //       contentBase:path.join(__dirname,'dist'),
  //       compress:true,
  //       port:900
  //   }
}
