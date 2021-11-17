//基于原生方式实现hash路由的变化

(function () {
  let routerView = document.getElementById("routeView");
  window.addEventListener("load", () => {
      console.log('location.hash',location)
    if (!location.hash) {
      location.hash = "/";
    } else {
      //如果存在hash值，那就渲染对应UI
      let hash = location.hash;
      routerView.innerHTML = hash;
    }
  });
  window.addEventListener("hashchange", () => {
    let hash = location.hash;
    routerView.innerHTML = hash;
    console.log("hashChange");
  });
})();
