<template>
  <div class="banner-container">
    <el-table
      :data="banner"
      border
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
        label="标题"
        width="180"
      />
      <el-table-column
        align="center"
        prop="description"
        label="描述"
      />
      <el-table-column
        align="center"
        prop="midImg"
        label="中图预览"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="midImg"
        label="大图预览"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.bigImg"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editBannerHandle(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input
            v-model="form.title"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.description"
            autocomplete="off"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 中图 -->
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 大图 -->
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getbanner, setBanner } from '@/api/banner'
// import { server_URL } from '@/urlConfig.js'
import Upload from '@/components/Upload.vue'
export default {
  components: {
    Upload
  },
  data() {
    return {
      banner: [],
      dialogFormVisible: false, // 编辑对话框是否显示
      form: {
        id: '',
        midImg: '',
        bigImg: '',
        title: '',
        description: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getbanner().then(res => {
        // console.log(res)
        this.banner = res.data
      })
    },
    editBannerConfirm() {
      const arr = [...this.banner]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form
        }
      }
      setBanner(arr).then(() => {
        // console.log(res.data)
        this.dialogFormVisible = false // 关闭对话框
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      })
    },
    editBannerHandle(info) {
      this.form = { ...info }
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>
.banner-container{
  padding: 20px;
}
</style>
