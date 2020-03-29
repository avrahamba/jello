<template>
  <div id="app">
    <header-cmp/>
    <router-view/>
    
  </div>
</template>
<script>
import headerCmp from '@/components/header-cmp.vue'
export default {
  computed: {
    appClass(){
      // console.log('this.$router :', this.$router.path);
      if(this.$router)
      return 
    }
  },
  components:{
    headerCmp
  }
}
</script>

<style lang="scss">
</style>
