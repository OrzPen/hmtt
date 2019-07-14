<template>
  <div class="login-container">
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 需要给el-form加上ref属性.  status-icon是element校验成功失败后显示的图标 :model="loginForm" :rules="loginRules" 为绑定的规则对象
      loginForm对应的数据,loginRules对应的具体规则-->
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <!-- prop是给一项绑定具体的一项规则进行校验 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 使多选框自动勾选 -->
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 在return之前定义自定义规则函数,约定一个函数
    // 参数 rule 校验规则对象  value 字段的值  callback 成功或失败回调
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      checked: true,
      // 表单对应的对象
      loginForm: {
        mobile: '18648465210',
        code: '246810'
      },
      // 表单的校验规则对象
      loginRules: {
        // 具体的校验规则
        mobile: [
          // 系统内置选项 required :是否为必填项  message :校验失败后的提示信息 ,trigger:校验触发方式
          { required: true, message: '手机号必填', trigger: 'blur' },
          // 使用自定义规则 在规则中使用 validator 指定该函数即可
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须是6位', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    // 整体表单的校验
    login () {
      // 因为组件上的函数需要通过dom才能调用 ,所以在这获取el-form的dom对象 ,使用校验函数的名称 validate 回调函数 传参 valid  判断整个表单是否校验成功
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     // 如果校验成功,进行登录
      //     this.$ajax.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
      //       .then((res) => {
      //         // res是响应对象,res.data是响应回来的数据
      //         // 登录成功后保存登录后返回的用户信息,包含token
      //         // 使用sessionStorage储存token,关闭浏览器会失效
      //         window.sessionStorage.setItem('hmtt', JSON.stringify(res.data.data))
      //         // 登陆成功后跳转到首页
      //         this.$router.push('/')
      //       })
      //   }
      // })
      this.$refs.loginForm.validate(async (valid) => {
        // try{ 业务逻辑 }catch(err) {当业务逻辑失败报错就会调用catch,进行错误后的处理}
        try {
          const res = await this.$ajax.post('authorizations', this.loginForm)
          window.sessionStorage.setItem('hmtt', JSON.stringify(res.data.data))
          this.$router.push('/')
        } catch (err) {
          // 错误调用
          this.$message.error('用户名或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
  }
  .el-checkbox {
    margin-right: 5px;
  }
}
</style>
