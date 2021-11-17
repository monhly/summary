function loader(source) {
  console.log('获取的loader  a')
  return source
}
loader.pitch = function () {
  console.log('a pitch')
}
module.exports = loader
