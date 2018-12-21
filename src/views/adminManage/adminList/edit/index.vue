<template>
<div class="box">
  <el-form ref="form" :model="tableData" label-width="120px" size="mini">
    <el-form-item label="用户名">
      <el-input v-model="tableData.username"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="tableData.mobile"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名">
      <el-input v-model="tableData.name"></el-input>
    </el-form-item>
    <el-form-item label="原始密码">
      <el-input v-model="tableData.password"></el-input>
    </el-form-item>
    <el-form-item label="角色id集合,分割">
      <el-input v-model="tableData.rolesId"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="tableData.email"></el-input>
    </el-form-item>
    <el-form-item label="主键编号" v-if="action === '更新'">
      <el-input v-model="tableData.id"></el-input>
    </el-form-item>
    <el-form-item label="当前用户版本号" v-if="action === '更新'">
      <el-input v-model="tableData.version"></el-input>
    </el-form-item>
    <el-form-item label="账号开启或停用" v-if="action === '更新'">
      <el-switch
        v-model="tableData.isStop"
        active-color="#ff4949"
        inactive-color="#13ce66">
      </el-switch>
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
        // text:'更新'
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


