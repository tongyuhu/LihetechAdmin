<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="权限名称"
      width="180"
      prop="role">
    </el-table-column>
    <el-table-column
      label="查看">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.see"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      label="添加">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.add"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      label="修改">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.edit"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      label="删除">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.delete"></el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object
      }
    },
    data() {
      
      return {
        tableData: [
          {
            role:'医院管理',
            see:true,
            add:false,
            edit:true,
            delete:true
          },
          {
            role:'用户管理',
            see:true,
            add:false,
            edit:true,
            delete:true
          },
          {
            role:'消息管理',
            see:true,
            add:false,
            edit:true,
            delete:true
          },
          {
            role:'资讯管理',
            see:true,
            add:false,
            edit:true,
            delete:true
          },
          {
            role:'系统日志',
            see:true,
            add:false,
            edit:true,
            delete:true
          },
          {
            role:'管理员管理',
            see:true,
            add:false,
            edit:true,
            delete:true
          },
        ]
      }
    },
    methods: {
      
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
</style>


