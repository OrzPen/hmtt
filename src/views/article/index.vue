<template>
<div>
    <!-- 筛选容器 -->
    <el-card>
      <div slot="header">
          <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选容器内容 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
         <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 查询结果容器 -->
    <el-card class="box">
    <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
    </div>
    <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary" @click="edit(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    <div class="box">
      <!--
        @current-change  页码切换时触发的事件
        current-page   当前页
        page-size  一页显示多少条
        total  总条数
       -->
        <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total">
        </el-pagination>
    </div>
</el-card>
</div>

</template>

<script>
// import MyBread from '@/components/my-bread.vue'
export default {
//   components: {
//     MyBread
//   },
  created () {
    this.getArticles()
  },
  data () {
    return {
      // 提交给后台的筛选条件  传参
      // 数据默认是''还是null的区别,如果是null将不会发送字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认频道数据
      channelOptions: [],
      // 日期控件的数据
      dateValues: [],
      // 文章列表
      articles: [],
      total: 0
    }
  },
  methods: {
    // 获取后台内容数据
    async getArticles () {
      const { data: { data } } = await this.$ajax.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    search () {
      // console.log(this.reqParams)
      this.getArticles()
    },
    changePager (newPage) {
      // newpage 当前点击的按钮的页码
      // 更新提交个服务器的参数
      this.reqParams.page = newPage
      // 重新获取列表数据
      this.getArticles()
    },
    del (id) {
      // 确认框
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认  发删除请求
          // 后台没有任何响应  一直等待响应 导致后面代码无法执行。
          await this.$ajax.delete(`articles/${id}`)
          // 删除成功后做什么？
          this.getArticles()
          this.$message.success('删除成功')
        })
        .catch(() => {
          // 点击取消
        })
    },
    edit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    }
  }
}
</script>

<style scoped lang='less'>
  .box{
    margin-top: 20px;
    text-align: center;
  }
</style>
