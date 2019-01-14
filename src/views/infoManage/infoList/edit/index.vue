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
          <el-form-item label="资讯标题">
            <el-input v-model="form.inforTitle"></el-input>
          </el-form-item>
          <el-form-item label="资讯简述">
            <el-input placeholder="请输入内容"
            type="textarea"
            :rows="2"
            v-model="form.inforDesc"></el-input>
          </el-form-item>
          <el-form-item label="资讯类型">
            <el-radio-group 
              v-model="form.inforTypeBig"
              >
              <el-radio :label="1">高血压</el-radio>
              <el-radio :label="2">糖尿病</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资讯分类">
            <el-radio-group 
              v-model="form.inforTypeSmall"
              :min="0"
              :max="1">
              <el-radio :label="1" >基础知识</el-radio>
              <el-radio :label="2">生活管理</el-radio>
              <el-radio :label="3">视频讲座</el-radio>
              <el-radio :label="4">并发症</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资讯图片">
            <el-upload
              class="avatar-uploader"
              action="1"
              :show-file-list="false"
              :http-request="httpUpload"
              >
              <img v-if="form.inforImgUrl" :src="form.inforImgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
      <div class="tinymce">
        <tinymce :height="300" v-model="form.inforContent"/>
      </div>
      <el-form-item label-width="15px">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <div>
      <tinymce :height="300" v-model="content"/>
    </div> -->
    <!-- <div class="editor-content" v-html="content"/> -->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import {upload} from '@/api/commons/upload.js'
import {infoAdd} from '@/api/infoManage.js'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:'',
      // `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
      //   <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      // </ul>`,
      form: {
        inforTitle: '',
        inforDesc: '',
        inforTypeSmall: '',
        inforTypeBig:'',
        inforContent: '',
        inforImgUrl:''
      },
    }
  },
  methods:{
    onSubmit(){
      console.log('submit!',this.form);
      infoAdd(this.form).then(res=>{
        if(res.code === '0000'){
          this.$message({
          message: '添加成功',
          type: 'success'
        });
        }
      })
      // console.log('route!',this.$route.params);
      // console.log('route!',this.$route);
    },
    httpUpload(val){
      // console.log(val)
      let formData = new FormData()
      formData.append('files', val.file)
      formData.append('uploadType', 4)
      upload(formData).then(res=>{
        if(res.code === '0000') { 
          // this.fileList.push({
          //   url:res.data.seeFile,
          //   size:res.data.size
          // })
          this.form.inforImgUrl = res.data.seeFile
        }else{
          this.$message(res.msg)
        }
      })
    },
  },
  created () {
    this.form={...this.$route.params}
    console.log('route!',this.$route.params);
    console.log('route!',this.$route);
  } 
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 24px;
  margin:30px;
  margin-left: 15px;
}
.tinymce{
  margin: 20px;
}
// .avatar-uploader .el-upload {
//   border: 1px dashed #7e7a7a;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409EFF;
// }
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #7e7a7a;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>


