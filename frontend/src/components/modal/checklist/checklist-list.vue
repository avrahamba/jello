<template>
<section class="checklist-list">
    <draggable v-if="checklistsToSave" v-model="checklistsToSave" v-bind="dragOptions" @end="move">
        <checklist-preview v-for="checklist in checklistsToSave" :key="checklist.id" :checklist="checklist"></checklist-preview>
    </draggable>
</section>
</template>

<script>
import draggable from "vuedraggable";
import checklistPreview from './checklist-preview.vue';
export default {
    props: {
        checklists: Array
    },
    data() {
        return {
            checklistsToSave:null
        }
    },
    created() {
        this.checklistsToSave = JSON.parse(JSON.stringify(this.checklists)) 
    },
    methods: {
        move(){
            this.$emit('save',this.checklistsToSave)
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
