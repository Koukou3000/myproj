<template>
  <div class="container" :class="$store.state.app.collapse? 'menu-bar-collapse-width' : 'menu-bar-width'">
    <BreadCrumb></BreadCrumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
    };
  },
  methods: {

  },
  mounted() {


  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 60px;
  bottom: 0px;
  left: 200px;
  right: 0px;

}

.breadcrumb {
  padding: 10px;
  border-color: rgba(38, 86, 114, 0.2);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  background: rgba(138, 158, 170, 0.2);
}
.menu-bar-collapse-width{
  left: 65px;
}
.menu-bar-width{
  left: 200px;
}
</style>