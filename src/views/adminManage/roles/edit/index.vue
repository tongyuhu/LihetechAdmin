<template>
<div class="box">
  <el-form ref="roleForm" :model="tableData" label-width="120px" size="mini" :rules="rules">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="tableData.roleName"></el-input>
    </el-form-item>
    <!-- <el-form-item label="权限id集合,分割">
      <el-input v-model="tableData.authsId"></el-input>
    </el-form-item> -->
    <el-form-item label="描述">
      <el-input v-model="tableData.description"></el-input>
    </el-form-item>
    <el-form-item label="角色码" prop="roleCode">
      <el-input v-model="tableData.roleCode"></el-input>
    </el-form-item>
    <el-form-item label="权限分配" prop="authsId">
      <SelectPower v-model="tableData.authsId" @check="checkPower"></SelectPower>
    </el-form-item>
    
    
    <el-form-item size="mini">
      <el-button type="primary" @click="update('roleForm')">{{action}}</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import SelectPower from '@/components/SelectPower'
  import {checkPass,checkPhone,checkUserName,checkEmail,checkName} from '@/utils/formCheck.js'
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
    components:{
      SelectPower
    },
    data() {
      
      return {
        tableData: this.defaultData,
        text:'更新',
        rules: {
          roleName: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          roleCode: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          authsId: [
            { required: true, message: '请选择', trigger:  ['blur', 'change']}
          ],
        },
      }
    },
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
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
      checkPower(val){
        this.tableData.authsId = val
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    margin: 20px 30px 20px 10px;
  }
</style>


