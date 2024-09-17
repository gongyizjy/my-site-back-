<template>
  <div class="app-container">
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
        <template slot-scope="scope"> {{ scope.$index + (currentPage - 1) * pageSize + 1 }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        width="100"
        label="头像"
      >
        <template slot-scope="scope">
          <el-avatar
            size="small"
            shape="square"
            :src="scope.row.avatar"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        label="昵称"
        width="130"
      />
      <el-table-column
        align="center"
        label="内容"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="评论日期"
        width="230"
      >
        <template slot-scope="scope"> {{ formatDate(scope.row.createDate) }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
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
import { formatDate } from '@/utils/formatDate'
import { getMessage, delMessage } from '@/api/message'
import { server_URL } from '@/urlConfig'
export default {
  data() {
    return {
      data: [],
      pageSize: 5, // 每一页显示的数量
      currentPage: 1, // 当前的页码
      total: 0, // 总数量
      totalSize: 0, // 总页数
      currentPager: 1 //  当前分页栏的页码
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getMessage(this.currentPage, this.pageSize).then(({ data }) => {
        console.log(data)
        data.rows.forEach(item => {
          item.avatar = server_URL + item.avatar
        })
        this.total = data.total
        this.data = data.rows
        this.totalSize = Math.ceil(this.total / this.pageSize)
        if (this.currentPage > this.totalSize) {
          this.currentPage = this.totalSize
          this.fetchData()
        }
      })
    },
    formatDate,
    delHandle(messageInfo) {
      // console.log(commentInfo)
      this.$confirm('此操作将永久删除该评论, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMessage(messageInfo.id).then(() => {
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
      this.pageSize = pagerNum
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
    }
  }
}
</script>

<style>

</style>
