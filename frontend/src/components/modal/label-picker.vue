<template>
<section class="lable-picker">
    <div v-for="label in labels" :key="label.id">
        <el-tag :type="label.type" effect="dark" @click="add(label)">
            {{label.name}}</el-tag>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            labels: [
                { name: "New Feature", type: "", isActive: true, id: 0 },
                { name: "User stories", type: "success", isActive: true, id: 1 },
                { name: "Task", type: "info", isActive: true, id: 2 },
                { name: "Issue", type: "warning", isActive: true, id: 3 },
                { name: "Bug", type: "danger", isActive: true, id: 4 }
            ]

        }
    },
    methods: {
      add(label){
        this.$emit('add',label)
      }
    },
};
</script>
