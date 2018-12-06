<template>
  <div class="components-container">
    <!-- <code>
      {{ $t('components.tinymceTips') }}
      <a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html"> {{ $t('components.documentation') }}</a>
    </code> -->
    <div class="title">
      <span>编辑资讯</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="文章标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主题">
              <el-input v-model="form.desc"></el-input>
              <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
      <div class="tinymce">
        <tinymce :height="300" v-model="content"/>
      </div>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
    <!-- <div>
      <tinymce :height="300" v-model="content"/>
    </div> -->
    <!-- <div class="editor-content" v-html="content"/> -->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods:{
    onSubmit(){
      console.log('submit!');
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 24px;
  margin:30px;
}
.tinymce{
  margin: 20px;
}
</style>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

