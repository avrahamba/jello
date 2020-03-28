<template>
<section ref="container" class="add-board">
    <h2>New Board</h2>
    <h3>Title</h3>
    <input type="text" placeholder="Title" v-model="prefsObj.title" />
    <h3>Choose propertis</h3>
    <div class="color">
      <input type="checkbox" v-model="isColor">
      Color:
      <input class="color" type="color" v-model="prefsObj.style.background" />
    </div>
    <div class="img">
      <input type="checkbox" v-model="isImg">
      Image:
      <button class="add-img" @click="openFile">
          <i class="far fa-file-image"></i>
          <input type="file" @change="uploadImg" ref="fileInput" accept="image/*" hidden />
      </button>
    </div>
    <label class="public-checkbox">
      <input type="checkbox" v-model="prefsObj.public">
      <span>Public</span>
    </label>
    <button class="send" @click="addNewBoard">Add!</button>
</section>
</template>

<script>
import { imgService } from "../../src/services/img.service.js";
export default {
    data() {
        return {
            prefsObj: {
                title: "Title",
                style: { background: "#ffffff" },
                public: true
            },
            isColor:true
        };
    },
    methods: {
        addNewBoard() {
            this.$emit("addNewBoard", this.prefsObj);
        },
        addImageToPrefObj(imageToSave) {
            this.prefsObj.style.background = imageToSave.url;
        },
        openFile() {
            this.$refs.fileInput.click();
        },
        uploadImg(event) {
            const images = event.target.files;
            images.forEach(image => {
                imgService.uploadImg(image).then(res => {
                    let imageToSave = {
                        width: res.width,
                        height: res.height,
                        format: res.format,
                        created: res.created_at,
                        url: res.url,
                        fileName: res.original_filename
                    };
                    this.addImageToPrefObj(imageToSave)
                });
            });
        }
    },
    computed: {
      isImg: {
        get(){
          return !this.isColor
        },
        set(value){
          this.isColor = !value
        }
      }
    },
    components: {
        imgService
    }
};
</script>
