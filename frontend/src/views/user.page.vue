<template>
<div class="user-page">
    <h2>Hello {{user.name}}</h2>
    <div class="add-new-board-container">
        <button class="btn-board btn-shadow" @click="isAddNewBoard=!isAddNewBoard">Add new board</button>
    </div>
    <div class="cards-container">
        <board-card v-for="board in boards" :board="board" :key="board._id" :class="'board-card ' + board.title"></board-card>
    </div>
    <window-overlay v-if="isAddNewBoard" @close="isAddNewBoard=false"></window-overlay>
    <add-board v-if="isAddNewBoard" @addNewBoard="addNewBoard"></add-board>
</div>
</template>

<script>
import addMembers from "../components/add-members.vue";
import boardCard from "../components/board-card.vue";
import addBoard from "../components/add-board";
import windowOverlay from "../components/window-overlay.vue";
export default {
    name: "user-page",
    data() {
        return {
            user: {},
            boards: [],
            isAddNewBoard: false
        };
    },
    created() {
        this.user = this.$store.getters.loggedinUser;
        this.getBoardsFromStore();
    },
    methods: {

        addMembers(board) {
            board.isAddMembers = !board.isAddMembers;
        },
        getBoardsFromStore() {
            this.$store
                .dispatch({
                    type: "getBoards",
                    userId: this.$store.getters.loggedinUser._id
                })
                .then(boards => this.boards = boards)
        },
        addNewBoard(prefs) {
            this.$store.dispatch({
                type: "addBoard",
                user: this.$store.getters.loggedinUser,
                prefs: prefs
            })
            .then(board=>this.$router.push('/'+board._id))
        }
    },
    components: {
        addMembers,
        boardCard,
        addBoard,
        windowOverlay
    }
};
</script>

<style>
</style>
