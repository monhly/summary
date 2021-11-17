//打包生成文件列表大小
class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename
    }
    apply(complier) {
        //hooks 就是传入的complier阶段传入的hook
        //在将资产发送到输出目录之前执行
        complier.hooks.emit.tap('custom', (state) => {
            console.log('编译完成', state.assets)
                //此时输出的就是compilation对象
            let assets = state.assets
            let content = `# 文件名    资源大小  \r\n`
            Object.entries(assets).forEach(([name, obj]) => {
                content = content + `${name}    ${obj.size}`
            })
            console.log(content)
            assets[this.filename] = {
                    source() {
                        return content
                    },
                    size() {
                        return content.length
                    },
                }
                //   console.log(obj)
        })
    }
}
module.exports = FileListPlugin