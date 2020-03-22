<template>
<section class="massage-write">
    <div class="avatar">
        <img v-if="user.avatar&&user.avatar.includes('.com')" :src="user.avatar" />
        <span v-else>{{user.name|short-name}}</span>
    </div>
    <textarea  cols="30" rows="10"></textarea>
</section>
</template>

<script>
export default {
    props: {
        user: Object
    },
    data() {
        return {
            msg: {
                user: null,
                txt: '',

            }
        }
    },
    created() {
        this.msg.user = {
            _id: this.user._id,
            name: this.user.name,
            avatar: this.user.avatar
        }
    },
}
</script>

<style>
.massage-write{
display: flex;
}
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
