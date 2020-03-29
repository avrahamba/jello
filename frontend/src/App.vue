<template>
  <div id="app">
    <header-cmp/>
    <router-view/>
    
  </div>
</template>
<script>
import headerCmp from '@/components/header-cmp.vue'
export default {
  created() {
    // document.body.parentElement.classList.add('set2')
  },
  computed: {
    appClass(){
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
