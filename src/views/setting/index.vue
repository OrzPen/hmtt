<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" v-model="userForm.intro" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <p style="text-align:center">修改头像</p>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../eventBus/index'
export default {

  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    // 获取用户资料
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data: { data } } = await this.$ajax.get('user/profile')
      this.userForm = data
    },
    async updataUser () {
      const { data: { data } } = await this.$ajax.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      // 让头部用户名称和修改的用户名称同步
      // 非父子传值,通过eventBus
      eventBus.$emit('updataHeaderName', data.name)
      // 保存sessionStorage的信息
      const localUser = JSON.parse(window.sessionStorage.getItem('hmtt'))
      localUser.name = data.name
      window.sessionStorage.setItem('hmtt', JSON.stringify(localUser))
    },
    upload (data) {
      // console.log(data.file) 选择的图片
      // 把文件数据  放在 formData 中
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$ajax.patch('user/photo', formData).then(res => {
        // 更新设置的头像
        this.userForm.photo = res.data.data.photo
        // 更新头部
        eventBus.$emit('updateHeaderPhoto', res.data.data.photo)
        // 更新本地存储
        const localUser = JSON.parse(window.sessionStorage.getItem('hmtt'))
        localUser.photo = res.data.data.photo
        window.sessionStorage.setItem('hmtt', JSON.stringify(localUser))
      })
    }
  }
}
</script>

<style scoped lang='less'></style>
