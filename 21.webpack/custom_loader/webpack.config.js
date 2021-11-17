const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js', //entry可以是对象或者是字符串的形式
  output: {
    //生成自定义的hash文件
    filename: 'bb.[chunkhash].js', //文件名
    path: path.resolve(__dirname, 'dist/'), //要求必须是绝对路径
  },
  resolveLoader: {
    // modules: [node_modules, path.resolve(__dirname, './write_loader.js')],
    alias: {
      // babel: path.resolve(__dirname, './babel_loader.js'),
      lessLoader: path.resolve(__dirname, './less-loader.js'),
      cssLoader: path.resolve(__dirname, './css-loader.js'),
      styleLoader: path.resolve(__dirname, './style-loader.js'),
      // loaderb: path.resolve(__dirname, './src/b.js'),
      // loaderc: path.resolve(__dirname, './src/index.js'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.js$/,

      //   use: [
      //     //loader执行的顺序是从右向左,从下向上,基于enforce更改执行顺序,pre post
      //     {
      //       loader: 'babel',
      //       options: {
      //         preset: ['@babel/preset-env'],
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /.js$/,
      //   use: [
      //     {
      //       loader: 'banner-loader',
      //       options: {},
      //     },
      //   ],
      // },
      // {
      //   test: /.js$/,
      //   use: [
      //     {
      //       loader: 'fileLoader',
      //       options: {},
      //     },
      //   ],
      // },
      {
        test: /.css$|.less$/,
        use: ['styleLoader', 'cssLoader', 'lessLoader'],
      },
    ],
  },
  plugins: [new htmlWebpackPlugin()],
}
