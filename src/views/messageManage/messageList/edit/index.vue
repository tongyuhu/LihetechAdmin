<template>
  <el-form :model="editForm"
  size="middle"
  ref="hospitalForm" label-width="100px" :inline="false">
    <el-form-item label="留言内容">
      <el-input type="textarea" :autosize="{ minRows: 4}" readonly v-model="editForm.feedDesc"></el-input>
    </el-form-item>
    <el-form-item label="处理建议">
      <el-input type="textarea" :autosize="{ minRows: 6}" v-model="editForm.dealWithContent"></el-input>
    </el-form-item>
    <div class="action-btn">
      <el-button type="primary" @click="submitForm('hospitalForm')">提交</el-button>
      <el-button @click="resetForm('hospitalForm')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
  export default {
    name:'edit',
    props:{
      suggest:{
        type:Object
      }
    },
    data() {
      return {
        editForm:this.suggest,
      };
    },
    methods: {
      submitForm(formName) {
        this.$emit('edit',this.editForm)
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //     this.$emit('closeDialog')
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('closeDialog')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
</style>


