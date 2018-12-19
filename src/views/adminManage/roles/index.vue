<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="button-wrap">
        <div>
          <el-button plain @click="addHandler">添加权限</el-button>
          <el-button plain @click="deleteHandle">批量删除</el-button>
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
            width="50"
            type="expand">
            <template slot-scope="scope">
              <!-- {{ scope.row.hospitalName }} -->
              <!-- <edit @closeDialog="closeHospitalDialog" :defaultData="currentHospital"></edit> -->
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="address"
            label="医院地址"
            width="120">
          </el-table-column>
          <el-table-column
            prop="admin"
            label="管理员"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="doctorAccount"
            label="医生账号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="jionTime"
            label="加入时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
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
    <el-dialog 
    title="" 
    :visible.sync="editDialog" 
    width="70%">
      <edit @closeDialog="closeHospitalDialog" :defaultData="currentHospital"></edit>
    </el-dialog>
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
const roles = [ 'hospital','hospitalAdd','hospitalEdit','hospitaldEelete',
                'user','userAdd','userEdit','userdEelete',
                'message','messageEdit','messagedEelete',
                'info','infoAdd','infoEdit','infodEelete',
                'sys',
                'admin','adminAdd','adminEdit','admindEelete']
import edit from './edit'
export default {
  name:'hospital',
  components:{
    edit
  },
  data() {
    return {
      searchData:'',
      editDialog:false,
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
      this.editDialog=true
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
      this.editDialog = false
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
