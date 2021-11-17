/**
 * 基于面向对象实现图片懒加载的处理
 */
function LazyImg(option) {
  return new LazyImg.prototype.init(option);
}

LazyImg.prototype = {
  constructor: LazyImg,
  init: function (add) {
    console.log("我是add",add);
  },
};
LazyImg.prototype.init.prototype=LazyImg.prototype

window.LazyImg=LazyImg