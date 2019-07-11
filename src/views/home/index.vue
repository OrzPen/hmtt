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
       -->
      <el-menu
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
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
              src="../../assets/images/avatar.jpg"
              alt
            />
            <b style="vertical-align:middle;padding-left:5px">弟弟</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
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
      collapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
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
