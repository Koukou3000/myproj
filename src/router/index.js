import Vue from 'vue'
import Router from 'vue-router'

// 固定路由
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'

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
    } else {
      next()
    }
  }
  else {
    if (!isLogin) {
      next({ path: '/login' })
    } else {
      addDynamicMenuAndRoutes()
      next()
    }
  }
})
/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes() {
  api.menu.findMenuTree()
    .then((res) => {
      // 返回的数据用于MenuBar
      store.commit('setMenuTree', res.data)
      // 返回的数据用于VueRouter，将数据调整为需要的格式（路由不需要递归）
      let dynamicRoutes = addDynamicRoutes(res.data) // 添加动态路由
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.addRoutes(router.options.routes);
    })
    .catch(function (res) {
      alert(res);
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
      // menuList[i].url = menuList[i].url.replace(/^\//, '') // 如果是开头带斜杠的，调整，'/menu' => 'menu'
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
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['meta']['iframeUrl'] = menuList[i].url
      }
      // url是相对地址，通过router-view展示 
      else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件在views中的文件名需要和url一致
          // 如url="sys/user"，则组件路径应是"@/views/Sys/User.vue",否则组件加载不到
          let path = menuList[i].url.replace(/\/\w/g, match => {
            return match.toUpperCase() // /sys/menu => /Sys/Menu
          })
          path = path.replace(/^\/+/, '') // /Sys/Menu => Sys/Menu
          route['component'] = resolve => require([`@/views/${path}`], resolve) // @/views/Sys/User
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