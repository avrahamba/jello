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
                <span>In list:</span>
                <span class="list-name-container">{{listName}}</span>
              </div>
            </div>
            <div class="detail-area">
              <div class="date-area" v-if="currTask">
                <div class="icon-container" v-if="taskToSave.dueDate">
                  <i class="fas fa-calendar-day"></i>
                  <h3>Due Date</h3>
                </div>
                <div class="date-value">{{taskToSave.dueDate}}</div>
              </div>

              <div class="icon-container" v-if="taskToSave.members.length">
                <i class="fas fa-users"></i>
                <h3>Members</h3>
              </div>
              <show-members :members="taskToSave.members" v-if="taskToSave.members.length"></show-members>

              <div class="icon-container" v-if="taskToSave.labels.length">
                <i class="fas fa-tags"></i>
                <h3>Labels</h3>
              </div>
              <label-preview
                v-if="taskToSave.labels.length"
                @input="save('setLabel',{labels: taskToSave.labels})"
                v-model="taskToSave.labels"
              ></label-preview>

              <div class="icon-container">
                <i class="fas fa-align-justify"></i>
                <h3>Description</h3>
              </div>
              <div class="desc-container" v-if="editDesc">
<!-- !!!! -->
                <textarea-autosize
                  ref="descriptionTextarea"
                  placeholder="Add a more detailed description…"
                  v-model="taskToSave.desc"
                  @blur.native="saveDesc"
                  cols="65"
                  rows="3"
                  class="description-container"
                />
                <button @click="saveDesc">Save</button>
              </div>
              <p class="description-text" @click="startEditDesc" v-else>{{descToView}}</p>

              <checklist-list
                v-if="taskToSave.checklists"
                :boardId="boardId"
                :checklists="taskToSave.checklists"
                @save="saveCheckList"
              ></checklist-list>

              <div class="icon-container" v-if="taskToSave.attachments.length">
                <i class="fas fa-file-image"></i>
                <h3>Attachments</h3>
              </div>
              <file-preview
                v-if="taskToSave.attachments.length"
                v-model="taskToSave.attachments"
                @add-attachment="openFile"
                @input="save('attachments',{attachments: taskToSave.attachments})"
              ></file-preview>

              <div class="icon-container">
                <i class="far fa-comment-dots"></i>
                <h3>Activity</h3>
              </div>
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
                <button @click="openMembers" ref="members">
                  <i class="fas fa-users"></i> Members
                </button>
              </div>
              <window-overlay v-if="addMemberMode" :dark="false" @close="addMemberMode=false"></window-overlay>
              <add-member-to-task
                :style="miniModalPosition"
                v-if="addMemberMode"
                v-model="taskToSave.members"
                :board="board"
                @input="save('addMember',{users: taskToSave.members})"
              ></add-member-to-task>
              <div class="edit-labels-container">
                <button @click="openLabels" ref="labels">
                  <i class="fas fa-tags"></i> Labels
                </button>
                <template v-if="addLabelMode">
                  <window-overlay :dark="false" @close="addLabelMode=false"></window-overlay>
                  <label-picker
                    :style="miniModalPosition"
                    @input="save('setLabel',{labels: taskToSave.labels})"
                    v-model="taskToSave.labels"
                  ></label-picker>
                </template>
              </div>
              <div class="add-chacklist-container">
                <button @click="openCheckList" ref="checkList">
                  <i class="fas fa-tasks"></i> Checklist
                </button>
                <template v-if="addCheckListMode">
                  <window-overlay :dark="false" @close="addCheckListMode = false"></window-overlay>
                  <add-checklist
                    :style="miniModalPosition"
                    @close="addCheckListMode = false"
                    @add="addChecklist"
                  ></add-checklist>
                </template>
              </div>
              <div>
                <button @click="openDueDate" ref="date">
                  <i class="fas fa-calendar-day"></i> Due Date
                </button>
              </div>
              <template v-if="addDateMode">
                <window-overlay :dark="false" @close="addDateMode = false"></window-overlay>
                <date-picker
                  :style="miniModalPosition"
                  v-if="addDateMode"
                  v-model="taskToSave.dueDate"
                  @input="save('setDueDate',{dueDate: taskToSave.dueDate})"
                ></date-picker>
              </template>
              <div>
                <button @click="openFile">
                  <i class="fas fa-file-image"></i>
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
                  <button @click="openCover" ref="cover">
                    <i class="fas fa-portrait"></i> Cover
                  </button>
                  <template v-if="isCoverMode">
                    <window-overlay :dark="false" @close="isCoverMode=false"></window-overlay>
                    <cover-picker
                      class="cover-picker"
                      :style="miniModalPosition"
                      @input="save('setCover',{cover: {url:taskToSave.cover.url}})"
                      v-model="taskToSave.cover"
                      :covers="taskToSave.attachments"
                    ></cover-picker>
                  </template>
                </div>
              </div>
              <div class="remove">
                <button @click="startRemoveTask">
                  <i class="fas fa-trash-alt"></i> Remove
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
import filePreview from "./file-preview.vue";
import addMemberToTask from "./add-member-to-task.vue";
import coverPreview from "./cover-preview.vue";
import coverPicker from "./cover-picker.vue";
import windowOverlay from "../window-overlay.vue";
import activityChat from "./chat/activity-chat.vue";
import addChecklist from "./checklist/add-checklist.vue";
import checklistList from "./checklist/checklist-list.vue";
import TextareaAutosize from "vue-textarea-autosize";
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
      board: {},
      miniModalPosition: {}
    };
  },

  created() {
    this.isOpen = true;
    this.taskToSave = JSON.parse(JSON.stringify(this.currTask));
    this.board = this.$store.getters.board;
  },
  methods: {
    openLabels() {
      this.miniModalPosition.top = `${Math.floor(
        this.$refs.labels.getClientRects()[0].top
      ) + 39}px`;
      this.miniModalPosition.left = `${Math.floor(
        this.$refs.labels.getClientRects()[0].left
      ) - 30}px`;

      this.addLabelMode = !this.addLabelMode;
    },
    openMembers() {
      this.miniModalPosition.top = `${Math.floor(
        this.$refs.members.getClientRects()[0].top
      ) + 39}px`;
      this.miniModalPosition.left = `${Math.floor(
        this.$refs.members.getClientRects()[0].left
      ) - 30}px`;
      this.addMemberMode = !this.addMemberMode;
    },
    openCheckList() {
      this.miniModalPosition.top = `${Math.floor(
        this.$refs.checkList.getClientRects()[0].top
      ) + 39}px`;
      this.miniModalPosition.left = `${Math.floor(
        this.$refs.checkList.getClientRects()[0].left
      ) - 30}px`;
      this.addCheckListMode = !this.addCheckListMode;
    },
    openCover() {
      this.miniModalPosition.top = `${Math.floor(
        this.$refs.cover.getClientRects()[0].top
      ) + 39}px`;
      this.miniModalPosition.left = `${Math.floor(
        this.$refs.cover.getClientRects()[0].left
      ) - 30}px`;
      this.isCoverMode = !this.isCoverMode;
    },
    openDueDate() {
      this.miniModalPosition.top = `${Math.floor(
        this.$refs.date.getClientRects()[0].top
      ) + 39}px`;
      this.miniModalPosition.left = `${Math.floor(
        this.$refs.date.getClientRects()[0].left
      ) - 30}px`;
      this.addDateMode = !this.addDateMode;
    },
    closeModal() {
      this.isOpen = false;
      this.$router.push("/" + this.boardId);
    },
    //!!!!
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
        this.$refs.descriptionTextarea.$el.focus();
      }, 0);
    },
    //!!!!
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
      const loggedinUser = this.$store.getters.loggedinUser;
      const users = JSON.parse(JSON.stringify(this.taskToSave.members));
      users.push({
        _id: loggedinUser._id,
        name: loggedinUser.name,
        avatar: loggedinUser.avatar
      });

      this.save("addMember", { users });
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
        user => user._id === this.$store.getters.loggedinUser._id
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
    filePreview,
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

