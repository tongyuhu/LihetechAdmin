<template>
  <!-- <el-table
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
  </el-table> -->
  <el-form ref="form" :model="tableData" label-width="120px" size="mini">
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
    <el-form-item label="权限码">
      <el-input v-model="tableData.authCode"></el-input>
    </el-form-item>
    <el-form-item label="图标">
      <el-input v-model="tableData.icon"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="tableData.authSorting"></el-input>
    </el-form-item>
    
    
    <el-form-item size="mini">
      <el-button type="primary" @click="addHandler">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object,
        default:()=>{return {}}
      }
    },
    data() {
      
      return {
        tableData: this.defaultData
      }
    },
    methods: {
      addHandler(){
        // console.log(row,'tinajiadeliria')
        this.$emit('addChild',this.tableData)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
</style>


