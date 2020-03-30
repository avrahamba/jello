<template>
<main :style="style" class="board" v-if="boardData">
    <nav-board @changeTitle="changeTitle" :boardData="boardData"></nav-board>
    <div class="lists-canvas">
        <draggable handle=".title" tag="section" ref="taskListsLection" class="lists-container" draggable=".unit-task-list-container" ghost-class="ghost" v-model="boardData.taskLists" v-bind="dragOptions" @end="move">
            <div class="unit-task-list-container" v-for="taskList in boardData.taskLists" :key="taskList.id">
                <task-list :task-list-data="taskList"></task-list>
            </div>
            <button class="add-list-btn btn" @click="createList">Add a list</button>
        </draggable>
    </div>
    <router-view></router-view>
</main>
</template>

<script>
import draggable from "vuedraggable";
import taskList from "../components/task-list.vue";
import navBoard from "../components/nav-board.vue";
import { socketService } from "../services/SocketService.js";
import { playDragScroll } from '../services/drag.scroll.service.js';
export default {
    created() {
        this.getBoard()
    },
    destroyed() {
        socketService.terminate();
    },
    data() {
        return {
            style: null
        }
    },
    methods: {
        getBoard() {
            const boardId = this.boardId || this.$route.params.id;
            this.$store
                .dispatch({ type: "getBoard", boardId })
                .then(board => {
                    if (board.failed) {
                        this.$router.push("/");
                        return;
                    }
                    return board;
                })
                .then(board => {
                    socketService.setup();
                    socketService.emit("connect-to-board", board._id);
                    //!!!!
                    socketService.on("change-data", data => {
                        this.$store.dispatch({ type: "dataFromSocket", data });
                    })
                })
                .then(() => this.setStyle())
                .then(() => playDragScroll(this.$refs.taskListsLection.$el))
                .then(() => this.$store.dispatch({ type: "getBoards", userId: this.$store.getters.loggedinUser._id }))

        },
        createList() {
            this.$store
                .dispatch({
                    type: "addList"
                })
                .then(res => {});
        },
        move({ oldIndex, newIndex }) {
            this.$store.dispatch({ type: "moveList", oldIndex, newIndex });
        },
        changeTitle(title) {
            this.$store.dispatch({ type: "changeTitleBoard", title });
        },
        setStyle() {
            const htmlClassList = document.body.parentElement.classList;
            htmlClassList.remove('set1')
            htmlClassList.remove('set2')
            htmlClassList.remove('set3')
            htmlClassList.remove('set4')
            htmlClassList.remove('set5')
            htmlClassList.remove('set6')
            this.style = null
            if (this.$store.getters.board.style.background.includes('http')) {
                if(this.$store.getters.board.style.background==='https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/4710b3602fafacb2a4bd92d9e337c223/photo-1585142607427-f142c1e786cb'){
                htmlClassList.add('set4')
                }
                if(this.$store.getters.board.style.background==='https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2d3a331441afc0550fef924ec37670fa/photo-1585337931905-5289c506a080'){
                htmlClassList.add('set4')
                }
                this.style = {
                    'background-image': `url("${this.$store.getters.board.style.background}")`
                }
            } else {
                htmlClassList.add(this.$store.getters.board.style.background)
            }

        }
    },
    computed: {
        boardData() {
            return this.$store.getters.board;
        },
        dragOptions() {
            return {
                animation: "200",
                group: "task-list"
            };
        },
    },
    watch: {
        '$route'(to, from) {
            this.getBoard()
        },
        '$store.getters.board.style.background'() {
            this.setStyle()
        }
    },
    components: {
        taskList,
        navBoard,
        draggable
    },
};
</script>

<style>
.board {
    background-repeat: no-repeat;
    background-size: 100%;
    background-attachment: fixed;

}
</style>
