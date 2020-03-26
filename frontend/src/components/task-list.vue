<template>
<section class="task-list" :ref="taskListData.id">
    <div class="title">
        <input placeholder="Title" v-if="editTitleMode" class="edit-title-list" type="text" v-model="copyTitle" ref="editTitle" @keydown="onKeyEditTitle" @blur="blurEditTitle">
        <template v-else>
            <h2 @click="startEditTitle">{{taskListData.title}}</h2>
            <button @click="barIsOpen = true"><i class="fa fa-ellipsis-h"></i></button>
            <template v-if="barIsOpen">
                <window-overlay :dark="false" @close="barIsOpen = false"></window-overlay>
                <div class="bar-action-list">
                    <button @click="removeList">Delete List</button>
                </div>
            </template>
        </template>
    </div>
    <div class="list-items">
        <draggable draggable=".task-preview" v-model="tasks" v-bind="dragOptions" @end="endMove">
            <transition-group type="transition" tag="div" :data-id="taskListData.id" :name="taskListData.id">
                <task-preview v-for="task in tasks" :task="task" :key="task.id"></task-preview>
            </transition-group>
        </draggable>

    </div>

    <div v-if="addTaskMode" class="add-task-aria">
        <div>
            <input ref="inputTxtAddTask" @keydown="keydownNewTask" type="text" v-model="newTask.title" />
        </div>
        <div>
            <button @click="createTask" class="create">Add Card</button>
            <button @click="changeAddTaskMode" class="close">&times;</button>
            <button>...</button>
        </div>
    </div>
    <button v-else @click="changeAddTaskMode" class="add-card-btn btn">Add a card</button>
</section>
</template>

<script>
import draggable from "vuedraggable";
import Swal from "sweetalert2";
import taskPreview from "./task-preview.vue";
import windowOverlay from './window-overlay.vue';
import { socketService } from '../services/SocketService.js';
export default {
    props: {
        taskListData: Object
    },
    data() {
        return {
            addTaskMode: false,
            newTask: {
                title: ""
            },
            editTitleMode: false,
            copyTitle: '',
            barIsOpen: false
        };
    },
    created() {

        if (this.taskListData.isNew) {
            this.startEditTitle()
            this.$store.commit('endAddList', this.taskListData)
        }
    },
    computed: {
        tasks: {
            get() {
                return this.taskListData.tasks;
            },
            set(value) {
                this.taskListData.tasks = value;
            }
        },
        dragOptions() {
            return {
                animation: "200",
                ghostClass: "ghost",
                group: "task-list-items"
            };
        }
    },
    methods: {
        changeAddTaskMode() {
            this.addTaskMode = !this.addTaskMode;
            if (this.addTaskMode) {
                setTimeout(() => { this.$refs.inputTxtAddTask.focus() }, 0)
            }
        },
        endMove({ oldIndex, newIndex, from, to }) {
            const idMoveFrom = from.dataset.id;
            const idMoveTo = to.dataset.id;
            this.$store.dispatch({ type: 'moveTask', idMoveFrom, idMoveTo, oldIndex, newIndex })
                .then(() => { socketService.emit('change board') })

        },
        keydownNewTask(ev) {
            if (ev.key === 'Enter') this.createTask()
        },
        createTask() {
            this.addTaskMode = false;
            this.$store
                .dispatch({
                    type: "addTask",
                    taskListId: this.taskListData.id,
                    newTask: this.newTask
                })
                .then(res => {
                    this.newTask.title = "";
                    socketService.emit('change board')
                });
        },
        deleteList() {
            this.addTaskMode = false;
            this.$store
                .dispatch({
                    type: "removeList",
                    listId: this.taskListData.id
                })
                .then(res => {
                    console.log("list deleted", res);
                });
        },
        startEditTitle() {
            this.editTitleMode = true
            this.copyTitle = this.taskListData.title
            setTimeout(() => {
                const elInput = this.$refs.editTitle
                elInput.focus()
            }, 0)
        },
        onKeyEditTitle(ev) {
            if (ev.key === 'Enter') {
                this.blurEditTitle()
            }
        },
        blurEditTitle() {
            this.editTitleMode = false
            this.$store.dispatch({ type: 'setListTitle', taskListId: this.taskListData.id, title: this.copyTitle })
        },
        removeList() {
            Swal.fire({
                title: `Are you sure of You won't remove the List?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$store
                        .dispatch({ type: "removeList", taskListId: this.taskListData.id })
                        .then(() => {
                            Swal.fire("Deleted!", "Your list has been deleted.", "success");
                            socketService.emit("change board");
                        });
                }
            })

        }

    },
    components: {
        taskPreview,
        draggable,
        windowOverlay
    }
};
</script>

<style>
</style>
