<template>
  <div class="app-container">
    <h3>关于我</h3>
    <el-input
      v-model="url"
      placeholder="请输入内容"
      :disabled="isDisabled"
    />
    <el-button type="primary" style="margin-top: 15px" @click="handleClick">{{ btnContent }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from '@/api/about'
export default {
  data() {
    return {
      url: '',
      isDisabled: true,
      btnContent: '编辑'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAbout().then((resp) => {
        this.url = resp.data
      })
    },
    handleClick() {
      if (this.btnContent === '编辑') {
        this.isDisabled = false
        this.btnContent = '完成'
      } else {
        // 用户内容编辑完成
        if (this.url) {
          this.btnContent = '编辑'
          this.isDisabled = true
          setAbout({ url: this.url }).then((resp) => {
            this.url = resp.data // 更新一下url地址
            this.$message({
              message: '更改成功',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '内容不能为空',
            type: 'warning'
          })
        }
      }
    }
  }
}
</script>

<style>

</style>
