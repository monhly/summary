const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { DefinePlugin } = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    a: './src/a.js',
    b: './src/b.js',
    index: './src/index.js',
  }, //entry可以是对象或者是字符串的形式
  output: {
    //生成自定义的hash文件
    filename: '[name].[chunkhash].js', //文件名
    path: path.resolve(__dirname, 'dist/'), //要求必须是绝对路径
  },
  // devtool:'source-map',
  devServer:{
    before: function (app, server, compiler) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
  },
  watch:true,
  resolve:{
    //解析第三方的包

  },
  plugins: [
    new CleanWebpackPlugin(), //用于删除/清理构建文件夹的webpack插件,删除output中的所有文件,进行重新的构建
    new HtmlWebpackPlugin({
      template: './public/index.html', //自定义html模板
      title: '唉唉',
      filename: 'a.html',
      minify: {
        removeAttributeQuotes: true,
        //清除双引号
      },
      chunks: ['a'],
    }),
    //多个html的引入
    new HtmlWebpackPlugin({
      template: './public/index.html', //自定义html模板
      title: '唉唉',
      filename: 'b.html',

      minify: {
        removeAttributeQuotes: true,
        //清除双引号
      },
      chunks: ['b'],
    }),
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
    /**
    *
        传入的每个键DefinePlugin都是一个标识符或多个标识符，以..
        如果值是一个字符串，它将被用作代码片段。
        如果值不是字符串，它将被字符串化（包括函数）。
        如果值是一个对象，则所有键的定义方式相同。
        如果您typeof为键添加前缀，则它仅针对调用类型定义。
        这些值将被内联到代码中，允许缩小传递以删除冗余条件。
    */
    //抽离css的文件
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    })
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        //style-loader通过一个style标签;来自动把styles插入到dom中去
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
          //全局window挂载jqueryd对象形式
        },
      },
    ],
  },

  // 优化:压缩等
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  // devServe: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   // compress: true,
  //   port: 8080,
  // },
}
