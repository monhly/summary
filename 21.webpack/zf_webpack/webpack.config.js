const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  }, //entry可以是对象或者是字符串的形式
  output: {
    //生成自定义的hash文件
    filename: '[name].[chunkhash].js', //文件名
    path: path.resolve(__dirname, 'dist/'), //要求必须是绝对路径
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), //用于删除/清理构建文件夹的webpack插件,删除output中的所有文件,进行重新的构建
    new HtmlWebpackPlugin({
      template: './public/index.html', //自定义html模板
      title: '唉唉',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        //清除双引号
      },
      chunks: ['index'],
    }),
    new VueLoaderPlugin(),
  ],
}
