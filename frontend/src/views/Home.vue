<template>
<div class="home">
    <router-link to="/signup">Sign Up</router-link> |
    <router-link to="/login">Login</router-link>
    <router-link v-for="board in boards" :key="board._id" :to="'/'+board._id">
        {{board.title}}
    </router-link>
</div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    data() {
        return {
            boards: []
        }
    },
    created() {
        this.$store.dispatch({ type: 'getBoards',userId: this.$store.getters.loggedinUser.id })
            .then(boards => this.boards = boards)
    },
    components: {
        HelloWorld
    }
}
</script>
