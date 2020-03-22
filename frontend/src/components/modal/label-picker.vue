<template>
<section ref="container" class="label-picker">
    <div v-for="label in labels" :key="label.id">
        <el-tag :type="label.type" effect="dark" @click="set(label)">
            {{label.name}}</el-tag>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            labels: [
                { name: "New Feature", color: "#409eff",inEdit:false, isActive: true, id: 0 },
                { name: "User stories", color: "#67c23a",inEdit:false, isActive: true, id: 1 },
                { name: "Task", color: "#909399",inEdit:false, isActive: true, id: 2 },
                { name: "Issue", color: "#e6a23c",inEdit:false, isActive: true, id: 3 },
                { name: "Bug", color: "#f56c6c", inEdit:false,isActive: true, id: 4 }
            ]

        }
    },
    created() {
        setTimeout(()=>{this.$refs.container.focus()},0)
        
    },
    methods: {
      set(label){
        this.$emit('set',label)
      },
      close(){
          console.log('object');
          this.$emit('close')
      }
    },
};
</script>
