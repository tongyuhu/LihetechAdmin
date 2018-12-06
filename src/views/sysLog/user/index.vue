<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <el-input placeholder="输入用户名称、电话、邮箱" v-model="searchData" class="input-with-select">
          <span slot="prepend">搜素查询</span>
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
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="hospitalName"
            label="用户姓名"
            width="120">
            <template slot-scope="scope">{{ scope.row.hospitalName }}</template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="联系电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="邮箱"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="登录IP"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="email"
            label="操作类型"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="doctorAccount"
            label="操作备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="jionTime"
            label="操作时间"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="账号状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addHandler">编辑</el-button>
              </template>
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
    <!-- <el-dialog 
    title="" 
    :visible.sync="editDialog" 
    width="70%">
      <edit @closeDialog="closeHospitalDialog" :defaultData="currentHospital"></edit>
    </el-dialog> -->
    <el-dialog 
    title="" 
    :visible.sync="deleteConfirm" 
    width="50%"
    center
    >
    <div class="center-text">
      <el-button type="primary" @click="deleteConfirmHandler">确定</el-button>
      <el-button type="default" @click="deleteConfirm=false">取消</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'hospital',
  components:{
  },
  data() {
    return {
      searchData:'',
      tableData:[
        {
          hospitalName: '立阖泰',
          address: '上海市普陀区金沙江路 1518 弄',
          admin:'张文纪',
          phone:'1520365259',
          email:"125@qq.com",
          doctorAccount:"3",
          jionTime:"2015-2-5",
          status:'禁用'
        },
        {
          hospitalName: '立阖泰',
          address: '上海市普陀区金沙江路 1518 弄',
          admin:'张文纪',
          phone:'1520365259',
          email:"125@qq.com",
          doctorAccount:"3",
          jionTime:"2015-2-5",
          status:'禁用'
        },
        {
          hospitalName: '立阖泰',
          address: '上海市普陀区金沙江路 1518 弄',
          admin:'张文纪',
          phone:'1520365259',
          email:"125@qq.com",
          doctorAccount:"3",
          jionTime:"2015-2-5",
          status:'禁用'
        }
      ],
      multipleSelection: [],
      currentPage:1,
      pageSize:1,
      pageTotal:40,
      deleteConfirm:false,
      currentHospital:{}
    }
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    searchHandler(){},
    addHandler(){
      // this.editDialog=true
    },
    deleteHandle(){
      if(this.multipleSelection.length>0){
        this.deleteConfirm = true
      }else{
        this.$message({
          message: '请选择医院',
          type: 'warning'
        });
      }
    },
    closeHospitalDialog(){
      // this.editDialog = false
    },
    deleteConfirmHandler(){
      this.deleteConfirm = false
    },
    getData(){

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
