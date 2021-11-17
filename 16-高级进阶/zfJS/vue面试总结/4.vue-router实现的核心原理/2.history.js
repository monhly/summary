//基于原生方式实现hash路由的变化

(function () {
  let routerView = document.getElementById("routeView");
  window.addEventListener("load", () => {
    console.log("location.hash", location);
    if (!location.pathname) {
      location.pathname = "/";
    }

    let ul = document.querySelector("ul");
    ul.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        if (e.target.nodeName === "A") {
          let src = e.target.getAttribute("href");
          history.pushState(src, null, src); // 修改URL中的地址
          routerView.innerHTML = src; // 更新UI
        }
      },
      false
    );
    let pathname = location.pathname;
    routerView.innerHTML = pathname;
  });
  window.addEventListener("popstate", (e) => {
      console.log('e',e,location)
    let pathname = location.pathname;
    routerView.innerHTML = pathname;
    console.log("popState");
  });
})();
