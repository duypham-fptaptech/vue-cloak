<template>
<h1>hello</h1>
</template>

<script>
export default {
  name: "AddRealmRole",
  mounted() {
    let account = localStorage.getItem('account');
    console.log("KT account trong orderList: " + account)
    if( account ){
      window.axios = require('axios')
      window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + account;
    }
  },
}
</script>

<style scoped>

</style>
