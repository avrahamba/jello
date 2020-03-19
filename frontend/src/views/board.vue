<template>
<section class="board" v-if="boardData" :style="style">
    <nav-board :boardData="boardData"></nav-board>
    <section class="lists-container">
        <task-list v-for="taskList in boardData.taskLists" :key="taskList.id" :task-list-data="taskList">
        </task-list>
        <button class="add-list-btn btn">Add a list</button>
    </section>
</section>
</template>

<script>
import taskList from '../components/task-list.vue'
import navBoard from '../components/nav-board.vue';
export default {
    data() {
        return {
            boardData: null
        }
    },
    created() {
        const boardId = this.$route.params.id
        this.$store.dispatch({ type: 'getBoard', boardId })
            .then(board => {
                if (board.failed) {
                    this.$router.push('/')
                    return
                }
                this.boardData = board
            })

    },
    components: {
        taskList,
        navBoard
    },
    computed: {
        style() {
            if (this.boardData.style.background && !this.boardData.style.background.includes('http'))
                return {
                    'background-color': this.boardData.style.background
                }
            else return ''
        }
    },
}
</script>

<style>
</style>
