<template>
<section ref="container" class="add-board">
    <h2>New Board</h2>
    <h3>Title</h3>
    <input type="text" placeholder="Title" v-model="prefsObj.title" />
    <h3>Choose color or Background</h3>
    <div class="inp">

    <input class="color" type="color" v-model="prefsObj.style.background" />
    <button class="add-img" @click="openFile">
        <i class="fas fa-file-image"></i>
        <input type="file" @change="uploadImg" ref="fileInput" accept="image/*" hidden />
    </button>
    </div>
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
                style: { background: "#FFFFF" },
                public: true
            }
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
    components: {
        imgService
    }
};
</script>
