<template>
  <el-table
    :data="defaultData"
    style="width: 100%">
    <el-table-column label="权限地址名称" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.authName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限码" >
          <template slot-scope="scope">
            <span>{{ scope.row.authCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="url地址" >
          <template slot-scope="scope">
            <span>{{ scope.row.authUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图标" >
          <template slot-scope="scope">
            <span>{{ scope.row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限码" >
          <template slot-scope="scope">
            <span>{{ scope.row.authCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型 " >
          <template slot-scope="scope">
            <span>{{ scope.row.authType === 1 ? '页面' :'按钮'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" >
          <template slot-scope="scope">
            <span>{{ scope.row.authNote }}</span>
          </template>
        </el-table-column>
        <el-table-column label="停用" >
          <template slot-scope="scope">
            <span>{{ scope.row.isStop===true ? '是':'否'}}</span>
          </template>
        </el-table-column>
    
    <el-table-column
      label="添加">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.add" @change="addHandler(scope.row)"></el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Array,
        default:()=>{return []}
      }
    },
    data() {
      
      return {
        tableData: this.defaultData
      }
    },
    methods: {
      addHandler(row){
        // console.log(row,'tinajiadeliria')
        this.$emit('addChild',row)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
</style>


