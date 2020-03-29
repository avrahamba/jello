<template>
<section ref="container" class="add-board">
    <h2>New Board</h2>
    <h3>Title</h3>
    <input type="text" placeholder="Title" v-model="prefsObj.title" />
    <h3>Choose propertis</h3>
    <div class="input-container">
        <input class="input-color" @change="isColor = true" type="color" v-model="color" />
        <div @click="openSetBoard = !openSetBoard" class="color" :style="{ 'background-color':color}">
            <input type="checkbox" v-model="isColor">
            Color
        </div>
        <div v-if="openSetBoard" class="colors">
            <div class="color-set">
                ss
            </div>
        </div>
    </div>
    <div class="input-container">
        <input type="file" @change="uploadImg" ref="fileInput" accept="image/*" hidden />
        <div class="img">
            <input type="checkbox" v-model="isImg">
            Image
            <img v-if="imgSrc" :src="imgSrc">
        </div>
    </div>
    <div class="input-container public-checkbox">
        <input type="checkbox" v-model="prefsObj.public">
        <span>Public</span>
    </div>
    <button class="send" @click="addNewBoard">Add!</button>
</section>
</template>

<script>
import { imgService } from "../../src/services/img.service.js";
export default {
  props:{
    public:Boolean
  },
  created() {
    this.prefsObj.public=this.public
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
            openSetBoard:false
        };
    },
    methods: {
        addNewBoard() {
            if (this.isColor) this.prefsObj.style = { background: this.color }
            else this.prefsObj.style = { background: this.imgSrc }
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
