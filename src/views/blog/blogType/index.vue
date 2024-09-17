<template>
  <div v-loading="loaing" class="app-container">
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input
        v-model="input"
        placeholder="请输入要添加的分类，左侧选择分类等级"
        class="input-with-select select-container"
      >
        <el-select
          slot="prepend"
          v-model="select"
          placeholder="请选择"
          style="width: 80px;"
        >
          <el-option
            label="1级"
            value="1"
          />
          <el-option
            label="2级"
            value="2"
          />
          <el-option
            label="3级"
            value="3"
          />
          <el-option
            label="4级"
            value="4"
          />
          <el-option
            label="5级"
            value="5"
          />
        </el-select>
      </el-input>
      <el-button type="primary" @click="addBlogType">添加</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="data"
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
        prop="name"
        label="博客类别"
      />
      <el-table-column
        align="center"
        prop="articleCount"
        label="文章数量"
      />
      <el-table-column
        align="center"
        label="操作"
        width="230"
      >
        <template slot-scope="scope">
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
    <!-- 编辑框 -->
    <el-dialog title="请编辑分类信息" :visible.sync="dialogFormVisible" top="15vh" width="30%">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select
            v-model="form.order"
            placeholder="请选择"
            style="width: 150px;"
          >
            <el-option
              label="1级"
              value="1"
            />
            <el-option
              label="2级"
              value="2"
            />
            <el-option
              label="3级"
              value="3"
            />
            <el-option
              label="4级"
              value="4"
            />
            <el-option
              label="5级"
              value="5"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBlogTypeConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 一个思考， 如果文章分类过多也需要添加分页组件，但是服务器中并没有分页获取文章分类这个api， 后面学了node.js后可以添加一个分类进一步完善 -->
  </div>
</template>

<script>
import { getBlogType, addBlogType, findOneBlogType, updateOneBlogType, deleteOneBlogType } from '@/api/blog'
export default {
  data() {
    return {
      input: '',
      select: '1',
      data: [],
      loaing: false,
      dialogFormVisible: false,
      form: {
        name: '',
        order: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loaing = true
      getBlogType().then(resp => {
        this.loaing = false
        this.data = resp.data
      })
    },
    // 添加文章分类
    addBlogType() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then(() => {
          this.fetchData()
          this.$message.success('添加分类成功')
        })
      } else {
        this.$message.error('分类名称不能为空')
      }
    },
    editHandle({ id }) {
      // 数据回填
      findOneBlogType(id).then(resp => {
        this.dialogFormVisible = true
        resp.data.order = '' + resp.data.order
        this.form = resp.data
      })
    },
    editBlogTypeConfirm() {
      console.log(this.form.id)
      updateOneBlogType({ id: this.form.id, data: this.form }).then((resp) => {
        console.log(resp)
        this.dialogFormVisible = false
        this.fetchData()
        this.$message.success('编辑分类成功')
      })
    },
    delHandle({ id }) {
      this.$confirm('删除该分类后，该分类下面所有文章将变成未分类状态，是否继续？', '是否删除此文章分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOneBlogType(id).then(() => {
          this.fetchData()
          this.$message.success('删除分类成功')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
  .select-container{
    width: 30%;
    margin-right: 15px;
    margin-bottom: 15px;
  }
</style>
