<template>
<section class="board" v-if="boardData" :style="style">
    <nav-board @changeTitle="changeTitle" :boardData="boardData"></nav-board>
    <section ref="taskListsLection">
        <draggable handle=".title" class="lists-container" draggable=".task-list" v-model="boardData.taskLists" v-bind="dragOptions" @end="move">
            <task-list v-for="taskList in boardData.taskLists" :key="taskList.id" :task-list-data="taskList"></task-list>
            <button class="add-list-btn btn" @click="createList">Add a list</button>
        </draggable>
    </section>
    <router-view></router-view>
</section>
</template>

<script>
import draggable from "vuedraggable";
import taskList from "../components/task-list.vue";
import navBoard from "../components/nav-board.vue";
import { socketService } from '../services/SocketService.js';
export default {
    created() {
        const boardId = this.boardId || this.$route.params.id;

        this.$store.dispatch({ type: "getBoard", boardId })
            .then(board => {
                if (board.failed) {
                    this.$router.push("/");
                    return;
                }
                return board
            }).then(board => {
                socketService.setup();
                socketService.emit('connect-to-board', board._id)

                socketService.on('change-data', (data) => {
                    this.$store.dispatch({ type: 'dataFromSocket', data })
                })
            })

    },
    destroyed() {
        socketService.terminate()
    },
    methods: {
        createList() {
            this.$store
                .dispatch({
                    type: "addList"
                })
                .then(res => {

                });
        },
        move({ oldIndex, newIndex }) {
            this.$store.dispatch({ type: 'moveList', oldIndex, newIndex })
        },
        changeTitle(title) {
            this.$store.dispatch({ type: 'changeTitleBoard', title })
        }
    },
    computed: {
        boardData() {
            return this.$store.getters.board
        },
        style() {
            if (
                this.boardData.style.background &&
                !this.boardData.style.background.includes("http")
            )
                return {
                    boardData: null
                };
        },
        dragOptions() {
            return {
                animation: "200",
                ghostClass: "ghost",
                group: "task-list"
            };
        }
    },
    components: {
        taskList,
        navBoard,
        draggable
    }
};
</script>

<style>
</style>
