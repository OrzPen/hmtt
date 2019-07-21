<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <ul class="img-list">
            <li v-for="item in fans" :key="item.id">
              <div class="fansImg">
                <img :src="item.photo" alt />
              </div>
              <div class="fansName">{{item.name}}</div>
              <el-button type="primary" plain size="small" class="fansBtn">+ 关注</el-button>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="charts">粉丝画像</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list',
      fans: []
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    async getFans () {
      const { data: { data } } = await this.$ajax('followers')
      this.fans = data.results
      console.log(this.fans)
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
    width: 220px;
    height: 230px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    .fansImg {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        left: 50%;
        top: 0;
        transform: translate(-50%,20%);
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .fansName{
        margin-top: 50px;
        text-align: center;
    }
    .fansBtn {
        position: relative;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
        margin-top: 15px;
    }
  }
}
</style>
