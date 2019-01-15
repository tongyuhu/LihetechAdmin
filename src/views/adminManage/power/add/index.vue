<template>
  <el-form ref="powerAddForm" :model="tableData" label-width="120px" size="mini" :rules="rules">
    <el-form-item label="上级权限名称">
        <!-- :change-on-select="change" -->
      <el-cascader
        :options="powerLists"
        :props="props"
        change-on-select
        clearable
        :show-all-levels="false"
        :style="{width:'50%'}"
        @change="handlePowerChange"
      ></el-cascader>
        <!-- @active-item-change="handlePowerChange" -->
      <!-- <el-input v-model="tableData.authName"></el-input> -->
    </el-form-item>
    <el-form-item label="权限地址名称" prop="authName">
      <el-input v-model="tableData.authName"></el-input>
    </el-form-item>
    <el-form-item label="url地址" prop="authUrl">
      <el-input v-model="tableData.authUrl"></el-input>
    </el-form-item>
    <!-- <el-form-item label="类型">
      <el-input v-model="tableData.authType"></el-input>
    </el-form-item> -->
    <el-form-item label="类型" prop="authType">
      <el-select v-model="tableData.authType" placeholder="请选择">
        <el-option
          label="页面权限"
          :value="1">
        </el-option>
        <el-option
          label="按钮权限"
          :value="2">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="tableData.authNote"></el-input>
    </el-form-item>
    <el-form-item label="权限码" prop="authCode">
      <el-input v-model="tableData.authCode"></el-input>
    </el-form-item>
    <el-form-item label="图标">
      <el-input v-model="tableData.icon"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="tableData.authSorting"></el-input>
    </el-form-item>
    
    
    <el-form-item size="mini">
      <el-button type="primary" @click="addHandler('powerAddForm')">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {powerList,powerAdd,powerUpdate,powerStop} from '@/api/adminManage.js'
  import {checkPass,checkPhone,checkUserName,checkEmail,checkName} from '@/utils/formCheck.js'
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object,
        default:()=>{return {}}
      },
      power:{
        type:Array,
        default:()=>{return []}
      }
    },
    data() {
      
      return {
        tableData: this.defaultData,
        powerLists:this.power,
        props:{
          value: 'id',
          label:'authName',
          children: 'children'
        },
        change:false,
        rules: {
          username: [
            { validator: checkUserName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          mobile: [
            { validator: checkPhone, trigger: ['blur', 'change']},
            {required: true}
          ],
          authName: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          authUrl: [
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
          authType: [
            { required: true, message: '请选择', trigger:  ['blur', 'change']}
          ],
          authCode: [
            { required: true, message: '不能为空', trigger:  ['blur', 'change']}
          ]
        },
      }
    },
    methods: {
      addHandler(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('addChild',this.tableData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // console.log(row,'tinajiadeliria')
        
      },
      handlePowerChange(val){
        console.log('val',val)
        if(val.length > 0){
          this.tableData.parentId = val[val.length-1]
        }else{
          this.tableData.parentId = 0
        }
      }
    },
    created () {
      // this.getPower()
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
</style>


