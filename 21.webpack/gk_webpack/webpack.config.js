const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path=require('path')
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        //   {
        //     loader: "px2rem-loader",
        //     options: {
        //       remUni: 75,
        //       remPrecision: 8,
        //     },
        //   },
        ],
      },
    ],
  },
  plugins: [
    //删除之前打包的dist文件夹,生成新的dist文件夹
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'./src/index.html')
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
};
