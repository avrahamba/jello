<template>
<section class="check-preview">
    <label class="check">
        <input v-model="isDone" @change="check" type="checkbox" />
    </label>
    <div class="input-text" v-if="editTxt">
        <input ref="inputText" @keydown.enter="saveTxt" @keydown.esc="cancelChangeTxt" placeholder="Enter text..." v-model="txtToSave" type="text" />
        <div class="btns">
            <button @click="saveTxt">
                <i class="far fa-save"></i>
            </button>
            <button class="x" @click="cancelChangeTxt">&times;</button>
        </div>
    </div>
    <div v-else class="text" @click="startChangeTxt">{{checkItem.txt}}</div>
</section>
</template>

<script>
export default {
    props: {
        checkItem: Object
    },
    data() {
        return {
            isDone: false,
            editTxt: false,
            txtToSave: ""
        };
    },
    created() {
        this.isDone = this.checkItem.isDone;
    },
    methods: {
        startChangeTxt() {
            // this.$emit("click");
            this.txtToSave = this.checkItem.txt
            this.editTxt = true
            setTimeout(() => {
                this.$refs.inputText.focus()
            }, 0)
        },
        check() {
            this.$emit("check", this.isDone);
        },
        saveTxt() {
            if (this.txtToSave) {
                this.$emit('saveTxt', this.txtToSave)
                this.editTxt = false
            }
        },
        cancelChangeTxt() {
            this.txtToSave = ''
            this.editTxt = false

        }
    }
};
</script>

<style>
</style>
