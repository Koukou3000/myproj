<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'">
      <img :src="this.logo" />
      <div>{{ collapse ? '' : appName }}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1-1" :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'" @open="handleopen"
      @close="handleclose" @select="handleselect" :collapse="collapse">
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
    handleopen() {
      console.log('handleopen');
    },
    handleclose() {
      console.log('handleclose');
    },
    handleselect(a, b) {
      console.log('handleselect');
    },
    findMenuTree() {
      this.$api.menu.findMenuTree()
        .then((res) => {
          this.$store.commit('setMenuTree', res.data)
        })
        .catch((res) => {
          alert(res)
        })

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