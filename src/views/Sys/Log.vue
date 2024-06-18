<template>
  <div>
    <i class="LIMS-iconsnippets" @click="goCopy">复制</i>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {

    };
  },
  methods: {
    goCopy() {
      console.log('iconfont 使用成功？')
    }
  }

}
</script>
<style scoped>
.LIMS-iconsnippets {
  cursor: pointer;
}
</style>