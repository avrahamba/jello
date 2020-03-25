><template>
  <section class="attachment-container">


  </section>
</template>
<script>
import { imgService } from "../../services/img.service.js";

export default {
  data() {
    return {
      fileList: this.value
    };
  },
  props: {
    value: Array
  },
  methods: {
    handleRemove(file, fileList) {
      const imgIdx = this.fileList.findIndex(
        img => img.file.uid === file.file.uid
      );
      this.fileList.splice(imgIdx, 1);
      this.$emit("input", this.fileList);
    },

   

    // const imgUrl = await cloudinaryService.uploadImg(event);
  }
};
</script>
