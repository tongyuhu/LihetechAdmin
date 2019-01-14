<template>
<div class="box">
  <el-form ref="form" :model="tableData" label-width="120px" size="mini">
    <el-form-item label="权限地址名称">
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
    <el-form-item label="权限地址名称">
      <el-input v-model="tableData.authName"></el-input>
    </el-form-item>
    <el-form-item label="url地址">
      <el-input v-model="tableData.authUrl"></el-input>
    </el-form-item>
    <!-- <el-form-item label="类型">
      <el-input v-model="tableData.authType"></el-input>
    </el-form-item> -->
    <el-form-item label="类型">
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
      <el-button type="primary" @click="update">更新</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
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
      }
    },
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
    },
    methods: {
      update(){
        this.$emit('update',this.tableData)
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


