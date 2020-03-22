<template>
<section v-if="value" class="label-preview">
    <h3>LABEL</h3>
    <div class="labels-container">
        <div class="label" v-for="label in labels" :key="label.id" :type="label.type" :style="{'background-color':label.color}" @click="add = true">
            {{label.name}}
        </div>
        <button @click="add = true" class="add-Label">+</button>
        <template v-if="add">
            <window-overlay :dark="false" @close="add=false"></window-overlay>
            <label-picker v-model="labels"></label-picker>
        </template>
    </div>
</section>
</template>

<script>
import windowOverlay from '../window-overlay.vue';
import labelPicker from './label-picker.vue';
export default {
    props: {
        value: Array
    },
    data() {
        return {
            add: false
        }
    },
    methods: {
        handleClose(id) {
            this.labels[id].isActive = false;
        },
        close() {
            let labels = this.labels
            if (!labels) labels = []
            labels =labels.map(label=>{label.inEdit=false;return label})
            this.$emit('input', labels)
        },
    },
    computed: {
        labels: {
            get() {
                return this.value
            },
        set(newValue) {

this.$emit('input', newValue)
        }
        },
    },
    components: {
        labelPicker,
        windowOverlay
    }

}
</script>

<style>
</style>
