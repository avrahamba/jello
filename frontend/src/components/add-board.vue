<template>
  <section ref="container" class="mini-modal">
    <h3>New Board</h3>
    <h4>Title</h4>
    <input type="text" placeholder="title" v-model="prefsObj.title" />
    <h4>Choose color or Background</h4>
    <input type="color" v-model="prefsObj.style.background" />
    <button @click="openFile">
      <i class="fas fa-file-image"></i>
      <input type="file" @change="uploadImg" ref="fileInput" accept="image/*" hidden />
    </button>
    <!-- upload pic -->
    <button @click="addNewBoard">Add!</button>
  </section>
</template>

<script>
import { imgService } from "../../src/services/img.service.js";
export default {
  data() {
    return {
      prefsObj: {
        title: "choose title",
        style: { background: "#FFFFF" },
        public: true
      }
    };
  },
  created() {},
  methods: {
    addNewBoard() {
      this.$emit("addNewBoard", this.prefsObj);
    },
    addImageToPrefObj(imageToSave){
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
