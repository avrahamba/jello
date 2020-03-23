<template>
<section class="checklist-list">
    <draggable v-model="checklistsToSave" v-bind="dragOptions" @end="save" handle="h3">
        <checklist-preview v-for="(checklist, idx) in checklistsToSave" :key="checklist.id" :checklist="checklist" :boardId="boardId" @move="save" @chengeChecklist="chengeChecklist(idx,$event )"></checklist-preview>
    </draggable>
</section>
</template>

<script>
import draggable from "vuedraggable";
import checklistPreview from './checklist-preview.vue';
export default {
    props: {
        checklists: Array,
        boardId: String
    },
    data() {
        return {
            checklistsToSave: null
        }
    },
    created() {
        this.checklistsToSave = JSON.parse(JSON.stringify(this.checklists))
    },
    methods: {
        save() {
            this.$emit('save', this.checklistsToSave)
        },
        chengeChecklist(idx, checklist) {
            this.checklistsToSave.splice(idx, 1, checklist)
            this.save()
        }
    },
    watch: {
        checklists: {
            deep: true,
            handler() {
                this.checklistsToSave = JSON.parse(JSON.stringify(this.checklists))
            }
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: "200",
                ghostClass: "ghost",
                group: "task-list"
            };
        }
    },
    components: {
        checklistPreview,
        draggable
    }
}
</script>

<style>

</style>
