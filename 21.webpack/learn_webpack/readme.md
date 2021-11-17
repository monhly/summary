## webpack 属于工具  使用node开发一款打包工具   node的一个框架（express）

## webpack 的常用功能
  - 代码转化 sass less stylus --> css  ts->js  ...
  - 文件优化  压缩（css js html）
  - 模块化
  - 自动更新

## 模块化规范
  esModule 浏览器支持的模块化  import export
  commonjs 规范  (node)  require exports

  #### esModule
    import 自定义名字 from '某个模块'    某个模块（node自带的、三方的(npm 安装的)、自己的）
            某个模块 一定有 export default 的这种默认导出
    import {名字}  from '某个模块'
      名字一定模块中定义好的名字 不能随便写；
      导出的时候一定需要是 export 声明关键字  名字；  声明关键字(var let const function  class)

  #### commonjs 
        require
        module.exports 
        node的模块 都会有5个内置变量     module, require, exports, __dirname, __filename
          __dirname 当前文件所在文件夹的绝对目录
          __filename 当前文件的绝对目录


包管理器  npm（node自带）   cnpm  yarn

生产环境  开发环境
生产依赖  开发依赖

yarn add xxx -D  开发
yarn add xxx -S  生产


开发服务器的脚本配置
webpack 4.0    "dev":"webpack-dev-server"
webpack 5.0    "dev":"webpack serve"


## 优化

- 压缩js 和 css  (css不会默认压缩  但是一但启动css的压缩之后 那么 js就不会自动压缩了)
      css-minimizer-webpack-plugin  压缩css 
      terser-webpack-plugin         压缩JS

-  exclude 排除不用解析的那些文件  /node_modules/

- noParse:/jquery|lodash/ 使用这个优化项的化 需要我们知道那些包没有另外的依赖

-  resolve --> alias  可以提升 文件的查找速度；也就是可以提升webpack编译性能
-  resolve --> extensions 可以在引入某些文件的时候省略文件的后缀
-  resolve --> modules : modules: ['node_modules','src'], 减少文件的搜索范围


- webpack.ProvidePlugin 可以让我们在模块中不写import 也能使用对应的引用
- webpack.IgnorePlugin  忽略某些包中的不必要文件
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      });

- externals:{}  外部扩展  可以让我们通过cdn的方式引入一些包  但是在模块中 还是可以正常通过import使用这个包   

- splitChunks 分包

- DllPlugin + DllReferencePlugin 两者结合 可以把一些不经常修改的文件单独导包出来
     DllPlugin 使用在主配置文件  
     DllReferencePlugin  使用在独立的导报配置文件中

- thread-loader(新的)  happypack(老的)  多进程打包     