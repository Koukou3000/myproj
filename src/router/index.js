import Vue from 'vue'
import Router from 'vue-router'

// 固定路由
const Login = () => import('@/views/Login')
const NotFound = () => import('@/views/404')
const Home = () => import('@/views/Home')

// 用于生成动态路由
import api from '@/http/api' //js中使用封装的 @http/api即可；Vue中将api安装到原型上，所以是import @http/index
import store from '@/store'
import { isURL } from '@/utils/validate' // 做成模块，方便维护

Vue.use(Router)

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
}

// router-view 读取 component显示
const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [] // 维护动态路由列表
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
    , {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('user')
  if (to.path == '/login') {
    if (isLogin) {
      next({ path: '/' })
    }
    else {
      next()
    }
  }
  else {
    if (!isLogin) {
      next({ path: '/login' })
    }
    else {
      addDynamicMenuAndRoutes()
      next()
    }
  }
})
/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes() {
  if (store.state.menu.menuRouteLoaded) {
    console.log('动态路由已经加载')
    return
  }
  // 上锁，更新菜单、路由的加载状态
  store.commit('menuRouteLoaded', true)

  api.menu.findMenuTree()
    .then((res) => {
      // 返回的数据用于MenuBar
      store.commit('setMenuTree', res.data)
      // 返回的数据用于VueRouter，将数据调整为需要的格式（路由不需要递归）
      let dynamicRoutes = addDynamicRoutes(res.data) // 添加动态路由

      // addRoutes被舍弃
      // router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      // router.addRoutes(router.options.routes);
      for (let i = 0; i < dynamicRoutes.length; i++) {
        let routeRecordName = '首页' // 添加路由所处的父结点名称
        let routeRecordNew = dynamicRoutes[i]
        router.addRoute(routeRecordName, routeRecordNew)
      }
    })
    .catch(function (res) {
      alert(res);
      store.commit('menuRouteLoaded', true) // 失败了，解锁
    });
}
/**
    * 添加动态(菜单)路由
    * @param {*} menuList 菜单列表
    * @param {*} routes 递归创建的动态(菜单)路由
    */
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    //有子结点，不需要跳转
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children) // 需要递归的部分，放入temp等待处理
    }
    // 没有子结点，将该项处理成route后push到routes（路由不需要递归）
    else if (/\S/.test(menuList[i].url)) {
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        },
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['meta']['iframeUrl'] = menuList[i].url
      }
      // url是相对地址，通过router-view展示 
      else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件在views中的文件名需要和url一致
          // 如url="sys/user"，则组件路径应是"@/views/Sys/User.vue",否则找不到组件
          let path = menuList[i].url.replace(/\/\w/g, match => {
            return match.toUpperCase() // 大写首字母： /sys/menu => /Sys/Menu
          })
          path = path.replace(/^\/+/, '') // 去掉斜杠： /Sys/Menu => Sys/Menu
          
          // route['component'] = (resolve) => require([`@/views/${path}`], resolve) // @/views/Sys/User
          // require换成import，按需加载
          // [request]：webpack打包时实际解析的文件名
          route['component'] = () => import(/*webpackChunkName: "[request]"*/`@/views/${path}`) 
        } catch (e) { }
      }
      routes.push(route)
    }
  }
  // 非叶结点会被放入temp继续递归
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes) // 在函数内修改routes，可以影响函数外的routes
  } else {
    console.log('递归结束', routes)
  }
  return routes
}







export default router