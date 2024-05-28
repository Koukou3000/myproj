export default {
  // 当 namespaced 设置为 true 时，在 commit 和 dispatch 时需要加上模块名。$store.state.app.commit('collpase')
  // namespace: true,
  state: {
    appName: "I like Kitty",  // 应用名称
    collapse: false  // 导航栏收缩状态
  },
  getters: {
    collapse(state) {// 对应着上面state
      return state.collapse;
    },
    appName(state) {
      return state.appName
    }
  },
  mutations: {
    collapse(state) {  // 改变收缩状态
      state.collapse = !state.collapse;
    }
  },
  actions: {

  }
}