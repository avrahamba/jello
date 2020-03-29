><template>
  <section class="attachment-container" v-if="attachments">
    <div class="attachment" v-for="attachment in attachments" :key="attachment.url">
      <img :src="attachment.url" />
      <div class="attachment-info">
        <div class="attachment-name">{{attachment.fileName}}</div>
        <div class="created">Added {{attachment.created | date}}</div>
        <div class="actions">
          <button class="remove" @click="removeAttachment(attachment)">Delete</button>
        </div>
      </div>
    </div>
    <button @click="$emit('add-attachment') " class="add-attachment">Add attachment</button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      attachments: this.value
    };
  },
  props: {
    value: Array
  },
  methods: {
    removeAttachment(attachmentToRemove) {
      const attIdx = this.attachments.findIndex(
        attachment => attachment.url === attachmentToRemove.url
      );
      this.attachments.splice(attIdx, 1);
      this.$emit("input", this.attachments);
    }
  }
};
</script>
