// 实现 vueRouter类
// install
// History
/**
 * const routes=[
 * {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
 * 
 * ]
 * const router=new VueRouter({
 * mode:'histrory',
 * routes
 * })
 * 
 * 
 * 
 */
let Vue;
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.app = null;
    this.mode = options.mode || "hash";
    this.routes = options.routes||[];
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }
  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
  init() {
    if (this.mode === "hash") {
      //先判断用户打开是否有hash值;
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("load", () => {
        //获取的当前的hash的路径如:#/ha 此时this.history.current就是 ha
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("load", () => {
        this.history.current = location.pathname;
      });
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname;
      });
    }
  }
}
VueRouter.install = function(v) {
   
  Vue = v;
  Vue.mixin({
    beforeCreate() {
      //判断是否是根组件
      console.log('获取的this',this)
      if (this.$options && this.$options.router) {
        this._root = this; //挂载当前实例到root上面
        this._router = this.$options.router;
        Vue.util.defineReactive(this, "xxx", this._router.history);
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root;
      }

      Object.defineProperty(this, "$router", {
        get() {
          return this._root&&this._root._router;
        },
      });
      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current;
        },
      });
    },
  });
  // 注册组件
  Vue.component("router-link", {
    props: {
      to: String,
    },
    render(h) {
        console.log('render中的this',this,h)
      let mode = this._self._root._router.mode;
      let to = mode === "hash" ? "#" + this.to : this.to;
      console.log('this.$slots.default',this.$slots.default)
      return h("a", { attrs: { href: to } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      return h(routeMap[current]);
    },
  });
};
export default VueRouter;
