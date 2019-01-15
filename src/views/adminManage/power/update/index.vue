<template>
<div class="box">
  <el-form ref="powerEditform" :model="tableData" label-width="120px" size="mini" :rules="rules">
    <el-form-item label="上级权限地址">
      <el-cascader
        :options="powerLists"
        :props="props"
        change-on-select
        clearable
        :show-all-levels="false"
        :style="{width:'50%'}"
        @change="handlePowerChange"
      ></el-cascader>
    </el-form-item>
    <!-- <el-form-item label="权限地址名称">
      <el-input v-model="tableData.authName"></el-input>
    </el-form-item> -->
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
    <!-- <el-form-item label="权限码">
      <el-input v-model="tableData.authCode"></el-input>
    </el-form-item> -->
    <el-form-item label="图标">
      <el-input v-model="tableData.icon"></el-input>
    </el-form-item>
    
    
    <el-form-item size="mini">
      <el-button type="primary" @click="update('powerEditform')">更新</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
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
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
    },
    methods: {
      update(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$emit('update',this.tableData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
        console.log(this.tableData,'tinajiadeliria')
      },
      handlePowerChange(val){
        console.log('val',val)
        if(val.length > 0){
          this.tableData.parentId = val[val.length-1]
        }else{
          this.tableData.parentId = this.tableData.parentId
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    margin: 20px 30px 20px 10px;
  }
</style>


