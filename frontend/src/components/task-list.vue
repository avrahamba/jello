<template>
  <section class="task-list">
    <h2>{{taskListData.title}}</h2>
    <div class="list-items">
      <draggable v-model="tasks" v-bind="dragOptions" @end="endMove">
        <transition-group
          type="transition"
          tag="div"
          :data-id="taskListData.id"
          :name="taskListData.id"
        >
          <task-preview v-for="task in tasks" :task="task" :key="task.id"></task-preview>
        </transition-group>
      </draggable>

      <div v-if="addTaskMode" class="add-task-aria">
        <div>
          <input type="text" v-model="newTask.title" />
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
import draggable from "vuedraggable";
import taskPreview from "./task-preview.vue";
export default {
  props: {
    taskListData: Object
  },
  data() {
    return {
      addTaskMode: false,
      newTask: {
        title: ""
      }
    };
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
        animation: 0,
        ghostClass: "ghost",
        group: "task-list-items"
      };
    }
  },
  methods: {
    changeAddTaskMode() {
      this.addTaskMode = !this.addTaskMode;
    },
    endMove({ oldIndex, newIndex, from, to }) {
      const idMoveFrom = from.dataset.id;
      const idMoveTo = to.dataset.id;

      console.log("idMoveFrom :", idMoveFrom);
      console.log("idMoveTo :", idMoveTo);
      console.log("oldIndex :", oldIndex);
      console.log("newIndex :", newIndex);
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
    }
  },
  components: {
    taskPreview,
    draggable
  }
};
</script>

<style>
</style>
