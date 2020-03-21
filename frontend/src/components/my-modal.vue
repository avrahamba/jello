<template>
  <section class="modal-container">
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="closeModal">
          <div class="modal">
            <tag-picker></tag-picker>
            <date-picker></date-picker>
            <show-members></show-members>
          </div>
        </div>
      </div>
    </transition>
    <button @click="isOpen = !isOpen;">{{ isOpen ? "Close" : "Open" }} modal</button>
  </section>
</template>

<script>
import datePicker from "./date-picker.vue";
import showMembers from "./show-members.vue";
import tagPicker from "./tag-picker.vue";
export default {
  data: function() {
    return {
      isOpen: false
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$router.push("/" + this.boardId);
    }
  },
  props: {
    boardId: String,
    currTask: Object
  },
  created() {
    this.isOpen = true;
  },
  components: {
    tagPicker,
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