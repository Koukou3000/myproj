export default {
  // 当 namespaced 设置为 true 时，在 commit 和 dispatch 时需要加上模块名。$store.state.menu.setMenuTree('collpase')
  // namespace: true,
  state: {
    menuTree: [], // 前端渲染菜单需要的数据
    menuRouteLoaded: false, // 菜单和路由是否已经加载
  },
  getters: {
   
  },
  mutations: {
    setMenuTree(state, payload) {   
      state.menuTree = payload
    },
    menuRouteLoaded(state, menuRouteLoaded) {  // 改变加载状态
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {
    
  } 
}