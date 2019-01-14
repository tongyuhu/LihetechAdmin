<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <el-input placeholder="请输入用户名称/电话/邮箱/绑定医生姓名" v-model="searchData" class="input-with-select">
          <span slot="prepend">搜索用户</span>
          <el-button slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
        </el-input>
      </div>
      <div class="button-wrap">
        <div>
          <!-- <el-button plain @click="editHandler">添加医院</el-button> -->
          <!-- <el-button plain @click="deleteHandle">批量删除</el-button> -->
          <el-button plain @click="openUsers(true)">批量开启</el-button>
          <el-button plain @click="closeUsers">批量关闭</el-button>
        </div>
        <div class="hospital-num">
          <span>用户：共{{pageTotal}}</span>  
        </div>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="realName"
            label="用户姓名"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="lookUserInfo(scope.row)">
                {{ scope.row.realName ||scope.row.nickName|| ''}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="联系电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.sex|sex}}</template>
          </el-table-column>
          <el-table-column
            prop="bloodPressureType"
            label="高血压类型"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.bloodPressureType|bloodPressureType}}</template>
          </el-table-column>
          <el-table-column
            prop="adminIdMainDoctor"
            label="绑定医生编号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="joinHospitalTime"
            label="加入时间"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.joinHospitalTime|joinTime}}</template>
          </el-table-column>
          <!-- <el-table-column
            prop="jionTime"
            label="加入时间"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            prop="isStop"
            label="账号状态"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.isStop|isStop}}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>
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
    <span slot="title">编辑用户</span>
      <edit v-if="editDialog" :defaultData="editData" @edit="editUserInfo"></edit>
    </el-dialog>
    <el-dialog 
    title="" 
    :visible.sync="userInfoDialog" 
    width="80%"
    center
    >
      <span slot="title">用户详情</span>
      <info v-if="userInfoDialog" :defaultData="currentUserData"></info>
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
import info from './info'
import {userList,editUser,userOnOff} from '@/api/userManage'
export default {
  name:'hospital',
  components:{
    edit,
    info
  },
  data() {
    return {
      searchData:'',
      editDialog:false,
      tableData:[],
      multipleSelection: [],
      currentPage:1,
      pageSize:10,
      pageTotal:0,
      editData:{},
      userInfoDialog:false,
      currentUserData:{}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getData()
    },
    searchHandler(){
      let vm = this
      let params = {
        pageNum: 1,
        pageSize: this.pageSize,
        fields:this.searchData
      }
      userList(params).then((res)=>{
        if(res.code === '0000') {
          if(res.data.length>0){
            vm.tableData = res.data
          }
        }
        console.log(res,'用户列表')
      })
    },
    editHandler(row){
      this.editData = row
      this.editDialog=true
    },
    editUserInfo(user){
      let vm = this
      console.log('编辑的用户',user)
      editUser(user).then(res=>{
        if(res.code === '0000'){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // this.editDialog = false
          async function getdata() {
            await vm.getData()
            vm.editDialog = false
          }
          getdata()
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    deleteHandle(){
      if(this.multipleSelection.length>0){
        this.deleteConfirm = true
      }else{
        this.$message({
          message: '请选择用户',
          type: 'warning'
        });
      }
    },
    openUsers(open){
      let vm = this
      if(this.multipleSelection.length>0){
        let arr = []
        vm.multipleSelection.forEach(item => {
          arr.push(item.id)
        })
        
          let params = {
          ids:arr.join(','),
          isStop:open
        }
        userOnOff(params).then(res=>{
          if(res.code === '0000'){
            vm.$message({
              message: '修改成功',
              type: 'success'
            })
            async function getdata() {
              await vm.getData()
              vm.editDialog = false
            }
            getdata()
          }else{
            vm.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }else{
        vm.$message({
          message: '请选择用户',
          type: 'warning'
        });
      }
    },
    closeUsers(){
      this.openUsers(false)
    },
    closeHospitalDialog(){
      this.editDialog = false
    },
    getData(){
      let vm = this
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      if(this.fields){
        params.fields = this.fields
      }
      userList(params).then((res)=>{
        if(res.code === '0000') {
          if(res.data.length>0){
            vm.tableData = res.data
            vm.pageTotal = res.recordCount
          }
        }
        console.log(res,'用户列表')
      })
    },
    lookUserInfo(user){
      this.currentUserData = user
      this.userInfoDialog = true
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
</style>
