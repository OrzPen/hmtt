<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式单选框 -->
        <!-- 绑定一个布尔值,用来控制单选按钮切换 -->
        <el-radio-group size="small" v-model="reqParams.collect" @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材 -->
        <el-button size="small" style="float:right" type="success" >添加素材</el-button>
      </div>
      <ul class="img-list">
        <!-- 循环遍历后台返回的images数组 并绑定图片唯一的id值-->
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- 添加v-if判断,如果是收藏栏移除图片下方操作按钮 -->
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <!-- 如果大于一页,才去显示分页功能 -->
      <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="pager"
      :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        // 一页显示几条
        per_page: 10
      },
      // 定义空素材列表
      images: [],
      total: 0,
      // 控制添加素材对话框的显示与隐藏,默认隐藏false
      dialogVisible: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$ajax.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    pager (newPage) {
      // 页码发生改变时,把新页码保存到数据中重新渲染列表
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 300px;
    height: 300px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
