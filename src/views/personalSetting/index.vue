<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="adminInfo" :rules="setRules" label-width="100px" style="width: 500px;">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="adminInfo.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input v-model="adminInfo.oldLoginPwd" type="password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input v-model="adminInfo.loginPwd" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="新密码确认" prop="loginPwdConfirm">
        <el-input v-model="adminInfo.loginPwdConfirm" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <!-- 按键 -->
      <el-button type="primary" style="margin-top: 15px;" @click="handleSubmit">修改</el-button>
      <el-button type="danger" style="margin-top: 15px;" @click="handleBack">返回</el-button>
    </el-form>
  </div>
</template>

<script>
import { getInfo, setUser } from '@/api/user'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.adminInfo.loginPwd) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      adminInfo: {
        id: '',
        loginId: '',
        name: '', // 用户名
        oldLoginPwd: '', // 旧密码
        loginPwd: '', // 新密码
        loginPwdConfirm: '' // 新密码确认
      },
      setRules: {
        oldLoginPwd: [
          { required: true, trigger: 'blur', message: '请输入旧的密码' }
        ],
        loginPwd: [
          { required: true, trigger: 'blur', message: '请输入新的密码' }
        ],
        loginPwdConfirm: [
          { required: true, trigger: 'blur', message: '请再次输入新密码' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getInfo().then((resp) => {
        // console.log(resp)
        this.adminInfo = { ...this.adminInfo, ...resp.data }
      })
    },
    handleSubmit() {
      if (this.adminInfo.name && this.adminInfo.loginPwd && this.adminInfo.oldLoginPwd) {
        setUser(this.adminInfo).then((res) => {
          // console.log(resp)
          if (typeof res === 'string') {
            // 说明修改失败
            const resp = JSON.parse(res)
            this.$message.error(resp.msg)
          } else {
            // 说明修改成功
            this.$message.success('修改密码成功')
            // 需要重新登陆一遍
            this.$store.dispatch('user/logout').then(() => {
              this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            })
          }
        })
      } else {
        this.$message.error('请将信息填写完整')
      }
    },
    handleBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
