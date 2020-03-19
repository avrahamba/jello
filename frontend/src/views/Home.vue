<template>
  <div class="home">
 <router-link to="/signup">Sign Up</router-link> |  
 <router-link to="/login">Login</router-link>   

  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
