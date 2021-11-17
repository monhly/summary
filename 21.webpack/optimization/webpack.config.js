const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const { DllPlugin } = require("webpack");
const { DllReferencePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  }, //entry可以是对象或者是字符串的形式
  output: {
    //生成自定义的hash文件
    filename: "[name].[chunkhash].js", //文件名
    path: path.resolve(__dirname, "dist/"), //要求必须是绝对路径
  },
  plugins: [
    new CleanWebpackPlugin(), //用于删除/清理构建文件夹的webpack插件,删除output中的所有文件,进行重新的构建
    new HtmlWebpackPlugin({
      template: "./pubilc/index.html",
    }),
    // new DllPlugin({}),
    // new DllReferencePlugin({}),
  ],
  module: {
    //防止webpack解析与正则相匹配的文件,忽略文件中不包含import的调用
    // noParse: /jquery/,
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env",'@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer:{
    port:8000,
    contentBase:'./pubilc/index.html'
  }
};
