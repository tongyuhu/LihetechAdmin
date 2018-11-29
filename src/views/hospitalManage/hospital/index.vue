<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <el-input placeholder="请输入医院名称/地址/管理员姓名/电话" v-model="searchData" class="input-with-select">
          <span slot="prepend">医院名称</span>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="button-wrap">
        <div>
          <el-button>添加医院</el-button>
          <el-button>批量删除</el-button>
        </div>
        <div class="hospital-num">
          <span>医院：共240</span>  
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
            prop="hospitalName"
            label="医院名称"
            width="120">
            <template slot-scope="scope">{{ scope.row.hospitalName }}</template>
          </el-table-column>
          <el-table-column
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
                <el-button type="text" size="small">编辑</el-button>
              </template>
          </el-table-column>
        </el-table>
        <div class="page-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
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
      currentPage:1
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap{
    margin: 20px;
  }
  .search-wrap{
    width: 60%;
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
</style>
