<template>
  <div id="app">
    <header-cmp/>
    <router-view/>
    
  </div>
</template>
<script>
import headerCmp from '@/components/header-cmp.vue'
export default {
  
  components:{
    headerCmp
  }
}
</script>

<style lang="scss">
</style>
