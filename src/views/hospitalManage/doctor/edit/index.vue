<template>
  <el-form :model="editForm" :rules="rules" 
  size="middle"
  ref="hospitalForm" label-width="120px" :inline="false">
    <el-row>
      <el-col :span="12">
        <el-form-item label="医生姓名" prop="hospitalName">
          <el-input v-model="editForm.hospitalName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="电话" prop="adminPhone">
          <el-input v-model="editForm.adminPhone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <!-- <el-col :span="12">
        <el-form-item label="管理员姓名" prop="adminName">
          <el-input v-model="editForm.adminName"></el-input>
        </el-form-item>
      </el-col> -->
      <!-- <el-col :span="12">
        <el-form-item label="管理员电话" prop="adminPhone">
          <el-input v-model="editForm.adminPhone"></el-input>
        </el-form-item>
      </el-col> -->
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="adminEmail">
          <el-input v-model="editForm.adminEmail"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="加入医院名称" prop="adminPhone">
          <el-input v-model="editForm.adminPhone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="登录账号" prop="adminAccount">
          <el-input v-model="editForm.adminAccount"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="初始密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="账号状态" prop="accountStatus">
          <el-switch v-model="editForm.accountStatus"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    
    <div class="action-btn">
      <el-button type="primary" @click="submitForm('hospitalForm')">提交</el-button>
      <el-button @click="resetForm('hospitalForm')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
  export default {
    name:'editHostital',
    props:{
      defaultData:{
        type:Object
      }
    },
    data() {
      var checkEmail = (rule, value, callback) => {
        let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!value) {
          return callback(new Error('请输入管理员邮箱'))
        } else if (!emailrule.exec(value)) {
          return callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
      var checkAccount = (rule, value, callback) => {
        let accountRule = /[a-zA-Z0-9_]{4,15}$/
        if (!value) {
          return callback(new Error('请输入登录账号'))
        } else if (!accountRule.exec(value)) {
          return callback(new Error('允许5-16字节，可包含数字、字母和下划线'))
        } else {
          callback()
        }
      }
      var checkmobile = (rule, value, callback) => {
        let mobilerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
        if (!value) {
          return callback(new Error('请输入管理员电话'))
        } else if (!mobilerule.exec(value)) {
          return callback(new Error('请输入正确的电话'))
        } else {
          callback()
        }
      }
      var checkPass = (rule, value, callback) => {
        let passrule = /\w{5,17}$/
        if (!value) {
          return callback(new Error('请输入初始密码'))
        } else if (!passrule.exec(value)) {
          callback(new Error('请输入6~18密码,可包含数字、字母和下划线'))
        } else {
          callback()
        }
      }
      return {
        editForm:this.defaultData,
        rules: {
          hospitalName: [
            { required: true, message: '请输入医院名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          hospitalAddress: [
            { required: true, message: '请输入医院地址', trigger: 'change' }
          ],
          adminName: [
            { required: true, message: '请输入管理员姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          adminPhone: [
            { validator: checkmobile, trigger: 'change' }
          ],
          adminEmail: [
            { validator: checkEmail, trigger: 'change' }
          ],
          adminAccount: [
            { validator: checkAccount, trigger: 'change' }
          ],
          password: [
            { validator: checkPass, trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$emit('closeDialog')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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


