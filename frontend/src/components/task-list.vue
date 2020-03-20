<template>
<section class="task-list">
    <h2>
        {{taskListData.title}}
    </h2>
    <div class="list-items">
        <transition-group type="transition" :name="'flip-list'">

        <draggable v-model="tasks"  @start="drag=true" @end="drag=false">
            <task-preview v-for="task in tasks" :task="task" :key="task.id"></task-preview>
        </draggable>
        </transition-group>

        <div v-if="addTaskMode" class="add-task-aria">
            <div>
                <input type="text" v-model="newTask.title">
            </div>
            <div>
                <button @click="createTask" class="create">Add Card</button>
                <button @click="changeAddTaskMode" class="close">&times;</button>
                <button>...</button>
            </div>
        </div>
        <button v-else @click="changeAddTaskMode" class="add-card-btn btn">Add a card</button>
    </div>
</section>

</template>

<script>
import draggable from 'vuedraggable'
import taskPreview from './task-preview.vue'
export default {
    props: {
        taskListData: Object
    },
    data() {
        return {
            addTaskMode: false,
            newTask: {
                title: ''
            }
        }
    },
    computed: {
        tasks: {
            get() {
                return this.taskListData.tasks
            },
            set(value) {
                this.taskListData.tasks = value
            }
        },
        dragOptions() {
            return {
                animation: "200",
                ghostClass: "ghost",
                group: "task-list-items"
            }
        }

    },
    methods: {
        changeAddTaskMode() {
            this.addTaskMode = !this.addTaskMode
        },
        createTask() {
            this.addTaskMode = false
            this.$store.dispatch({ type: 'addTask', taskListId: this.taskListData.id, newTask: this.newTask })
                .then(() => this.newTask.title = '')
        }
    },
    components: {
        taskPreview,
        draggable
    }
}
</script>

<style>
</style>
