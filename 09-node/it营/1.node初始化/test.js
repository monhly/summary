// 测试commonJS

exports.testApi = function testApi(params) {
  return "哈哈哈哈" + params;
};
let obj = {
  name: "obj",
  testApi() {},
};
module.exports = obj;
