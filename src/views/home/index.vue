<template>
  <el-container class="home-container">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header class="my-header">
        <!-- 左边图标 -->
        <span class="el-icon-s-fold"></span>
        <!-- 中间文字标题 -->
        <span class="text">江苏传智播客教育科技有限公司</span>
        <!-- 右边头像,用户名,下拉列表 -->
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" src="../../assets/images/avatar.jpg" alt="">
            <b style="vertical-align:middle;padding-left:5px" >弟弟</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
  .home-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
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
</style>
