<template>
<section class="board" v-if="boardData" :style="style">

    <!-- Lists container -->
    <section class="lists-container">
        <task-list v-for="taskList in boardData.taskLists" :key="taskList.id" :task-list-data="taskList">
        </task-list>

        <button class="add-list-btn btn">Add a list</button>

    </section>
    <!-- End of lists container -->

    <h1>{{boardData.title}}</h1>

</section>
</template>

<script>
import taskList from '../components/task-list.vue'
import board from './board.json';
export default {
    data() {
        return {
            boardData: null
        }
    },
    created() {
        const id = this.$route.params.id
        this.boardData = board
    },
    components: {
        taskList
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
