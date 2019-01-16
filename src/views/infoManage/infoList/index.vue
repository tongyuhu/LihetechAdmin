<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="search-wrap">
        <div>

          <el-input placeholder="请输入资讯标题" v-model="searchData" class="input-with-select">
            <span slot="prepend">搜索资讯</span>
            <el-button slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
          </el-input>
        </div>
        <div>
          <el-button plain @click="addHandler(false)">添加资讯</el-button>
        </div>
      </div>
      <div class="button-wrap">
        <div>
          <!-- <el-button plain @click="addHandler(false)">添加资讯</el-button> -->
          <!-- <el-button plain @click="deleteHandle">批量停用</el-button>
          <el-button plain @click="deleteHandle">批量启用</el-button> -->
        </div>
        <!-- <div class="hospital-num">
          <span>资讯：共240</span>  
        </div> -->
      </div>
      <div class="button-wrap">
        <div>
          <el-form label-position="right" :inline="true" >
            <el-form-item label="资讯类型">
              <el-radio-group v-model="inforTypeSmall" @change="inforTypeSmallChange">
                <el-radio-button :label="1">资讯</el-radio-button>
                <el-radio-button :label="2">讲座</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="资讯总分类" label-width="100px" >
              <el-radio-group v-model="inforTypeBig" @change="inforTypeBigChange">
                <el-radio-button :label="1">高血压</el-radio-button>
                <el-radio-button :label="2">糖尿病</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- <el-button plain @click="addHandler(false)">添加资讯</el-button>
          <el-button plain @click="deleteHandle">批量停用</el-button>
          <el-button plain @click="deleteHandle">批量启用</el-button> -->
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
            prop="inforTitle"
            label="资讯标题"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.inforTitle }}</template>
          </el-table-column>
          <el-table-column
            prop="inforDesc"
            label="资讯简述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="inforTypeSmall"
            label="资讯分类"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.inforTypeSmall|inforSmall}}
            </template>
          </el-table-column>
          <el-table-column
            prop="inforTypeBig"
            label="视频大分类"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.inforTypeBig|inforBig}}
            </template>
          </el-table-column>
          <el-table-column
            prop="readNum"
            label="阅读次数"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="praiseNum"
            label="点赞次数"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="transmitNum"
            label="转发次数"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addHandler(scope.row)">编辑</el-button>
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
    width="70%">
      <edit @closeDialog="closeHospitalDialog" :defaultData="currentHospital"></edit>
    </el-dialog>
    <el-dialog 
    title="确认删除" 
    :visible.sync="deleteConfirm" 
    width="50%"
    center
    >
    <div class="center-text">
      <!-- <span slot="title">确认删除</span> -->
      <el-button type="primary" @click="deleteConfirmHandler">确定</el-button>
      <el-button type="default" @click="deleteConfirm=false">取消</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import edit from './edit'
import {infoList} from '@/api/infoManage.js'
export default {
  name:'hospital',
  components:{
    edit
  },
  filters: {
    inforSmall: function (value) {
      if (!value) return ''
      let text = ''
      switch (value) {
        case 1:
          text = '基础知识' 
          break;
        case 2:
          text = '生活管理 ' 
          break;
        case 3:
          text = '视频讲座 ' 
          break;
        case 4:
          text = '并发症 ' 
          break;
      
        default:
          text = ''
          break;
      }
      return text
    },
    inforBig: function (value) {
      if (!value) return ''
      let text = ''
      switch (value) {
        case 1:
          text = '高血压' 
          break;
        case 2:
          text = '糖尿病 ' 
          break;
        default:
          text = ''
          break;
      }
      return text
    }
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
      currentHospital:{},
      inforTypeSmall:1,
      inforTypeBig:1
    }
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
      console.log(`当前页: ${val}`);
    },
    searchHandler(){
      this.currentPage = 1
      this.getData()
    },
    addHandler(val){
      console.log('info',val)
      if(val){
        this.$router.push({ name: 'editInfo', params: {data:val,type:'edit'}})
      }else{
        this.$router.push({ name: 'editInfo', params: {type:'add',data:{}}})
      }
    },
    deleteHandle(){
      if(this.multipleSelection.length>0){
        this.deleteConfirm = true
      }else{
        this.$message({
          message: '请选择资讯',
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
      
      let params = {
        isStop:0,
        inforTypeSmall:this.inforTypeSmall,
        inforTypeBig:this.inforTypeBig,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }
      if(this.searchData){
        params.valueLike = this.searchData
      }
      infoList(params).then(res=>{
        this.tableData = res.data.list
        this.pageTotal = res.recordCount
      })
    },
    inforTypeSmallChange(){
      this.getData()
    },
    inforTypeBigChange(){
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
  .wrap{
    margin: 20px;
  }
  .search-wrap{
    // width: 450px;
    display: flex;
    justify-content:space-between;
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
