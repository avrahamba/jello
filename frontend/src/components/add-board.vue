<template>
<section ref="container" class="add-board">
    <h2>New Board</h2>
    <h3 v-if="!checkImg">Title</h3>
    <input v-if="!checkImg" type="text" placeholder="Title" v-model="prefsObj.title" />
    <h3 v-if="!checkImg">Choose propertis</h3>
    <div v-if="!checkImg" class="input-container">
        <input class="input-color" @change="isColor = true" type="color" v-model="color" />
        <div @click="openSetBoard = !openSetBoard" class="color" :style="{ 'background-color':color}">
            <input type="checkbox" v-model="isColor">
            Color
        </div>
        <div v-if="openSetBoard" class="colors">
            <div @click="setColor(idx)" :style="{'background-color':colorSet.color}" class="color-set" v-for="(colorSet,idx) in colorsSet" :key="colorSet.name"></div>
        </div>
    </div>
    <div v-if="!checkImg" class="input-container">
        <div @click="checkImg = true" class="img">
            <input type="checkbox" v-model="isImg">
            Image
        <img v-if="imgSelect" :src="imgSelect" alt="">
        </div>
    </div>
    <div v-else class="modal-img">
        <img @click="setImg(idx)" v-for="(img,idx) in imgSet" :key="img.name" :src="img.url" alt="">
    </div>
    <label v-if="!checkImg" class="input-container public-checkbox">
        <input type="checkbox" v-model="prefsObj.public">
        <span>Public</span>
    </label>
    <button v-if="!checkImg" class="send" @click="addNewBoard">Add!</button>
</section>
</template>

<script>
import { imgService } from "../../src/services/img.service.js";
export default {
    props: {
        public: Boolean
    },
    created() {
        this.prefsObj.public = this.public
    },
    data() {
        return {
            prefsObj: {
                title: 'Title',
                style: { background: '#dcd6f7' },
                public: true
            },
            color: '#dcd6f7',
            imgSrc: '',
            isColor: true,
            openSetBoard: false,
            colorsSet: [
                { color: '#dcd6f7', name: 'set1' },
                { color: '#e9e2d0', name: 'set2' },
                { color: '#effcef', name: 'set3' },
                { color: '#a8c9ff', name: 'set4' },
            ],
            colorIdx: 0,
            imgSet: [
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2d3a331441afc0550fef924ec37670fa/photo-1585337931905-5289c506a080', name: 'img1' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2dc5bf888fb690cbd7e827f428938bfa/photo-1585111386393-e5e23c012437', name: 'img2' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/4710b3602fafacb2a4bd92d9e337c223/photo-1585142607427-f142c1e786cb', name: 'img3' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/1222afedeef68dde78bdafccc2f67631/photo-1584799254622-b8d7d02b108f', name: 'img4' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/9a464f28f77a1d164b6c92ee281eae0f/photo-1579539511891-7ce608434fb4', name: 'img5' },
                { url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/2162adb48bdc147a5114c9d338eaaa32/photo-1584611936550-de0151567f92', name: 'img6' },
            ],
            imgIdx: 0,
            checkImg: false,
            imgSelect:''

        };
    },
    methods: {
        addNewBoard() {
            if (this.isColor) this.prefsObj.style = { background: this.colorsSet[this.colorIdx].name }
            else this.prefsObj.style = { background: this.imgSelect }
            this.$emit('addNewBoard', this.prefsObj);
        },
        addImageToPrefObj(imgUrl) {
            this.imgSrc = imgUrl;
        },
        uploadImg(event) {
            this.isColor = false
            const img = event.target.files[0];
            imgService.uploadImg(img)
                .then(res => {
                    this.addImageToPrefObj(res.url)
                });
        },
        setColor(idx) {
            this.colorIdx = idx
            this.color = this.colorsSet[idx].color
            this.openSetBoard = false
            this.isColor = false
        },
        setImg(idx) {
            this.imgIdx = idx
            this.checkImg = false
            this.isColor = false
            this.imgSelect = this.imgSet[idx].url
        }
    },
    computed: {
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
        imgService
    }
};
</script>
