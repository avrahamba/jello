<template>
  <section class="task-list">
        <h2>
            {{taskListData.title}}
        </h2>
      <task-preview v-for="task in taskListData.tasks" :task="task" :key="task.id"></task-preview>
  </section>
</template>

<script>
/* eslint-disable */
import taskPreview from './task-preview.vue'
export default {
    props:{
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
