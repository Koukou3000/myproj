<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button @click="getUser">getUser</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import mock from '@/mock/mock.js'

export default {
  name: 'Home',
  methods: {
    getUser() {
      axios.get('http://localhost:8080/user')
        .then(res => {
        alert(JSON.stringify(res.data))
      })
    }
  }
}
</script>