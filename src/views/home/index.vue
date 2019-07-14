<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
      <div class="logo" :class="{close:collapse}"></div>
      <!--
          default-active : 指定默认选中的菜单,根据子菜单的index属性值
          background-color : 指定背景色
          text-color : 指定文字色
          active-text-color : 指定选中激活后的文字颜色
          el-menu-item : 一级菜单,没有子菜单
          router : element-ui提供了vue-router模式
          启用该模式会在激活导航时以index的值作为path进行路由跳转
          想要使用该模式需要再每一项菜单组件中把index的值改为地址
          再给el-menu加上router属性
       -->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <!-- 左边图标 -->
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <!-- 中间文字标题 -->
        <span class="text">江苏传智播客教育科技有限公司</span>
        <!-- 右边头像,用户名,下拉列表 -->
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img
              style="vertical-align:middle"
              width="30"
              height="30"
              :src="avatar"
              alt
            />
            <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 使用native事件修饰符,触发原生事件 给解析后的原生标签绑定事件-->
            <el-dropdown-item icon="el-icon-setting" v-model="name" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" v-model="avatar" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hmtt'))
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('hmtt')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-header {
    //设置分割线
    border-bottom: 1px solid #ddd;
    //为了上下居中设置行高60
    line-height: 60px;
    .el-icon-s-fold {
      //设置左边图标大小和以中线对齐
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      //设置标题文字中线对齐和间距
      vertical-align: middle;
      padding-left: 10px;
    }
  }
  .my-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .close {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
}

</style>
