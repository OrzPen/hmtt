<template>
    <div>
        <el-card>
      <div slot="header">
        <my-bread>{{articleId?"修改文章":"发布文章"}}</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本编辑器 -->
           <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
         <!-- 封面组件 -->
         <!-- 绑定v-model语法糖 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
       <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      articleId: null,
      articleForm: {
        // 富文本编辑器中的内容
        content: null,
        // 标题内容对应的数据
        title: '',
        cover: {
          // 单选按钮默认选项
          type: 1,
          images: []
        },
        // 频道信息ID
        channel_id: null
      },
      // 富文本编辑器配置选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      }
    }
  },
  created () {
    // 问题：修改的地址过来 点击发布文章  组件不更新
    // 什么时候执行 组件的初始化之后调用
    this.articleId = this.$route.query.id
    // 获取文章数据
    this.articleId && this.getArticle(this.articleId)
  },
  watch: {
    $route () {
      this.articleId = this.$route.query.id
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 单图  三图
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    async getArticle (id) {
      const { data: { data } } = await this.$ajax.get('articles/' + id)
      this.articleForm = data
    },
    changeType () {
      // 切换单图三图时,置空数据
      this.articleForm.cover.images = []
    },
    async publish (draft) {
      // ...省略校验
      // draft  发布 false  草稿 true
      // 将来数据要地址栏？后传参的方式
      // this.$http({data:请全体,params:query数据地址栏数据})
      console.log(this.articleForm)
      await this.$ajax.post('articles?draft=' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async edit (draft) {
      await this.$ajax.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style>
</style>
