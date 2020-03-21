<template>
  <section class="modal-container">
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="closeModal">
          <div class="modal" v-if="currTask">
            {{currTask}}
            <label-picker v-model="taskToSave.labels"></label-picker>
            <button @click="add">+</button>
            <button @click="save">save</button>

            <date-picker v-model="taskToSave.dueDate" @input="log"></date-picker>
            <show-members></show-members>
          </div>
        </div>
      </div>
    </transition>
    <!-- <button @click="isOpen = !isOpen;">{{ isOpen ? "Close" : "Open" }} modal</button> -->
  </section>
</template>

<script>
import datePicker from "./date-picker.vue";
import showMembers from "./show-members.vue";
import labelPicker from "./label-picker.vue";
export default {
  data: function() {
    return {
      isOpen: false,
      taskToSave: null
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$router.push("/" + this.boardId);
    },
    add() {
      //TODO: think about a solution for this problem !
      this.taskToSave.labels = [
        { name: "New Feature", type: "", isActive: true, id: 0 },
        { name: "User stories", type: "success", isActive: true, id: 1 },
        { name: "Task", type: "info", isActive: true, id: 2 },
        { name: "Issue", type: "warning", isActive: true, id: 3 },
        { name: "Bug", type: "danger", isActive: true, id: 4 }
      ];
    },

    save() {
      this.$emit("save", this.taskToSave);
    },
    log() {
      console.log(this.taskToSave.dueDate);
    }
  },
  props: {
    boardId: String,
    currTask: Object
  },
  created() {
    this.isOpen = true;
    this.taskToSave = JSON.parse(JSON.stringify(this.currTask));
  },
  components: {
    labelPicker,
    showMembers,
    datePicker
  }
};
</script>

<style scoped>
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>