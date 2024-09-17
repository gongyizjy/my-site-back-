<template>
  <div>
    <div class="edit-item">
      <h3>文章标题</h3>
      <el-input
        v-model="form.title"
        placeholder="请输入文章标题"
      />
    </div>
    <div class="edit-item">
      <h3>文章编辑</h3>
      <Editor
        ref="toastuiEditor"
        :initial-value="form.editorText"
        height="600px"
        :options="editorOptions"
      />
    </div>
    <div class="edit-item">
      <h3>文章描述</h3>
      <el-input
        v-model="form.description"
        type="textarea"
        placeholder="请输入文章描述"
        :rows="6"
      />
    </div>
    <div class="edit-item">
      <h3>文章头图</h3>
      <Upload
        v-model="form.thumb"
      />
    </div>
    <div class="edit-item">
      <h3>文章标签</h3>
      <el-select
        v-model="form.select"
        style="width: 150px;"
        placeholder="请选择文章分类"
        @change="$forceUpdate()"
      >
        <el-option
          v-for="item in blogType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="edit-item">
      <el-button
        type="primary"
        style="margin-top: 15px;"
        @click="handleSubmit"
      >{{ btnContent }}</el-button>
      <el-button
        v-if="type === 'edit'"
        style="margin-top: 15px;"
        @click="handleCancel"
      >取消编辑</el-button>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload.vue'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { getBlogType, findOneBlog, addBlog, editBlog } from '@/api/blog'
export default {
  components: {
    Editor,
    Upload
  },
  props: {
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      form: {
        title: '',
        editorText: '',
        description: '',
        select: '',
        thumb: ''
      },
      blogType: [],
      editorOptions: {
        language: 'zh-CN'
      },
      btnContent: '发布文章'
    }
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data
    })
    // 如果是编辑文章，则需要数据回填
    if (this.type === 'edit') {
      this.btnContent = '更新文章'
      const id = this.$route.params.id
      findOneBlog(id).then(({ data }) => {
        this.form = data
        this.form.select = data.category === null ? '' : data.category.id
        this.$refs.toastuiEditor.invoke('setHTML', data.htmlContent)
        // console.log(data)
      })
    }
  },
  methods: {
    // 确认按钮按下， 提交表单
    handleSubmit() {
      const html = this.$refs.toastuiEditor.invoke('getHTML')
      const markdown = this.$refs.toastuiEditor.invoke('getMarkdown')
      console.log(html, markdown)
      const obj = {
        title: this.form.title,
        description: this.form.description,
        categoryId: this.form.select,
        createDate: new Date().getTime(),
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown
      }
      // console.log(obj)
      if (obj.title.length && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.type === 'add') {
          addBlog(obj).then(() => {
          // console.log(resp)
            this.$message.success('文章发布成功')
            this.$router.push('/blogList')
          })
        } else {
          editBlog({ id: this.form.id, data: obj }).then((resp) => {
            console.log(resp)
            this.$message.success('文章更新成功')
            this.$router.push('/blogList')
          })
        }
      } else {
        this.$message.error('请填写内容')
      }
    },
    handleCancel() {
      this.$router.push('/blogList')
    }
  }
}

</script>

<style scoped>

</style>
