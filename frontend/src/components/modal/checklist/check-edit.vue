<template>
<section class="ceck-edit">
    <textarea placeholder="Add ad item" v-model="txt"></textarea>
    <button @click="add">{{txtBtn}}</button>
    <button @click="close">&times;</button>

</section>
</template>

<script>
export default {
    props:{
        checkItemTxt:{type:String, default:''}
    },
    created() {
        if(this.checkItemTxt)this.txt = this.checkItemTxt
    },
    data() {
        return {
            txt: ''
        }
    },
    methods: {
        add() {
            if(this.txt||this.checkItemTxt)
            this.$emit('add', this.txt)
        },
        close() {
            this.txt = ''
            this.$emit('close')
        }
    },
computed: {
    txtBtn(){
        if(this.checkItemTxt) return 'Save'
        return 'Add'
    }
},
}
</script>

<style>

</style>
