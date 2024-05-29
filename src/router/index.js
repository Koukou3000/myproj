import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'



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
      children: [
        // { path: '/user', component: User, name: '用户管理' },
        // { path: '/dept', component: Dept, name: '机构管理' },
        // { path: '/role', component: Role, name: '角色管理' },
        // { path: '/menu', component: Menu, name: '菜单管理' },
        // { path: '/log', component: Log, name: '日志管理' }
      ]
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
  let user = sessionStorage.getItem('user')
  if (to.path == '/login') {
    if (user) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!user) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router