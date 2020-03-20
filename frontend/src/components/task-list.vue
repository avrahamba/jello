<template>
<section class="task-list">
    <h2>
        {{taskListData.title}}
    </h2>
    <div class="list-items">
        <task-preview v-for="task in taskListData.tasks" :task="task" :key="task.id"></task-preview>
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
/* eslint-disable */
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
    methods: {
        changeAddTaskMode() {
            this.addTaskMode = !this.addTaskMode
        },
        createTask() {
            this.addTaskMode = false
            this.$store.dispatch({ type: 'addTask', taskListId: this.taskListData.id, newTask: this.newTask })
                .then(() =>  this.newTask.title = '')
        }
    },
    components: {
        taskPreview
    }
}
</script>

<style>
</style>
