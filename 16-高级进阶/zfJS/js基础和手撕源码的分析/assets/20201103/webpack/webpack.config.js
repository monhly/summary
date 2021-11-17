const path = require('path');
module.exports = {
    mode: 'production',
    // 入口：编写插件代码的JS
    entry: './src/index.js',
    // 打包
    output: {
        filename: 'modalplugin.min.js',
        path: path.resolve(__dirname, 'dist')
    }
};