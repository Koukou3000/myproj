<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.menuId + ''">
    <template slot="title">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.name }}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.menuId" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
  <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $t("sys.sysMng") }}</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('user')">{{ $t("sys.userMng") }}</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('dept')">{{ $t("sys.deptMng") }}</el-menu-item>
        <el-menu-item index="1-3" @click="$router.push('role')">{{ $t("sys.roleMng") }}</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('menu')">{{ $t("sys.menuMng") }}</el-menu-item>
        <el-menu-item index="1-5" @click="$router.push('log')">{{ $t("sys.logMng") }}</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $t("sys.sysMonitor") }}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("sys.nav3") }}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("sys.nv4") }}</span>
      </el-menu-item> -->
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
      // menuId
      // icon 
      // name
      // url
      // children:[]
    }
  },
  methods: {
    handleRoute(menu) {
      // 通过菜单URL跳转至指定路由
      this.$router.push(menu.url)
    }
  },
}
</script>