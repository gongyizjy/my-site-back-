<template>
  <div class="app-container">
    <!-- 表单 -->
    <el-table
      v-loading="loading"
      :data="data"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="序号"
        width="60"
      >
        <template slot-scope="scope"> {{ scope.$index + 1 }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        width="230"
        label="项目名称"
      >
        <template slot-scope="scope">
          <a
            class="proname"
            :href="scope.row.url"
            target="_blank"
          > {{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="midImg"
        label="项目描述"
      >
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="midImg"
        label="预览图"
        width="150"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 120px; height: 120px"
            :src="scope.row.thumb"
            :preview-src-list="srcList"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="230"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="github" placement="top" :hide-after="2000">
            <el-button
              type="info"
              icon="iconfont icon-github"
              circle
              @click="githubHandle(scope.row)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editHandle(scope.row)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delHandle(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog title="请编辑该项目信息" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以中文逗号分隔）">
          <el-input
            v-model="form.description"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="项目连接">
          <el-input
            v-model="form.url"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="github地址">
          <el-input
            v-model="form.github"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="预览图">
          <Upload
            v-model="form.thumb"
          />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select
            v-model="form.order"
            placeholder="请选择"
          >
            <el-option
              label="1级"
              :value="1"
            />
            <el-option
              label="2级"
              :value="2"
            />
            <el-option
              label="3级"
              :value="3"
            />
            <el-option
              label="4级"
              :value="4"
            />
            <el-option
              label="5级"
              :value="5"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handeleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
import { getAllProjects, delOneproject, editOneproject } from '@/api/project'
import Upload from '@/components/Upload.vue'
// import { server_URL } from '@/urlConfig'
export default {
  components: {
    Upload
  },
  data() {
    return {
      data: [],
      loading: false,
      dialogFormVisible: false,
      srcList: [],
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getAllProjects().then(({ data }) => {
        this.loading = false
        for (const item of data) {
          // item.thumb2 = server_URL + item.thumb
          this.srcList.push(item.thumb2)
        }
        this.data = data
      })
    },
    githubHandle(projectInfo) {
      // console.log(projectInfo)
      window.open(projectInfo.github)
    },
    editHandle(projectInfo) {
      // 首先得回填数据
      this.dialogFormVisible = true
      this.form = { ...projectInfo, description: projectInfo.description.toString() }
    },
    delHandle(projectInfo) {
      // console.log(projectInfo.id)
      this.$confirm('此操作将永久删除该项目, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOneproject(projectInfo.id).then(() => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handeleSubmit() {
      // console.log(this.form)
      const obj = this.form
      this.form = { ...this.form, description: this.form.description.toString() }
      obj.description = obj.description.split('，')
      editOneproject({ id: obj.id, data: obj }).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })
      })
    }
  }
}
</script>

<style scoped>
.proname:hover{
  color: rgb(125, 125, 125);
}
</style>
