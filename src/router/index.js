import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Main from '@/views/Main'
import Menu from '@/views/Menu'
import User from '@/views/User'

Vue.use(Router)

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { path: '/main', component: Main, name: '系统介绍' },
        { path: '/user', component: User, name: '角色介绍' },
        { path: '/menu', component: Menu, name: '菜单介绍' },
        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    ,{
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
      next({path:'/'})
    } else {
      next()
    }
  } else {
    if (!user) {
      next({path:'/login'})
    } else {
      next()
    }
  }
})

export default router