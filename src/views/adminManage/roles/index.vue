<template>
  <div class="wrap">
    <el-card :body-style="{'padding':'20px'}">
      <div class="button-wrap">
        <div>
          <el-button plain @click="addHandler('add')">添加角色</el-button>
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
            prop="roleName"
            label="角色名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="roleCode"
            label="角色码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            prop="authsId"
            label="权限id集合"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            prop="authName"
            label="权限名称集合"
            >

            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="bottom">
                <span slot="content" class="long-text">{{scope.row.authName}}</span>
                <span>{{scope.row.authName.slice(0,10)}}</span>
              <!-- <el-button>下左</el-button> -->
            </el-tooltip>
              
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.createTime | joinTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="modifyTime"
            label="更新时间"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.modifyTime | joinTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addHandler('update',scope.row)">更新</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog 
    title="" 
    :visible.sync="editDialog"
    width="70%"
    center>
      <span slot="title">{{action+"角色"}}</span>
      <edit v-if="editDialog" @edit="editHanler" :defaultData="currentEdit" :action="action"></edit>
    </el-dialog>
  </div>
</template>
<script>

import edit from './edit'
import {roleList,roleAdd,roleUpdate} from '@/api/adminManage.js'
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
      action:'更新'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    addHandler(action,role){
      if(action==='add'){
        this.action = '添加'
        this.currentEdit = {
          roleName:null,
          authsId:null,
          description:null,
          roleCode:null
        }
      }
      if(action==='update'){
        this.action = '更新'
        this.currentEdit = role
      }
      this.editDialog=true
    },
    getData(){
      roleList().then(res=>{
        if(res.code === '0000'){

          this.tableData = res.data
        }
      })
    },
    editHanler(role){
      let vm = this
      if(this.action==='添加'){
        console.log('add',role)
        roleAdd(role).then(res=>{
          if(res.code==='0000'){
            this.tableData.push(role)
            vm.$message({
              message: '添加成功',
              type: 'success'
            })
            this.editDialog = false
          }else{
            vm.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }
      if(this.action==='更新'){
        roleUpdate(role).then(res=>{
          if(res.code==='0000'){
            this.tableData.forEach((item,index)=>{
              if(item.id === role.id){
                this.tableData.splice(index,1,role)
              }
            })
            vm.$message({
              message: '更新成功',
              type: 'success'
            })
            this.editDialog = false
          }else{
            vm.$message({
              message: '更新失败',
              type: 'error'
            })
          }
        })
        
        // this.tableData.push(role)
        console.log('update',role)
      }
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
  .long-text{
    // display: inline-block;
    // max-width: 80%;
    // padding:0 30px;
    // text-align: center;
  }
  .item{
    // display: inline-block;
    // max-width: 50%;
  }
  // .popper-class{
  //   position: absolute;
  //   border-radius: 4px;
  //   padding: 10px;
  //   z-index: 2000;
  //   font-size: 12px;
  //   line-height: 1.2;
  //   min-width: 10px;
  //   max-width: 80%;
  // }
</style>
<style>
.el-tooltip__popper{
  position: absolute;
  border-radius: 4px;
  padding: 10px;
  z-index: 2000;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  max-width: 80%;
}
</style>

