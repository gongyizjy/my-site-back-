<template>
  <div class="app-container">
    <div class="setting">
      <div class="item">
        <h3>网站信息</h3>
        <div class="item-content">
          <h4>网站标题</h4>
          <el-input
            v-model="form.siteTitle"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
          <h4>邮箱</h4>
          <el-input
            v-model="form.mail"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
          <h4>备案号</h4>
          <el-input
            v-model="form.icp"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
        </div>
      </div>
      <el-divider />
      <div class="item">
        <h3>网站头像信息</h3>
        <el-image
          style="width: 100px; height: 100px"
          :src="form.avatar2"
          fit="cover"
        />
      </div>
      <el-divider />
      <div class="item">
        <h3>网址图标信息</h3>
        <div class="item-content">
          <h4>网址图标地址</h4>
          <el-input
            v-model="form.favicon"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
          <h4>网址图标预览</h4>
          <el-image
            style="width: 100px; height: 100px"
            :src="form.favicon"
            fit="cover"
          />
        </div>
      </div>
      <el-divider />
      <div class="item">
        <h3>github信息</h3>
        <div class="item-content">
          <h4>github名字</h4>
          <el-input
            v-model="form.githubName"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
          <h4>github地址</h4>
          <el-input
            v-model="form.github"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
        </div>
      </div>
      <el-divider />
      <div class="item">
        <h3>QQ信息</h3>
        <div class="item-content">
          <h4>QQ号码</h4>
          <el-input
            v-model="form.qq"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
          <h4>QQ二维码图片预览</h4>
          <el-image
            style="width: 100px; height: 100px"
            :src="form.qqQrCode"
            fit="cover"
          />
        </div>
      </div>
      <el-divider />
      <div class="item">
        <h3>微信信息</h3>
        <div class="item-content">
          <h4>微信号</h4>
          <el-input
            v-model="form.weixin"
            placeholder="请输入内容"
            :disabled="isDisabled"
          />
          <h4>微信二维码图片预览</h4>
          <el-image
            style="width: 100px; height: 100px;"
            :src="form.weixinQrCode"
            fit="cover"
          />
        </div>
      </div>
      <el-divider />
      <el-button type="primary" @click="dialogFormVisible = true">进入编辑模式</el-button>
    </div>
    <div class="dialog">
      <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" fullscreen>
        <el-form :model="form">
          <el-form-item label="网站标题">
            <el-input v-model="form2.siteTitle" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form2.mail" />
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="form2.icp" />
          </el-form-item>
          <el-form-item label="网站头像地址">
            <Upload v-model="form2.avatar" />
          </el-form-item>
          <el-form-item label="网站图标地址">
            <el-input v-model="form2.favicon" />
          </el-form-item>
          <el-form-item label="github名字">
            <el-input v-model="form2.githubName" />
          </el-form-item>
          <el-form-item label="github地址">
            <el-input v-model="form2.github" />
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input v-model="form2.qq" />
          </el-form-item>
          <el-form-item label="QQ二维码图片地址">
            <Upload v-model="form2.qqQrCode" />
          </el-form-item>
          <el-form-item label="微信号">
            <el-input v-model="form2.weixin" />
          </el-form-item>
          <el-form-item label="微信二维码图片地址">
            <Upload v-model="form2.weixinQrCode" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSettingInfo, setSettingInfo } from '@/api/set'
import Upload from '@/components/Upload.vue'
import { server_URL } from '@/urlConfig'
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        avatar: '',
        favicon: '',
        github: '',
        githubName: '',
        icp: '',
        qq: '',
        qqQrCode: '',
        siteTitle: '',
        mail: '',
        weixin: '',
        weixinQrCode: ''
      },
      form2: {
        avatar: '',
        favicon: '',
        github: '',
        githubName: '',
        icp: '',
        qq: '',
        qqQrCode: '',
        siteTitle: '',
        mail: '',
        weixin: '',
        weixinQrCode: ''
      },
      isDisabled: true,
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSettingInfo().then((resp) => {
        // console.log(resp)
        this.form = resp.data
        this.form.avatar2 = server_URL + this.form.avatar
        this.form2 = { ...this.form }
      })
    },
    handleSubmit() {
      setSettingInfo(this.form2).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
        this.$message.success('编辑成功')
      })
    }
  }
}
</script>

<style scoped>
.item {
  width: 40%;
}
h3, h4{
  font-weight: normal;
}
</style>
