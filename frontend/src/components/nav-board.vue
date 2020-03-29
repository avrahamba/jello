<template>
<nav class="nav-board">
    <div class="board-controls">
        <button class="board-title btn" :class="{action:editTitleMode}">
            <input ref="inputTitle" @blur="saveTitle" @keydown.enter="saveTitle" v-if="editTitleMode" type="text" :style="styleInputTitle" v-model="titleToChange">
            <h2 @click="changeTitle" v-else>{{boardData.title}}</h2>
        </button>

        <!-- <button class="star-btn btn" aria-label="Star Board">
          <i class="far fa-star" aria-hidden="true"></i>
        </button> -->
        <add-members @filter="filter" @updateBoardUsers="updateBoardUsers" :users="users" :currBoardUsers="boardData.users"></add-members>

        <div class="members">
            <avatar-user v-for="(user) in boardData.users" :key="user.id" :user="user"></avatar-user>
        </div>

    </div>
    <window-overlay v-if="menuIsOpen" :dark="false" @close="menuIsOpen = false"></window-overlay>
    <div class="menu-board">

        <div v-if="menuIsOpen" class="menu-bar">
            <label @change="setPublic" class="public">
                <input v-model="isPublic" type="checkbox">
                public
            </label>
            <label>
                <input v-model="isColor" type="checkbox">
                color
            </label>
            <label>
                <input v-model="isImg" type="checkbox">
                image
            </label>
            <div v-if="isColor" class="colors">
                <div class="color" @click="setBackground(color.name)" :style="{'background-color':color.color}" v-for="(color) in colorsSet" :key="color.name"></div>
            </div>
            <div v-else class="imgs">
                <img v-for="(img) in imgsSet" @click="setBackground(img.url)" :key="img.name" :src="img.url">
            </div>
        </div>
        <button @click="openMenu" class="menu-btn btn">
            <i class="fas fa-ellipsis-h menu-btn-icon" aria-hidden="true"></i>
            Show Menu
        </button>
    </div>
</nav>
</template>

<script>
import addMembers from "./add-members.vue";
import avatarUser from './avatar-user.vue';
import windowOverlay from './window-overlay.vue';
export default {
    props: {
        boardData: Object
    },
    data() {
        return {
            titleToChange: '',
            editTitleMode: false,
            users: [],
            menuIsOpen: false,
            colorsSet: [
                { color: '#dcd6f7', name: 'set1' },
                { color: '#e9e2d0', name: 'set2' },
                { color: '#effcef', name: 'set3' },
                { color: '#a8c9ff', name: 'set4' },
            ],
            imgsSet: [
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2d3a331441afc0550fef924ec37670fa/photo-1585337931905-5289c506a080', name: 'img1' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2dc5bf888fb690cbd7e827f428938bfa/photo-1585111386393-e5e23c012437', name: 'img2' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/4710b3602fafacb2a4bd92d9e337c223/photo-1585142607427-f142c1e786cb', name: 'img3' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/1222afedeef68dde78bdafccc2f67631/photo-1584799254622-b8d7d02b108f', name: 'img4' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/9a464f28f77a1d164b6c92ee281eae0f/photo-1579539511891-7ce608434fb4', name: 'img5' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2162adb48bdc147a5114c9d338eaaa32/photo-1584611936550-de0151567f92', name: 'img6' },
            ],
            isColor: true,
            isPublic: false

        };
    },
    created() {
        this.isColor = !this.boardData.style.background.includes('http')
        this.isPublic = this.boardData.public
    },
    methods: {
        changeTitle() {
            this.editTitleMode = true;
            this.titleToChange = this.boardData.title;
            setTimeout(() => {
                this.$refs.inputTitle.focus();
            }, 0);
        },
        saveTitle() {
            if (this.editTitleMode)
                this.$emit('changeTitle', this.titleToChange);
            this.editTitleMode = false;
        },
        filter(userFilter) {
            this.$store
                .dispatch({ type: 'loadFilter', userFilter })
                .then(users => {
                    this.getUsersFromStore()
                });
        },
        updateBoardUsers(users) {
            this.$store.dispatch({ type: 'saveUsersBoard', users }).then(res => {});
        },
        getUsersFromStore() {
            this.users = this.$store.getters.users;
        },
        openMenu() {
            this.menuIsOpen = !this.menuIsOpen
        },
        setPublic() {
            this.menuIsOpen = false
            this.$store.dispatch({ type: 'setPublic', isPublic: this.isPublic })
        },
        setBackground(newBackground) {
            this.menuIsOpen = false
            this.$store.dispatch({ type: 'setBackground', newBackground })
        }
    },
    computed: {
        styleInputTitle() {
            return {
                width: this.titleToChange.length + 'ch'
            }
        },
        isImg: {
            get() {
                return !this.isColor
            },
            set(value) {
                this.isColor = !value
            }
        },

    },
    components: {
        addMembers,
        avatarUser,
        windowOverlay
    }
};
</script>

<style>
</style>
