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
              <div class="icon-container">
                <i class="far fa-caret-square-up"></i>

                <input
                  class="task-title"
                  type="textarea"
                  @blur="setTitle"
                  @keydown="keydownTitle"
                  placeholder="Title"
                  v-model="taskToSave.title"
                />
              </div>
              <div class="title-info-container">
                <span>in list</span>
                <a href="#" class="list-name-container">{{listName}}</a>
              </div>
            </div>
            <div class="detail-area">
              <div class="date-area" v-if="currTask">
                <date-picker
                  v-if="currTask.dueDate.length||addDateMode"
                  v-model="taskToSave.dueDate"
                  @input="save('setDueDate',{dueDate: taskToSave.dueDate})"
                ></date-picker>
              </div>
              <div class="members-labels-container">
                <show-members v-if="taskToSave.members.length" :members="taskToSave.members"></show-members>
                <label-preview
                  v-if="taskToSave.labels.length"
                  @input="save('setLabel',{labels: taskToSave.labels})"
                  v-model="taskToSave.labels"
                ></label-preview>
              </div>
              <div class="icon-container">
                <i class="fas fa-align-justify"></i>
                <h3>Description</h3>
              </div>

              <textarea
                v-if="editDesc"
                ref="descriptionTextarea"
                placeholder="Add a more detailed description…"
                v-model="taskToSave.desc"
                @blur="saveDesc"
                cols="30"
                rows="10"
                class="description-container"
              ></textarea>
              <p @click="startEditDesc" v-else>{{descToView}}</p>

              <checklist-list
                v-if="taskToSave.checklists"
                :boardId="boardId"
                :checklists="taskToSave.checklists"
                @save="saveCheckList"
              ></checklist-list>

              <file-picker
                v-model="taskToSave.attachments"
                @input="save('attachments',{attachments: taskToSave.attachments})"
              ></file-picker>

              <add-member-to-task
                v-if="addMemberMode"
                v-model="taskToSave.members"
                :board="board"
                @input="save('addMember',{users: taskToSave.members})"
              ></add-member-to-task>

              <activity-chat :user="loggedinUser" :massages="taskToSave.msgs" @save="saveMsgs"></activity-chat>
              <!-- <pre>{{taskToSave}}</pre> -->
            </div>
            <div class="add-area">
              <div>
                <button v-if="!isJoin" @click="join">
                  <i class="fas fa-plus"></i> Join
                </button>
              </div>
              <h3>ADD TO CARD</h3>
              <div class="add-members-container">
                <button @click="addMemberMode =! addMemberMode">
                  <i class="fas fa-users"></i> Members
                </button>
              </div>
              <div class="edit-labels-container">
                <button @click="addLabelMode =! addLabelMode">
                  <i class="fas fa-tags"></i> Labels
                </button>
                <template v-if="addLabelMode">
                  <window-overlay :dark="false" @close="addLabelMode=false"></window-overlay>
                  <label-picker
                    @input="save('setLabel',{labels: taskToSave.labels})"
                    v-model="taskToSave.labels"
                  ></label-picker>
                </template>
              </div>
              <div class="add-chacklist-container">
                <button @click="addCheckListMode = !addCheckListMode">
                  <i class="fas fa-tasks"></i> Checklist
                </button>
                <template v-if="addCheckListMode">
                  <window-overlay :dark="false" @close="addCheckListMode = false"></window-overlay>
                  <add-checklist @close="addCheckListMode = false" @add="addChecklist"></add-checklist>
                </template>
              </div>
              <div>
                <button @click="addDateMode=!addDateMode">
                  <i class="far fa-calendar-alt"></i> Due Date
                </button>
              </div>
              <div>
                <button @click="openFile">
                  <i class="far fa-file-image"></i>
                  <input
                    type="file"
                    @change="uploadImg"
                    ref="fileInput"
                    accept="image/*"
                    multiple
                    hidden
                  />
                  Attachment
                </button>
              </div>
              <div>
                <div class="edit-cover-container">
                  <button @click="isCoverMode = !isCoverMode">
                    <i class="fas fa-portrait"></i> Cover
                  </button>
                  <template v-if="isCoverMode">
                    <window-overlay :dark="false" @close="isCoverMode=false"></window-overlay>
                    <cover-picker
                      @input="save('setCover',{cover: {url:taskToSave.cover.url}})"
                      v-model="taskToSave.cover"
                      :covers="taskToSave.attachments"
                    ></cover-picker>
                  </template>
                </div>
              </div>
              <div class="remove">
                <button @click="startRemoveTask">
                  <i class="far fa-trash-alt"></i> Remove
                </button>
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
import { socketService } from "../../services/SocketService.js";
import { imgService } from "../../services/img.service.js";

