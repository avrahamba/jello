<template>
<section class="task-details">
    <board v-if="boardData" :board="boardData"></board>
    <router-link :to="'/'+boardData._id">
        <div class="screen"></div>
    </router-link>

</section>
</template>

<script>
import board from './board.vue';
export default {
    data() {
        return {
            boardData: null,
            task: null,
        }
    },
    created() {
        const id = this.$route.params.id;
        const boardId = id.substring(0, id.indexOf('-'))
        let tmpBoard = this.$store.getters.board
        if (tmpBoard && tmpBoard._id === boardId) {
            this.boardData = tmpBoard
            console.log('yes');
        } else {
            console.log('no');
        }
    },
    components: { board }
}
</script>

<style>

</style>
