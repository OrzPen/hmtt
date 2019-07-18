<template>
    <div>
        <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
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
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
         <!-- 封面组件 -->
         <!-- 绑定v-model语法糖 -->
         <my-image v-model="articleForm.cover.images[0]"></my-image>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
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
  }
}
</script>

<style>
</style>
