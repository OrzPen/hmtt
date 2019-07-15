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
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 查询结果容器 -->
    <el-card class="box">
    <div slot="header">
        根据筛选条件共查询到
        <b>0</b> 条结果：
    </div>
    <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
    </el-table>
    <div class="box">
        <el-pagination background layout="prev, pager, next" :total="1000">
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
    this.getChannelOptions()
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
      dateValues: []
    }
  },
  methods: {
    // 定义获取下拉列表的方法,发送ajax请求数据,将请求回来的数据保存到定义好的空数据中
    async getChannelOptions () {
      const { data: { data } } = await
      this.$ajax.get('channels')
      this.channelOptions = data.channels
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
