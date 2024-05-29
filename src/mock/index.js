import Mock from 'mockjs'
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'

// 1. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 2. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
fnCreate(login, true)
fnCreate(user, true)
fnCreate(menu, true)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate(mod, isOpen = true) {
  if (isOpen) {
    for (var key in mod) {
      const res = mod[key]() || {};
      if (res.isOpen !== false) {
        Mock.mock(new RegExp(res.url), res.type, (opts) => {
          //优先匹配定义顺序在模块中靠前的对象
          //opts:{code, msg, body} => opts:{code, msg, data}
          opts['data'] = opts.body ? JSON.parse(opts.body) : null
          delete opts.body

          console.log('mock is strangling request\n')
          console.log('%cmock拦截, 请求: ', 'color:green', opts)
          console.log('%cmock拦截, 响应: ', 'color:yellow', res.data)
          return res.data
        })
      }
    }
  }
}
