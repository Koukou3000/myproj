<template>

  <div class="left">
    <!--导航菜单-->
    <el-menu default-active="1-3" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('user')">用户管理</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('menu')">菜单管理</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
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
import axios from 'axios';


export default {
  name: 'Home',
  methods: {
    logout() { },
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