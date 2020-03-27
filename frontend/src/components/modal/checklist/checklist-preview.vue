<template>
  <section class="checklist-preview">
    <div class="icon-container">
      <i class="fas fa-tasks"></i>
      <div class="checklist-title">
        <input ref="inputTitle" @keydown.enter="saveTitle" @blur="saveTitle" v-if="changeTitleMode" type="text" v-model="titleCopy">
        <h3 v-else @click="startChangeTitle">{{checklist.title}}</h3>
      </div>
    </div>

    <div class="progress">
      <span class="percentage">{{percentage}}%</span>
      <el-progress :percentage="percentage" :show-text="false" :color="customColor"></el-progress>
    </div>
    <draggable class="check-container" v-model="checklist.checkItems" v-bind="dragOptions" @end="endMove">
      <transition-group type="transition">
        <div
          class="check-item"
          v-for="(checkItem, idx) in checklist.checkItems"
          :key="checkItem.id"
        >
          <check-preview
            @saveTxt="saveTxt($event,idx)"
            :checkItem="checkItem"
            @check="check($event,idx)"
            @remove="remove(idx)"
          ></check-preview>
        </div>
      </transition-group>
    </draggable>
    <check-edit v-if="addItemMode" @close="addItemMode = false" @add="editCheckItem"></check-edit>
    <button class="add-item-btn" v-else @click="addItemMode = true">Add an item</button>
    <hr>
  </section>
</template>

<script>
import draggable from "vuedraggable";

import checkEdit from "./check-edit.vue";
import checkPreview from "./check-preview.vue";
import { utilsServie } from "../../../services/utils.service.js";
export default {
  props: {
    checklist: Object,
    boardId: String
  },
  created() {
    this.closeEditItemMode();
  },
  data() {
    return {
      addItemMode: false,
      editItemMode: [],
      titleCopy: '',
      changeTitleMode: false
    };
  },
  computed: {
    percentage() {
      if (!this.checklist.checkItems.length) return 0;
      const isDones = this.checklist.checkItems.map(
        checkItem => checkItem.isDone
      );
      const allCount = isDones.length;
      const donesCount = isDones.filter(isDone => isDone).length;
      const res = Math.round((donesCount / allCount) * 100);
      return res;
    },
    customColor() {
      if (this.percentage === 0) return "#000";
      if (this.percentage < 40) return "#f00";
      if (this.percentage < 60) return "#00f";
      if (this.percentage === 100) return "#0f0";
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "checklist-items"
      };
    }
  },
  methods: {
    editCheckItem(txt, getCheckItem, idx) {
      this.addItemMode = false;
      this.closeEditItemMode();
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      if (!txt && getCheckItem) {
        checklistCopy.checkItems.splice(idx, 1);
        this.$emit("chengeChecklist", checklistCopy);
        return;
      }
      const checkItem = {
        id: getCheckItem
          ? getCheckItem.id
          : this.boardId + "-" + utilsServie.makeId(),
        txt,
        isDone: getCheckItem ? getCheckItem.isDone : false
      };
      if (getCheckItem) checklistCopy.checkItems.splice(idx, 1, checkItem);
      else checklistCopy.checkItems.push(checkItem);
      this.$emit("chengeChecklist", checklistCopy);
    },
    saveTxt(txt,idx) {
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      const checkItem = checklistCopy.checkItems[idx];
      checkItem.txt = txt;
      checklistCopy.checkItems.splice(idx, 1, checkItem);
      this.$emit("chengeChecklist", checklistCopy);
    },
    closeEditItemMode() {
      this.editItemMode = this.checklist.checkItems.map(() => false);
    },
    check(check, idx) {
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      const checkItem = checklistCopy.checkItems[idx];
      checkItem.isDone = check;
      checklistCopy.checkItems.splice(idx, 1, checkItem);
      this.$emit("chengeChecklist", checklistCopy);
    },
    remove(idx){
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      checklistCopy.checkItems.splice(idx, 1);
      this.$emit("chengeChecklist", checklistCopy);
    },
    endMove() {
      this.$emit("move");
    },
    startChangeTitle(){
      this.titleCopy = this.checklist.title
      this.changeTitleMode = true
      setTimeout(()=>this.$refs.inputTitle.focus(),0)
    },
    saveTitle(){
      if(!this.titleCopy)return
      this.changeTitleMode = false
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      checklistCopy.title = this.titleCopy;
      this.$emit("chengeChecklist", checklistCopy);

    }
  },
  components: {
    checkEdit,
    checkPreview,
    draggable
  }
};
</script>

<style>
</style>
