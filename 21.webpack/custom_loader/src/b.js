function loader(source) {
  console.log('获取的loader  b')
  return source
}
loader.pitch = function () {
  console.log('b pitch')
}
module.exports = loader