import datePicker from "./date-picker.vue";
import showMembers from "./show-members.vue";
import labelPicker from "./label-picker.vue";
import labelPreview from "./label-preview.vue";
import filePicker from "./file-picker.vue";
import addMemberToTask from "./add-members-to-task.vue";
import coverPreview from "./cover-preview.vue";
import coverPicker from "./cover-picker.vue";
import windowOverlay from "../window-overlay.vue";
import activityChat from "./chat/activity-chat.vue";
import addChecklist from "./checklist/add-checklist.vue";
import checklistList from "./checklist/checklist-list.vue";
import Swal from "sweetalert2";
export default {
  props: {
    boardId: String,
    currTask: Object
  },
  data() {
    return {
      isOpen: false,
      taskToSave: null,
      editDesc: false,
      addLabelMode: false,
      addMemberMode: false,
      addDateMode: false,
      addCheckListMode: false,
      isCoverMode: false,
      board: {}
    };
  },

  created() {
    this.isOpen = true;
    this.taskToSave = JSON.parse(JSON.stringify(this.currTask));
    this.board = this.$store.getters.board;
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$router.push("/" + this.boardId);
    },
    save(type, obj) {
      this.$emit("save", { type, taskId: this.taskToSave.id, ...obj });
    },
    setTitle() {
      if (this.currTask.title)
        this.save("setTitle", { title: this.taskToSave.title });
    },
    startEditDesc() {
      this.editDesc = true;
      setTimeout(() => {
        const el = this.$refs.descriptionTextarea;
        el.focus();
      }, 0);
    },
    saveDesc() {
      this.save("editDesc", { desc: this.taskToSave.desc });
      this.editDesc = false;
    },
    keydownTitle(ev) {
      if (ev.key === "Enter") {
        if (this.currTask.title)
          this.save("setTitle", { title: this.taskToSave.title });
        ev.target.blur();
      }
    },
    openFile() {
      this.$refs.fileInput.click();
    },
    uploadImg(event) {
      const images = event.target.files;
      images.forEach(image => {
        imgService.uploadImg(image).then(res => {
          let imageToSave = {
            width: res.width,
            height: res.height,
            format: res.format,
            created: res.created_at,
            url: res.url,
            fileName: res.original_filename
          };
          this.taskToSave.attachments.push(imageToSave);

          this.save("attachments", {
            attachments: this.taskToSave.attachments
          });
        });
      });
    },
    join() {
      const user = this.$store.getters.loggedinUser;
      this.taskToSave.members.push({
        id: user._id,
        name: user.name,
        avatar: user.avatar
      });
      this.save("addMember", { user });
    },
    saveMsgs(msgs) {
      this.taskToSave.msgs = msgs;
      this.save("setMsgs", { msgs });
    },
    addChecklist(title) {
      const checklist = {
        id: this.boardId + "-" + utilsServie.makeId(),
        title,
        checkItems: []
      };
      this.taskToSave.checklists.push(checklist);
      this.addCheckListMode = false;
      this.save("setChecklists", { checklists: this.taskToSave.checklists });
    },
    saveCheckList(checklists) {
      this.taskToSave.checklists = checklists;
      this.save("setChecklists", { checklists: this.taskToSave.checklists });
    },
    startRemoveTask() {
      Swal.fire({
        title: `Are you sure of You won't remove the Task?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch({ type: "removeTask", taskId: this.taskToSave.id })
            .then(() => {
              this.$router.push("/" + this.boardId);
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
              socketService.emit("change board");
            });
        }
      });
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
    },
    isCover() {
      // return this.taskToSave.attachments.length < 1 ? this.taskToSave.cover = {} :
    }
  },
  watch: {
    currTask: {
      deep: true,
      handler() {
        this.taskToSave = JSON.parse(JSON.stringify(this.currTask));
      }
    }
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
    coverPicker,
    addMemberToTask
  }
};
</script>

<style scoped>
</style>
