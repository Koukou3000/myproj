export default {
  // 当 namespaced 设置为 true 时，在 commit 和 dispatch 时需要加上模块名。$store.state.menu.setMenuTree('collpase')
  // namespace: true,
  state: {
    menuTree: []
  },
  getters: {
    findMenuTree(state) {// 对应着上面state
      return state.menuTree;
    },
  },
  mutations: {
    setMenuTree(state, payload) {  
      state.menuTree = payload
    }
  },
  actions: {
    
  }
}