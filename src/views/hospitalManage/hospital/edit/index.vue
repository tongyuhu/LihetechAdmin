<template>
  <div class="box">
    <el-form ref="editHospitalForm" :model="tableData" :rules="rules"  label-width="120px" size="mini">
      <el-form-item label="管理员用户名" prop="username">
        <el-input v-model="tableData.username"></el-input>
      </el-form-item>
      <el-form-item label="管理员电话" prop="mobile">
        <el-input v-model="tableData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="管理员姓名" prop="name">
        <el-input v-model="tableData.name"></el-input>
      </el-form-item>
      <el-form-item label="原始密码" prop="password">
        <el-input v-model="tableData.password"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱" prop="email">
        <el-input v-model="tableData.email"></el-input>
      </el-form-item>
      <el-form-item label="医院名称" prop="hospitalName">
        <el-input v-model="tableData.hospitalName"></el-input>
      </el-form-item>
      <el-form-item label="医院地址" prop="address">
        <el-input v-model="tableData.address"></el-input>
      </el-form-item>
      <el-form-item label="账号开启或停用" v-if="action === '编辑'">
        <el-switch
          v-model="tableData.isStop"
          active-color="#ff4949"
          inactive-color="#13ce66">
        </el-switch>
      </el-form-item>
      
      
      <el-form-item size="mini">
        <el-button type="primary" @click="update('editHospitalForm')">{{action}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {checkPass,checkPhone,checkUserName,checkEmail,checkName,checkNumber} from '@/utils/formCheck.js'
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object,
        default:()=>{return {}}
      },
      action:{
        type:String
      }
    },
    data() {

      return {
        tableData: this.defaultData,
        rules:{
          password: [
            { validator: checkPass, trigger: ['blur', 'change']},
            {required: true}
          ],
          email: [
            { validator: checkEmail, trigger: ['blur', 'change'] },
            {required: true}
          ],
          username: [
            { validator: checkUserName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          hospitalName: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          name: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          department: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          address: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          mobile: [
            { validator: checkPhone, trigger: ['blur', 'change']},
            {required: true}
          ],
        }
      }
    },
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
      if(this.action === '编辑'){
        this.rules.password = []
      }
      console.log('this.defaultData',this.defaultData);
    },
    methods: {
      update(formName){
        let vm = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.$emit('edit',this.tableData)
            // alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        
        // console.log(this.tableData,'tinajiadeliria')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    margin: 20px 30px 20px 10px;
  }
</style>


