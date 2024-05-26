<template>

  <div class="left">
    <!--导航菜单-->
    <el-menu default-active="1-3" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $t("sys.sysMng") }}</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('user')">{{ $t("sys.userMng") }}</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('menu')">{{ $t("sys.menuMng") }}</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("sys.deptMng") }}</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("sys.roleMng") }}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("sys.logMng") }}</span>
      </el-menu-item>

      <!-- 切换语言 -->
      <el-menu-item index="4">
        <el-dropdown trigger="click" @command="handleCommand">
          <span>
            <i class="el-icon-location-outline"></i>
            {{ $t("common.changeLanguage") }}
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>


    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <el-col :span="24" class="breadcrumb-container">
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
    </section>

  </div>

</template>

<script>

export default {
  name: 'Home',
  methods: {
    logout() { },
    handleCommand(command) {
      let lang = command
      this.$i18n.locale = lang
    }
  }

}
</script>

<style scoped>
.left {
  position: absolute;
}

.el-menu {
  width: 200px;
}

.content-container {
  position: absolute;
  left: 200px;
  top: 0;
  margin: 10px;
  width: 500px;
}
</style>