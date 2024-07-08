<template>
  <div>
    dept test IndexedDB

    <el-button @click="addALine">add a line</el-button>
    <!-- <el-button @click="getALine">get a line</el-button> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {

      db: null,
      db_table: null,
    };
  },
  methods: {
    addALine() {
      // 确保数据库已成功打开
      if (!this.db) {
        console.error('Database is not initialized.');
        return;
      }

      let transaction = this.db.transaction(['table1'], 'readwrite');  // 告知事务它将操作哪些表，保持一致性；如果不能全部修改，都不修改
      let store = transaction.objectStore('table1');                   // 从事务中获取表

      let request = store.add({
        id: new Date().getTime(),
        name: 'kk',
        age: 21
      });
      request.onsuccess = () => {
        console.log('success to add');
      };

      request.onerror = e => {
        console.log('fail to add', e);
      };
    }
  },
  // lifeline
  beforeCreate() {
    console.log('Dept component creating!')
    console.log('   dept beforeCreated.')
  },
  created() {
    console.log('   dept created.')
  },
  beforeMount() {
    console.log('   dept beforeMounted.')
  },
  mounted() {
    console.log('dept mounted.')
    console.log('Dept component created!')

    let request = window.indexedDB.open('schema1', 1);

    request.onerror = (e) => {
      console.log('indexedDB fail to open', e)
    }
    request.onsuccess = (res) => {
      console.log('indexedDB opened.', res)
      this.db = res.target.result
    }
    request.onupgradeneeded = (res) => {
      console.log('upgrading IndexedDB... ', res);
      this.db = res.target.result;
      this.db_table = this.db.createObjectStore('table1', { keyPath: 'id' });
      this.db_table.createIndex('indexName', 'name', { unique: false });
    }
  },


}
</script>
<style scoped></style>