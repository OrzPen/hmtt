<template>
    <div class="image-container">
        <!-- 图片按钮 -->
        <!-- 设置dialogVisible控制点击显示隐藏对话框 -->
        <div class="img-btn" @click="getImage()">
            <img src="../assets/images/default.png" alt />
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="700px">
            <el-tabs v-model="activeName" type="card">
                <!-- 素材库 -->
                <el-tab-pane label="素材库" name="image">
                    <!-- 单选框组 -->
                    <div style="margin-bottom:10px">
                        <el-radio-group size="small" v-model="reqParams.collect">
                        <el-radio-button :label="false">全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!-- 图片列表 -->
                    <div class="img-item" v-for="item in images" :key="item.id">
                        <img :src="item.url" alt />
                    </div>
                    <!-- 分页区域 -->
                    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                </el-tab-pane>
                <!-- 上传图片 -->
                <el-tab-pane label="上传图片" name="upload">
                    <!-- action后面是向后台提交的地址 -->
                    <!-- show-file-list是上传文件后的文件信息 -->
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
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
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
         </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
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
      images: []
    }
  },
  methods: {
    // 获取素材数据
    async getImage () {
      this.dialogVisible = true
      const { data: { data } } = await this.$ajax.get('/user/images', { params: this.reqParams })
      this.images = data.results
    }
  }
}
</script>

<style scoped lang="less">
// 对话框样式
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
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
