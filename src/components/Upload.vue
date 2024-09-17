<template>
  <div>
    <!-- 上传组件标题 -->
    <div class="block">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img
        v-if="value"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from '@/urlConfig.js'
export default {
  props: ['uploadTitle', 'value'],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    imageUrl() {
      if (this.value.startsWith('http') || this.value.startsWith('https')) {
        return this.value
      } else {
        return server_URL + this.value
      }
    },
    headers() {
      return {
        Authorization: 'Bearer ' + localStorage.getItem('token') // 从本地获取 token，添加到 header 里面
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit('input', res.data) // 触发父组件的 input 事件，并把上传的图片路径传给父组件
      }
    }
  }
}
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
