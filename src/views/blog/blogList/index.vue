template<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      :data="blog"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="序号"
        width="60"
      >
        <template slot-scope="scope"> {{ scope.$index + (currentPage - 1) * pageSize + 1 }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        width="230"
        label="文章名称"
      >
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px; height: 200px;"
              :src="scope.row.thumb"
              fit="cover"
              :preview-src-list="srcList"
            />
            <a slot="reference" href="#" target="_blank" @click="handleClick(scope.row)">{{ scope.row.title }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="description"
        label="文章描述"
        width="230"
      />
      <el-table-column
        align="center"
        prop="midImg"
        label="浏览量"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.scanNumber }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="midImg"
        label="评论量"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.commentNumber }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属分类"
        width="150"
      >
        <template slot-scope="scope"> {{ scope.row.category? scope.row.category.name : '未分类' }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建日期"
        width="230"
      >
        <template slot-scope="scope"> {{ formatDate(scope.row.createDate) }} </template>
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
    <!-- 分页 -->
    <el-pagination
      class="paage-container"
      background
      :page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :current-page.sync="currentPager"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>

<script>
import { getBloglist, delOneBlog } from '@/api/blog'
import { formatDate } from '@/utils/formatDate'
import { blog_URL } from '@/urlConfig.js'
export default {
  data() {
    return {
      blog: [], // 存储的数据
      pageSize: 5, // 每一页显示的数量
      currentPage: 1, // 当前的页码
      total: 0, // 总数量
      totalSize: 0, // 总页数
      srcList: [],
      currentPager: 1 //  当前分页栏的页码
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getBloglist(this.currentPage, this.pageSize).then(({ data }) => {
        // console.log(data)
        data.rows.forEach(item => {
          // item.thumb = server_URL + item.thumb
          this.srcList.push(item.thumb)
        })
        this.blog = data.rows
        this.total = data.total
        this.totalSize = Math.ceil(this.total / this.pageSize)
        if (this.currentPage > this.totalSize) {
          this.currentPage = this.totalSize
          this.fetchData()
        }
      })
    },
    formatDate,
    // 编辑文章
    editHandle(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`)
    },
    delHandle(blogInfo) {
      // console.log(blogInfo)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '是否删除此篇文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOneBlog(blogInfo.id).then(() => {
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
    handleSizeChange(pagerNum) {
      this.pageSize = +pagerNum
      this.currentPage = 1
      this.currentPager = 1
      this.fetchData()
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.fetchData()
    },
    handlePrevClick() {
      this.currentPage--
    },
    handleNextClick() {
      this.currentPage++
    },
    handleClick(blogInfo) {
      // http://localhost:8080/article/77bD5722-f1aE-8b90-fdc9-ff61AdF3DfA6
      window.open(`${blog_URL}/article/${blogInfo.id}`)
    }
  }
}
</script>

<style scoped>
.paage-container{
  margin-top: 15px;
  padding: 0 10px;
}
</style>
