<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <el-input placeholder=" 输入姓名、电话、邮箱" v-model="searchData" class="input-with-select">
          <span slot="prepend">搜索查询</span>
          <el-button slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
        </el-input>
      </div>
      <!-- <div class="button-wrap">
        <div>
          <el-button plain @click="addHandler">添加医院</el-button>
          <el-button plain @click="deleteHandle">批量删除</el-button>
        </div>
        <div class="hospital-num">
          <span>医院：共240</span>  
        </div>
      </div> -->
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="管理员姓名"
            show-overflow-tooltip>
          </el-table-column>
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
          <el-table-column
            prop="loginIp"
            label="登录ip"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="notes"
            label="操作备注">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="操作时间">
          </el-table-column>
          
          <!-- <el-table-column
            prop="phone"
            label="登录IP"
            show-overflow-tooltip>
          </el-table-column>
          
          
          <el-table-column
            prop="rolesId"
            label="角色id"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户id"
            show-overflow-tooltip>
          </el-table-column> -->
          
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
  </div>
</template>

<script>
import {adminLogList,doctorLogList,userLogList} from '@/api/sysManage'
export default {
  name:'hospital',
  components:{
  },
  data() {
    return {
      searchData:'',
      tableData:[
      ],
      currentPage:1,
      pageSize:10,
      pageTotal:0,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    logintype(type){
      let role = ''
      switch (type) {
        case 1:
          role = '用户登陆'
          break;
        case 2:
          role = '医生医院登陆'
          break;
        case 3:
          role = '管理员登陆'
          break;
      
        default:
          break;
      }
      return role
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val
      this.getData()
    },
    searchHandler(){
      this.pageNum = 1
      this.getData()
    },
    getData(){
      let vm = this
      let params = {
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      if(this.searchData){
        params.fields = this.searchData
      }
      adminLogList(params).then(res=>{
        if(res.code === '0000') { 
          vm.tableData = res.data
          vm.pageTotal = res.recordCount
        }
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
</style>
