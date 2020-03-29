<template>
<header class="header-cmp">
    <div class="boards-menu">
        <div class="board-list" v-if="openBoard" @click="openBoard=false">
            <router-link :to="'/'+board._id" class="board-preview" v-for="board in boards" :key="board._id">
                {{board.title}}
            </router-link>
        </div>
        <button @click="openBoard=!openBoard" class="boards-btn btn">
            <i class="fab fa-trello boards-btn-icon"></i>Boards
        </button>
    </div>

    <router-link to="/">
        <div class="logo">
            <h1>Jello</h1>
        </div>
    </router-link>

    <div class="user-settings">
        <button class="user-settings-btn btn" aria-label="Notifications">
            <i class="fas fa-bell" aria-hidden="true"></i>
        </button>
        <button class="user-settings-btn btn" aria-label="User Settings">
            <i class="fas fa-user-circle" aria-hidden="true"></i>
        </button>
        <button @click="doLogout" class="user-settings-btn btn" aria-label="User Settings">
            <i class="fa fa-sign-out-alt"></i>
        </button>
    </div>
</header>
</template>

<script>
export default {
data() {
    return {
        openBoard:false
    }
},
    methods: {
        async doLogout() {
            await this.$store.dispatch({ type: "logout" });
            this.$router.push({ path: "/" });
        },
    },
    computed: {
        boards() {
            if (!this.$store.getters.boardsList) return []
            const boards = [...this.$store.getters.boardsList.filter(board => board.onUser), ...this.$store.getters.boardsList.filter(board => !board.onUser)]
            if (boards.length > 10) boards.splice(10, Infinity)
            return boards

        }
    },

};
</script>

<style>
</style>
