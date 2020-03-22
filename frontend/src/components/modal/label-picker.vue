<template>
<section ref="container" class="label-picker">
    <h3>Labels</h3>
    <div v-for="(label,idx) in labels" :key="label.id">
        <div class="lable" @click="set(label)" :style="{'background-color':label.color}">
            <div>
                {{label.name}}
            </div>
            <div>{{isActiveMap[idx]}}</div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    props: {
        value: Array
    },

    data() {
        return {
            labels: [
                { name: "New Feature", color: "#409eff", inEdit: false, isActive: true, id: 0 },
                { name: "User stories", color: "#67c23a", inEdit: false, isActive: true, id: 1 },
                { name: "Task", color: "#909399", inEdit: false, isActive: true, id: 2 },
                { name: "Issue", color: "#e6a23c", inEdit: false, isActive: true, id: 3 },
                { name: "Bug", color: "#f56c6c", inEdit: false, isActive: true, id: 4 }
            ]

        }
    },
    created() {
        setTimeout(() => { this.$refs.container.focus() }, 0)

    },
    methods: {
        set(label) {
            const labels = (this.labelsActive) ? JSON.parse(JSON.stringify(this.labelsActive)) : []
            const idx = this.labelsActive.findIndex(currLabel => currLabel.id === label.id);
            if (idx === -1) {
                labels.push(label)
            } else {
                labels.splice(idx, 1)
            }
            this.$emit('input', labels)
        },
    },
    computed: {
        labelsActive() { return this.value },
        isActiveMap() {
            const res = this.labels.map(label => this.labelsActive.findIndex(labelActive => labelActive.id === label.id) !== -1)
            return res.map(r=>r?'V':'')
        }
    },

};
</script>
