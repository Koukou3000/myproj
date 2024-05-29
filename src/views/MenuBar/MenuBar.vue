<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'">
      <img :src="this.logo" />
      <div>{{ collapse ? '' : appName }}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1-1" :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'" :collapse="collapse">
      <MenuTree v-for="item in menutree" :key="item.menuId" :menu="item"></MenuTree>

    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MenuTree from '@/components/MenuTree'
export default {
  components: {
    MenuTree
  },
  data() {
    return {
      logo: "",
    };
  },
  methods: {
    // 加载导航菜单
    findMenuTree() {
      this.$api.menu.findMenuTree()
        .then((res) => {
          // 返回的数据用于MenuBar
          this.$store.commit('setMenuTree', res.data)
          // 返回的数据用于VueRouter，将数据调整成需要的格式（路由不需要递归）
          let routes = this.addDynamicMenuRoutes(res.data)
          for (let i = 0; i < routes.length; i++) {
            this.$router.options.routes[0].children.push(routes[i]) // 动态路由都挂载在首页path: '/'下
          }
          this.$router.addRoutes(this.$router.options.routes) // 所有的数据处理好，一次更新
        })
        .catch((res) => {
          alert(res)
        })
    },
    /**
     * 添加动态(菜单)路由
     * @param {*} menuList 菜单列表
     * @param {*} routes 递归创建的动态(菜单)路由
     */
    addDynamicMenuRoutes(menuList = [], routes = []) {
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
          if (this.isURL(menuList[i].url)) {
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
              path = path.replace(/^\/+/,'') // /Sys/Menu => Sys/Menu
              route['component'] = resolve => require([`@/views/${path}`], resolve) // @/views/Sys/User
            } catch (e) { }
          }
          routes.push(route)
        }
      }
      // 非叶结点会被放入temp继续递归
      if (temp.length >= 1) {
        this.addDynamicMenuRoutes(temp, routes) // 在函数内修改routes，可以影响函数外的routes
      } else {
        console.log('递归结束', routes)
      }
      return routes
    },
    isURL(str) {
      // URL 的基本格式为 "协议://主机名:端口号/路径?查询字符串#片段标识符"
      // 这里使用了一个简单的正则表达式来检查字符串是否符合这种格式
      // 注意：这个正则表达式只是一个基本的检查，不包含所有可能的 URL 场景
      const urlRegex = /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:\S+(?::\d{1,5})?)?(?:[a-zA-Z0-9\u4e00-\u9fa5\-.]+)(?::\d{1,5})?(?:\/\S*)?(?:\?\S*)?(?:#\S*)?$/;
      return urlRegex.test(str);
    }
  },
  mounted() {
    this.logo = require('@/assets/logo.png')
    this.findMenuTree()
  },
  computed: {
    ...mapState({
      appName: state => state.app.appName,
      collapse: state => state.app.collapse,
      menutree: state => state.menu.menuTree
    })
  }
};
</script>

<style scoped>
.menu-bar-width {
  width: 200px;
}

.menu-bar-collapse-width {
  width: 65px;
}

.el-menu {
  position: absolute;
  top: 60px;
  bottom: 0px;
  text-align: left;
}

.logo {
  position: absolute;
  top: 0px;
  height: 60px;
  line-height: 60px;
  background: #4b5f6e;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 0px;
  margin: 10px 10px 10px 10px;
  float: left;
}

div {
  font-size: 22px;
  color: white;
  text-align: left;
}
</style>