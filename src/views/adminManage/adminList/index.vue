<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <el-input placeholder="输入用户名称、电话、邮箱、绑定医生姓名" v-model="searchData" class="input-with-select">
          <span slot="prepend">搜索查询</span>
          <el-button slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
        </el-input>
      </div>
      <div class="button-wrap">
        <div>
          <el-button plain @click="addHandler('add')">添加管理员</el-button>
        </div>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          >
          
          <el-table-column
            type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="证件号码">
                  <span>{{ props.row.idCardNo }}</span>
                </el-form-item>
                <el-form-item label="最后登录IP">
                  <span>{{ props.row.loginIp }}</span>
                </el-form-item>
                <el-form-item label="最后登录日期">
                  <span>{{ props.row.loginDate }}</span>
                </el-form-item>
                <el-form-item label="角色id集合">
                  <span>{{ props.row.rolesId }}</span>
                </el-form-item>
                <el-form-item label="最后修改人员id">
                  <span>{{ props.row.operatId }}</span>
                </el-form-item>
                <el-form-item label="版本号">
                  <span>{{ props.row.version }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="管理员姓名"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            prop="username"
            label="用户名">
          </el-table-column> -->
          <el-table-column
            prop="mobile"
            label="联系电话"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            show-overflow-tooltip>
          </el-table-column>
          
          <!-- <el-table-column
            prop="idCardNo"
            label="证件号码"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="password"
            label="密码"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="sex"
            label="性别"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.sex | sex}}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            label="是否启用"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.enabled === true ? "是":'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否锁定"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.locked === true ? "是":'否'}}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="loginFailureCount"
            label="连续登录失败次数"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="lockedDate"
            label="锁定日期"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="loginIp"
            label="最后登录IP"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="loginDate"
            label="最后登录日期"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            prop="createTime"
            label="加入时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="账号状态"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.isStop === true ? "停用":'开启'}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="rolesId"
            label="角色id集合"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="operatId"
            label="最后修改人员id"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="version"
            label="版本号"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            label="操作"
            width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addHandler('update',scope.row)">编辑</el-button>
              </template>
          </el-table-column>
        </el-table>
        <div class="page-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog 
    title="" 
    :visible.sync="editDialog"
    width="70%"
    center>
      <span slot="title">{{action+'管理员'}}</span>
      <edit v-if="editDialog" @edit="editHanler" :defaultData="currentEdit" :action="action"></edit>
    </el-dialog>
  </div>
</template>
<script>

import edit from './edit'
import {adminList,adminUpdate,adminAdd} from '@/api/adminManage.js'

export default {
  name:'hospital',
  components:{
    edit
  },
  data() {
    return {
      editDialog:false,
      tableData:[],
      currentEdit:{},
      action:'编辑',
      searchData:'',
      currentPage:1,
      pageSize:10,
      pageTotal:40,
      
    }
  },
  created() {
    this.getData({
      pageNum:this.currentPage,
      pageSize:this.pageSize,
    })
  },
  methods: {
    addHandler(action,admin){
      if(action==='add'){
        this.action = '添加'
        this.currentEdit = {
          rolesId:null,
          // authsId:null,
          // description:null,
          // roleCode:null
        }
      }
      if(action==='update'){
        this.action = '编辑'
        admin.password = ''
        this.currentEdit = admin
      }
      this.editDialog=true
    },
    getData(params){
      adminList(params).then(res=>{
        if(res.code === '0000'){
          this.tableData = res.data
          res.data.forEach(item=>{
            if(!item.rolesId){
              item.rolesId === ''
            }
          })
          this.pageTotal = res.recordCount
        }
      })
    },
    editHanler(admin){
      let vm = this
      if(this.action==='添加'){
        console.log('add',admin)
        adminAdd(admin).then(res=>{
          if(res.code==='0000'){
            vm.getData({
              pageNum:this.currentPage,
              pageSize:this.pageSize,
            })
            vm.$message({
              message: '添加成功',
              type: 'success'
            })
            this.editDialog = false
          }else{
            vm.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }
      if(this.action==='编辑'){
        adminUpdate(admin).then(res=>{
          if(res.code==='0000'){
            vm.getData({
              pageNum:this.currentPage,
              pageSize:this.pageSize,
            })
            vm.$message({
              message: '更新成功',
              type: 'success'
            })
            this.editDialog = false
          }else{
            vm.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        
        // this.tableData.push(admin)
        console.log('update',admin)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData({
        pageSize:val,
        pageNum:1
      })
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData({
        pageSize:this.pageSize,
        pageNum:val
      })
      console.log(`当前页: ${val}`);
    },
    searchHandler(){
      this.getData({
        pageSize:this.pageSize,
        pageNum:1,
        fields:this.searchData
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap{
    margin: 20px;
  }
  .search-wrap{
    width: 450px;
  }
  .button-wrap{
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hospital-num{
      margin-right: 30px;
    }
  }
  .page-wrap{
    margin-top:20px;
  }
  .center-text{
    text-align: center;
  }
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
