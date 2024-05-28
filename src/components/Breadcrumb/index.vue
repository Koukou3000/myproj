<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
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

<style scoped >
.breadcrumb {
  padding: 10px;  
  border-color: rgba(38, 86, 114, 0.2);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
</style>