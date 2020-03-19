<template>
  <section class="board" v-if="boardData">
      <task-list
      v-for="taskList in boardData.taskLists"
      :key="taskList.id"
      :task-list-data="taskList">
      </task-list>
  </section>
</template>

<script>
/* eslint-disable */
import taskList from '../components/task-list.vue'
import board from './board.json';
export default {
  data () {
    return {
      boardData: null
    }
  },
  created () {
    const id = this.$route.params.id
    this.boardData = board
  },
  components: {
    taskList
  }
}
</script>

<style>
</style>
