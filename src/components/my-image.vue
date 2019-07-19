<template>
    <div class="image-container">
        <!-- 图片按钮 -->
        <!-- 设置dialogVisible控制点击显示隐藏对话框 -->
        <div class="img-btn" @click="clickimage()">
            <!-- 判断如果value有值使用value中的地址,如果没有使用默认地址 -->
            <img :src="value||defaultImage" alt />
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="700px">
            <el-tabs v-model="activeName" type="card">
                <!-- 素材库 -->
                <el-tab-pane label="素材库" name="image">
                    <!-- 单选框组 -->
                    <div style="margin-bottom:10px">
                        <!-- 切换时绑定change事件,重新渲染列表 -->
                        <el-radio-group size="small" @change="toggleImage" v-model="reqParams.collect">
                        <el-radio-button :label="false">全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!-- 图片列表 -->
                    <!-- 素材选中功能 在此处标签添加selected事件获取此时点击的图片的url -->
                    <!-- 根据当前图片的id和遍历时的ID匹配,如果一直加上选中时的样式,不一致不加 -->
                    <div class="img-item" :class="{selected:selectedImageUrl===item.url}" @click="selected(item.url)" v-for="item in images" :key="item.id">
                        <img :src="item.url" alt />
                    </div>
                    <!-- 分页区域 -->
                    <el-pagination
                    v-if="total>reqParams.per_page"
                    background
                    layout="prev, pager, next"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="pager"
                    :total="total"
                    ></el-pagination>
                </el-tab-pane>
                <!-- 上传图片 -->
                <el-tab-pane label="上传图片" name="upload">
                    <!-- action后面是向后台提交的地址 -->
                    <!-- show-file-list是上传文件后的文件信息 -->
                    <!-- headers是发送请求时携带的请求头,此处携带token -->
                    <!-- on-success是发送成功后触发的回调函数,此处把后端返回的地址赋值给data中的数据 -->
                    <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    name="image"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="handleSuccess"
                    >
                        <!-- 如果有图片信息,显示图片 -->
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <!-- 如果没有显示默认的样式 -->
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>
            <!-- 底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <!-- 点击取消隐藏对话框 -->
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- 点击确定绑定确认事件 -->
                <el-button type="primary" @click="confirmImage()">确 定</el-button>
            </span>
         </el-dialog>
    </div>
</template>

<script>
// webpack无法打包值是地址的数据,所以在此导入地址,此时图片格式为base64
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      defaultImage,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选项卡选中哪一项
      activeName: 'image',
      // 请求素材列表的参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片预览地址
      imageUrl: null,
      // 定义空素材列表
      images: [],
      // 素材总数
      total: 0,
      // 当前选中的图片地址
      selectedImageUrl: null,
      // 请求头数据
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hmtt')).token
      }
    }
  },
  methods: {
    // 在点击图片按钮时获取素材数据
    clickimage () {
      this.activeName = 'image'
      this.imageUrl = null
      this.dialogVisible = true
      this.getImage()
    },
    async getImage () {
      const { data: { data } } = await this.$ajax.get('/user/images', { params: this.reqParams })
      this.images = data.results
      // 赋值total
      this.total = data.total_count
    },
    // 切换页的时候触发的事件
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    // 单选框改变时触发的事件,此时重新发送请求渲染列表
    toggleImage () {
      // 优化切换全部和收藏后样式还在的问题
      this.selectedImageUrl = null
      this.reqParams.page = 1
      this.getImage()
    },
    // 获取当前点击图片的URL
    selected (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
    // 上传成功后把后台返回的url地址添加到data中的数据中
      this.imageUrl = res.data.url
    },
    // 点击确定后需要做的事情
    confirmImage () {
      // 根据选中的tab判断是哪个地方点击的确定
      // 如果是image,说明是素材库区域点的确定
      if (this.activeName === 'image') {
        // 严谨判断,如果没有选中图片结束函数并弹出提示信息
        if (!this.selectedImageUrl) return this.$message.info('请选中封面图')
        // 如果成功,把默认图替换为素材库的图片地址
        // this.value = this.selectedImageUrl
        // 通知父组件数据改变数据
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 严谨判断,如果上传图片中没有图片地址结束函数并弹出提示信息
        if (!this.imageUrl) return this.$message.info('请上传封面图')
        // 如果成功,把默认显示图替换为上传的图片地址
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.selectedImageUrl = null
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.image-container {
  width: 150px;
  height: 120px;
  margin-right: 20px;
  display: inline-block;
  margin-bottom: 20px;
}
// 对话框样式
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  // &连接符  .img-item.selected  .img-item::before{}
  &.selected{
    &::before{
      // 一个和图片一样大小的容器  有半透明背景 打钩图标
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 60px 60px
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    // 图片属性，让图片按照等比例缩放显示在容器内
    object-fit: contain;
  }
}
// 图片按钮样式
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
