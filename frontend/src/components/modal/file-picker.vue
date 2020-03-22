><template>
  <section>
    <el-upload
      action
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      :on-remove="handleRemove"
      :http-request="addAttachment"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </section>
</template>
<script>
import { imgService } from "../../services/img.service.js";

export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addAttachment(file) {
      imgService.uploadImg(file).then(res => {
        file.url = res.url;
        this.fileList.push(file);
        console.log(this.fileList);
        this.$emit("input", this.fileList);
      });
    }

    // const imgUrl = await cloudinaryService.uploadImg(event);
  }
};
</script>


 "attachments": [
    {
      "headers": {},
      "withCredentials": false,
      "file": {
        "uid": 1584879130746
      },
      "filename": "file",
      "action": "",
      "url": "http://res.cloudinary.com/dy31deyp1/image/upload/v1584879130/se57sxcspxqidet3fnma.png"
    }
  ],