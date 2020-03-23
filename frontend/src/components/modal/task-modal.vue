<template>
  <section class="task-modal">
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="closeModal">
          <div class="modal" v-if="currTask">
            <div class="cover-area" v-if="taskToSave.cover">
              <cover-preview :cover="taskToSave.cover"></cover-preview>
            </div>
            <div class="title-area">
              <input
                class="task-title"
                type="text"
                @blur="saveTitle"
                @keydown="keydownTitle"
                placeholder="Title"
                v-model="taskToSave.title"
              />
              <br />in list
              <a href="#">{{listName}}</a>
            </div>
            <div class="detail-area">
              <div class="date-area" v-if="currTask">
                <date-picker
                  v-if="currTask.dueDate.length||addDateMode"
                  v-model="taskToSave.dueDate"
                  @input="save"
                ></date-picker>
              </div>
              <div class="members-labels-contaner">
                <show-members v-if="taskToSave.members.length" :members="taskToSave.members"></show-members>
                <label-preview
                  v-if="taskToSave.labels.length"
                  @input="save"
                  v-model="taskToSave.labels"
                ></label-preview>
              </div>

              <h3>Description</h3>
              <textarea
                v-if="editDesc"
                ref="descriptionTextarea"
                placeholder="Add a more detailed description…"
                v-model="taskToSave.desc"
                @blur="saveDesc"
                cols="30"
                rows="10"
              ></textarea>
              <p @click="startEditDesc" v-else>{{descToView}}</p>

              <checklist-list
                v-if="taskToSave.checklists"
                :boardId="boardId"
                :checklists="taskToSave.checklists"
                @save="saveCheckList"
              ></checklist-list>

              <file-picker v-model="taskToSave.attachments" @input="save"></file-picker>

              <activity-chat :user="loggedinUser" :massages="taskToSave.msgs" @save="saveMsgs"></activity-chat>
              <!-- <pre>{{taskToSave}}</pre> -->
            </div>
            <div class="add-area">
              <div>
                <button v-if="!isJoin" @click="join">Join</button>
              </div>
              <h3>ADD TO CARD</h3>
              <div>
                <button>Members</button>
              </div>
              <div class="edit-labels-container">
                <button @click="addLabelMode =! addLabelMode">Labels</button>
                <template v-if="addLabelMode">
                  <window-overlay :dark="false" @close="addLabelMode=false"></window-overlay>
                  <label-picker @input="save" v-model="taskToSave.labels"></label-picker>
                </template>
              </div>
              <div class="add-chacklist-container">
                <button @click="addCheckListMode = !addCheckListMode">Checklist</button>
                <template v-if="addCheckListMode">
                  <window-overlay :dark="false" @close="addCheckListMode = false"></window-overlay>
                  <add-checklist @close="addCheckListMode = false" @add="addChecklist"></add-checklist>
                </template>
              </div>
              <div>
                <button @click="addDateMode=!addDateMode">Due Date</button>
              </div>
              <div>
                <button>Attachment</button>
              </div>
              <div>
                <div class="edit-cover-container">
                  <button @click="isCoverMode = !isCoverMode">Cover</button>
                  <template v-if="isCoverMode">
                    <window-overlay :dark="false" @close="isCoverMode=false"></window-overlay>
                    <cover-picker
                      @input="save"
                      v-model="taskToSave.cover"
                      :covers="taskToSave.attachments"
                    ></cover-picker>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { utilsServie } from "../../services/utils.service.js";
import datePicker from "./date-picker.vue";
import showMembers from "./show-members.vue";
import labelPicker from "./label-picker.vue";
import labelPreview from "./label-preview.vue";
import filePicker from "./file-picker.vue";
import coverPreview from "./cover-preview.vue";
import coverPicker from "./cover-picker.vue";
import windowOverlay from "../window-overlay.vue";
import activityChat from "./chat/activity-chat.vue";
import addChecklist from "./checklist/add-checklist.vue";
import checklistList from "./checklist/checklist-list.vue";
export default {
  props: {
    boardId: String,
    currTask: Object
  },
  data: function() {
    return {
      isOpen: false,
      taskToSave: null,
      editDesc: false,
      addLabelMode: false,
      addDateMode: false,
      addCheckListMode: false,
      isCoverMode: false
    };
  },

  created() {
    this.isOpen = true;
    this.taskToSave = JSON.parse(JSON.stringify(this.currTask));
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$router.push("/" + this.boardId);
    },
    save() {
      this.$emit("save", JSON.parse(JSON.stringify(this.taskToSave)));
    },
    saveTitle() {
      if (this.currTask.title) this.save();
    },
    startEditDesc() {
      this.editDesc = true;
      setTimeout(() => {
        const el = this.$refs.descriptionTextarea;
        el.focus();
      }, 0);
    },
    saveDesc() {
      this.save();
      this.editDesc = false;
    },
    keydownTitle(ev) {
      if (ev.key === "Enter") {
        if (this.currTask.title) this.save();
        ev.target.blur();
      }
    },
    join() {
      const user = this.$store.getters.loggedinUser;
      this.taskToSave.members.push({
        id: user._id,
        name: user.name,
        avatar: user.avatar
      });
      this.save();
    },
    setLabel(label) {
      const idx = this.taskToSave.labels.findIndex(
        currLabel => currLabel.id === label.id
      );
      if (idx === -1) {
        this.taskToSave.labels.push(label);
      } else {
        this.taskToSave.labels.splice(idx, 1);
      }
      this.save();
    },
    saveMsgs(msgs) {
      this.taskToSave.msgs = msgs;
      this.save();
    },
    addChecklist(title) {
      const checklist = {
        id: this.boardId + "-" + utilsServie.makeId(),
        title,
        checkItems: []
      };
      this.taskToSave.checklists.push(checklist);
      this.addCheckListMode = false;
      this.save();
    },
    saveCheckList(checklists) {
      this.taskToSave.checklists = checklists;
      this.save();
    }
  },
  computed: {
    listName() {
      return this.$store.getters.currList.title;
    },
    descToView() {
      if (this.taskToSave.desc) return this.taskToSave.desc;
      return "Add a more detailed description…";
    },
    isJoin() {
      return !!this.taskToSave.members.find(
        user => user.id === this.$store.getters.loggedinUser._id
      );
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
    // isCover() {
    //   // return this.taskToSave.attachments.length < 1 ? this.taskToSave.cover = {} :
    // }
  },
  components: {
    labelPicker,
    showMembers,
    datePicker,
    labelPreview,
    windowOverlay,
    filePicker,
    activityChat,
    addChecklist,
    checklistList,
    coverPreview,
    coverPicker
  }
};
</script>

<style scoped>
</style>
