<template>
  <div class="app-container">
    <el-form :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目描述（每一项描述以中文逗号分隔）">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目连接">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="github地址">
        <el-input v-model="form.github" autocomplete="off" />
      </el-form-item>
      <el-form-item label="预览图">
        <Upload v-model="form.thumb" />
      </el-form-item>
      <el-form-item label="排序等级">
        <el-select v-model="form.order" placeholder="请选择">
          <el-option label="1级" :value="1" />
          <el-option label="2级" :value="2" />
          <el-option label="3级" :value="3" />
          <el-option label="4级" :value="4" />
          <el-option label="5级" :value="5" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">发布项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload.vue'
import { addOneproject } from '@/api/project'
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: 1
      }
    }
  },
  methods: {
    handleSubmit() {
      const obj = { ...this.form }
      obj.description = obj.description.split('，')
      console.log(obj)
      addOneproject(obj).then((resp) => {
        console.log(resp)
        this.$message.success('添加项目成功')
        // this.$router.push('/projectsList')
      })
    }
  }
}
</script>

<style></style>
