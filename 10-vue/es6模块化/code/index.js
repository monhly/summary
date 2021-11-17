// // import {name,version,modifyDom} from "./tool.js"
// // console.log(name,version,modifyDom)
// // // tool("app",'es6模块化')
// import   obj, {name, updateDom} from "./tool.js"
// console.log(obj) // 得到export default的内容 {version:'1.0.1'}
// console.log(name) // tool.js
// console.log(updateDom) // function updateDom
// // console.log(obj.name)
// // console.log(obj.version)
var a = [1, 2, 3]
var b = [1, 2, 3, 4, 5, 6]
const c=b.filter((item) => {
    return a.findIndex(i => {
      return  i===item
})
})
console.log(c);
