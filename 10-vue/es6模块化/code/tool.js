// function updateDom(id,content) {
//   document.getElementById(id).innerHTML = content
// }

// export default updateDom
// export let name = "tool.js"
// export const version = "1.0.1"
// export function updateDom (id,content) {
//     document.getElementById(id).innerHTML = content
// }

let name = "tool.js"
const version = "1.0.1"
function updateDom (id,content) {
  document.getElementById(id).innerHTML = content
}
export default {version};  
export { name, updateDom}