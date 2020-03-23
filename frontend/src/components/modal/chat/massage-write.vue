<template>
<section class="massage-write" :class="active">
    <div class="avatar">
        <img v-if="user.avatar&&user.avatar.includes('.com')" :src="user.avatar" />
        <span v-else>{{user.name|short-name}}</span>
    </div>
    <form @submit.prevent="send">
        <div class="comment-frame">
            <div class="comment-box">
                <textarea v-model="msg.txt" @focus="startWrite" @blur="blur" :style="!isActive?{cursor: 'pointer'}:''" placeholder="Write a comment..."></textarea>
                <button v-if="isActive" class="btn" :style="!msg.txt?{cursor: 'not-allowed'}:''">Save</button>
            </div>
        </div>
    </form>
</section>
</template>

<script>
export default {
    props: {
        user: Object,
        editMsg: Object
    },
    data() {
        return {
            msg: {
                user: null,
                txt: '',
            },
            isActive: false
        }
    },
    methods: {
        startWrite() {
            this.isActive = true
        },
        send() {
            this.msg.createdAt = (this.editMsg) ? this.editMsg.createdAt : Date.now()
            this.$emit('new-msg', this.msg)
            this.isActive = false
            this.msg.txt = ''
        },
        blur() {
            if (!this.msg.txt) this.isActive = false
        }
    },
    created() {
        this.msg.user = {
            _id: this.user._id,
            name: this.user.name,
            avatar: this.user.avatar
        }
        if (this.editMsg) this.msg.txt = this.editMsg.txt
    },
    computed: {
        active() {
            if (this.isActive) return { 'in-focuse': true }
            return ''
        }
    },
}
</script>

<style>
/* {
    "txt": "txt",
    "creatAt": 4535345345,
    "user": {
        "_id": "",
        "name": "",
        "avatar": "/cloudinary/"
    }
} */
</style>
