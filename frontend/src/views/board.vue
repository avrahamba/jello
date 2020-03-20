<template>
<section class="board" v-if="boardData" :style="style">
    <nav-board :boardData="boardData"></nav-board>
    <section >

        <draggable class="lists-container" draggable=".task-list" v-model="boardData.taskLists" @start="drag=true" @end="drag=false">

            <task-list v-for="taskList in boardData.taskLists" :key="taskList.id" :task-list-data="taskList">
            </task-list>
            
        <button class="add-list-btn btn">Add a list</button>
        </draggable>
    </section>
</section>
</template>

<script>
import draggable from 'vuedraggable'
import taskList from '../components/task-list.vue'
import navBoard from '../components/nav-board.vue';
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            boardData: null
        }
    },
    created() {
        console.log('this.board :', this.board);
        if (this.board) {
            this.boardData = this.board
            return
        }
        const boardId = this.boardId || this.$route.params.id
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
        navBoard,
        draggable
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
