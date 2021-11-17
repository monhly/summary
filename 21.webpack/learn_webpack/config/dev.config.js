const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const base = require('./base.config')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //将css单独抽到单独的文件中,为每个包含css和js问价你的创建一个css文件
module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map', //调试文件专用,能够定位报错位置
  plugins: [
    new HtmlWebpackPlugin({
      title: '生产环境的值',
    }), //自动打包生成html.html中自动引入打包好的,js

    //提供编译阶段的全局变量,可以再其他js中进行调用,
    /**
      *
          传入的每个键DefinePlugin都是一个标识符或多个标识符，以..
          如果值是一个字符串，它将被用作代码片段。
          如果值不是字符串，它将被字符串化（包括函数）。
          如果值是一个对象，则所有键的定义方式相同。
          如果您typeof为键添加前缀，则它仅针对调用类型定义。
          这些值将被内联到代码中，允许缩小传递以删除冗余条件。
      */
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
  ],
  devServer: {
    port: 9999,
    open: true,
    contentBase: path.join(__dirname, '../public'),
    before: function (app, server, compiler) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' })
      })
    },
  },
  module: {
    //loader的加载顺序是从右往左,从下往上执行,
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
})
