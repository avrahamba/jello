<template>
<section class="massage-preview">
    <div class="avatar">
        <img v-if="msg.user.avatar && msg.user.avatar.includes('.com')" :src="msg.user.avatar" />
        <span v-else>{{msg.user.name|short-name}}</span>
    </div>
    <div class="contain">
        <div class="title">
            <span class="name">{{msg.user.name}}</span>
            <span class="time">{{msg.createdAt}}</span>
        </div>
        <template v-if="!inEdit">
            <div class="text">
                <span>
                    {{msg.txt}}
                </span>
            </div>
            <div v-if="isUser" class="action">
                <a @click="inEdit = true" href="#">Edit</a> - <a @click="remove" href="#">Delete</a>
            </div>
        </template>
        <massage-write v-else :editMsg="msg" :user="user" @new-msg="saveMsg"></massage-write>
    </div>
</section>
</template>

<script>
import massageWrite from './massage-write.vue';
export default {
    props: {
        msg: Object,
        user: Object
    },
    data() {
        return {
            inEdit: false
        }
    },
    computed: {
        isUser() {
            return this.user._id === this.msg.user._id
        }
    },
    methods: {
        remove() {
            this.$emit('remove')
        },
        saveMsg(msg){
            this.inEdit = false
            this.$emit('save-msg',msg)
        }
    },
    components: {
        massageWrite
    }
}
</script>

<style>

</style>
