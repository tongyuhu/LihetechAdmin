<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <el-input placeholder="请输入留言信息" v-model="searchData" class="input-with-select">
          <span slot="prepend">搜索信息</span>
          <el-button slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
        </el-input>
      </div>
      <div class="button-wrap">
        <div>
          <!-- <el-button plain @click="addHandler">添加医院</el-button> -->
          <!-- <el-button plain @click="deleteHandle">批量删除</el-button> -->
        </div>
        <div class="hospital-num">
          <span>意见：共{{pageTotal}}</span>  
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
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="realame"
            label="用户姓名">
            <template slot-scope="scope">{{ scope.row.realame }}</template>
          </el-table-column>
          <el-table-column
            prop="feedDesc"
            label="意见反馈"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="dealWithContent"
            label="处理意见"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="处理人姓名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="isProcessed"
            label="是否处理"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.isProcessed === 1 ? '已处理' : '未处理' }}</template>
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="账号状态"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            label="操作"
            width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editHandler(scope.row)">处理建议</el-button>
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
      <span slot="title">处理建议</span>
      <edit @edit="editSuggest" v-if="editDialog" :suggest="currentSuggest" @closeDialog="closeDialog"></edit>
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
import edit from './edit'
import {suggestList,suggestSubmit } from '@/api/messageManage.js'
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
      ],
      multipleSelection: [],
      currentPage:1,
      pageSize:10,
      pageTotal:0,
      deleteConfirm:false,
      currentSuggest:{}
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
      this.currentPage = 1
      this.getData()
    },
    editHandler(val){
      this.currentSuggest = val
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
  
    deleteConfirmHandler(){
      this.deleteConfirm = false
    },
    getData(){
      let vm = this
      let params = {
        pageNum:vm.currentPage,
        pageSize:vm.pageSize
      }
      if(vm.searchData){
        params.fields = vm.searchData
      }
      suggestList(params).then(res=>{
        if(res.code === '0000'){
          vm.tableData = res.data
          vm.pageTotal = res.recordCount
        }
      })
    },
    editSuggest(suggest){
      let vm = this
      suggestSubmit(suggest).then(res=>{
        if(res.code === '0000'){
          vm.$message({
            message: '修改成功',
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
    },
    closeDialog(){
      this.editDialog = false
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
