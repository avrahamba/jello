<template>
  <section class="board" v-if="boardData">
      <task-list v-for="taskList in boardData.taskLists" :key="taskList.id" :task-list-data="taskList">
      </task-list>
  </section>
</template>

<script>
import taskList from '../components/task-list.vue'
export default {
  data () {
    return {
      boardData: null
    }
  },
  created () {
    const id = this.$route.params.id
    
  },
  components: {
    taskList
  }
}
</script>

<style>
</style>
