<template>
<div class="box">
  <el-form ref="adminListForm" :model="tableData" label-width="120px" size="mini" :rules="rules">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="tableData.username"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="tableData.mobile"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="tableData.name"></el-input>
    </el-form-item>
    <el-form-item label="原始密码" prop="password">
      <el-input v-model="tableData.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="tableData.email"></el-input>
    </el-form-item>
    <el-form-item label="角色分配" prop="rolesId">
      <SelectRole v-model="tableData.rolesId" @check="changeRole"></SelectRole>
      <!-- <SelectRole></SelectRole> -->
    </el-form-item>
    <el-form-item label="账号开启或停用" v-if="action === '编辑'">
      <el-switch
        v-model="tableData.isStop"
        active-color="#ff4949"
        inactive-color="#13ce66">
      </el-switch>
    </el-form-item>
    <el-form-item size="mini">
      <el-button type="primary" @click="update('adminListForm')">{{action}}</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import SelectRole from '@/components/SelectRole'
  import {checkPass,checkPhone,checkUserName,checkEmail,checkName} from '@/utils/formCheck.js'
  export default {
    name:'edit',
    components: {
      SelectRole
    },
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
        rules: {
          username: [
            { validator: checkUserName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          mobile: [
            { validator: checkPhone, trigger: ['blur', 'change']},
            {required: true}
          ],
          name: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          password: [
            { validator: checkPass, trigger: ['blur', 'change']},
            {required: true}
          ],
          email: [
            { validator: checkEmail, trigger: ['blur', 'change'] },
            {required: true}
          ],
          rolesId: [
            { required: true, message: '请选择角色', trigger:  ['blur', 'change']}
          ]
        },
        // text:'编辑'
      }
    },
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
      if(this.action === '编辑'){
        this.rules.password = []
      }
    },
    methods: {
      update(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$emit('edit',this.tableData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // this.$emit('edit',this.tableData)
        // console.log(this.tableData,'tinajiadeliria')
      },
      changeRole(val){
        this.tableData.rolesId = val
        console.log(val,'角色id')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    margin: 20px 30px 20px 10px;
  }
</style>


