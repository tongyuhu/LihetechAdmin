<template>
<div class="box">
  <el-form ref="form" :model="tableData" label-width="120px" size="mini">
    <el-form-item label="角色名称">
      <el-input v-model="tableData.roleName"></el-input>
    </el-form-item>
    <el-form-item label="权限id集合,分割">
      <el-input v-model="tableData.authsId"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="tableData.description"></el-input>
    </el-form-item>
    <el-form-item label="角色码">
      <el-input v-model="tableData.roleCode"></el-input>
    </el-form-item>
    
    
    <el-form-item size="mini">
      <el-button type="primary" @click="update">{{action}}</el-button>
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
      action:{
        type:String
      }
    },
    data() {
      
      return {
        tableData: this.defaultData,
        text:'更新'
      }
    },
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
    },
    methods: {
      update(){
        this.$emit('edit',this.tableData)
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


