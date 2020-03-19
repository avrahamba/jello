<template>
<section class="task-list">
    <h2>
        {{taskListData.title}}
    </h2>
    <div class="list-items">
        <task-preview v-for="task in taskListData.tasks" :task="task" :key="task.id"></task-preview>
        <button class="add-card-btn btn">Add a card</button>
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
    created() {

    },
    components: {
        taskPreview
    }
}
</script>

<style>
</style>
