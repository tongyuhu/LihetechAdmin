<template>
  <keep-alive>
    <div class="wrap">
      <el-card :body-style="{'padding':'20px'}">

      <treeTable :data="tableData" :eval-func="func" :eval-args="args" :expand-all="expandAll">
        <!-- <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isStop"></el-checkbox>
          </template>
        </el-table-column> -->
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
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="text" @click="addHandler(scope.row)">添加</el-button>
            <el-button type="text" @click="updateHandler(scope.row)">更新</el-button>
            <el-button type="text" @click="stopHandler(scope.row)">停/启用</el-button>
            <!-- <el-button v-if="scope.row.parentId" type="text" @click="deleteHandle(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </treeTable>
      </el-card>
      <el-dialog 
      title="" 
      :visible.sync="addDialog" 
      width="70%">
        <add @addChild ="addChildHandler" :defaultData="childrenData"></add>
      </el-dialog>
      <el-dialog 
      title="" 
      :visible.sync="updateDialog" 
      v-if="updateDialog" 
      width="60%">
        <update  @update ="updateChildHandler" :defaultData="updateChildrenData"></update>
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
  </keep-alive>
</template>
<script>
function addChild(source,child){
  source.forEach(item=>{
    if(!item.children){
      item.children = []
    }
    if(item.id === child.parentId){
      // if(item.chi)
      let is = false
        item.children.forEach(i => {
          if(i.id===child.id){
            is = true
          }
        })
        if(!is){
          item.children.push(child)
        }
    }else{
      if(item.children){
        addChild(item.children,child)
      }
    }
  })
  return new Set([...source])
}
function deleteChild(source,child){
  source.forEach((item,index)=>{

    if(item.children){
      item.children.forEach((ch,i)=>{
        if(ch.id === child.id){
          item.children.splice(i,1)
        }
      })
      deleteChild(item.children,child)
    }
  })
  return new Set([...source])
}
function updateChild(source,child){
  source.forEach((item,index)=>{
    if(item.children){
      // item.children.forEach((ch,i)=>{
        if(item.id === child.id){
          item = child
        }
      // })
      deleteChild(item.children,child)
    }
  })
  return new Set([...source])
}
function stopChild(source,child){
  source.forEach((item,index)=>{
    if(item.id === child.id){
      item.isStop = !item.isStop
      console.log(item.isStop,'gengg ')
    }else{
      if(item.children){
        stopChild(item.children,child)
      }
    }
  })
  return new Set([...source])
}

import add from './add'
import update from './update'
import {powerList,powerAdd,powerUpdate,powerStop} from '@/api/adminManage.js'
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'
export default {
  name:'admin-power',
  components:{
    add,
    update,
    treeTable
  },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      addDialog:false,
      updateDialog:false,
      args: [null, null, 'timeLine'],
      tableData:[],
      deleteConfirm:false,
      childrenData:[],
      updateChildrenData:{},
    }
  },
  methods: {

    updateHandler(row){
      console.log(row,'updateHandler')
      let vm = this
      this.updateChildrenData = row
      vm.updateDialog = true
    },
    addHandler(row){
      console.log(row,'tianjia')
      let vm = this
      async function getChild() {
          await powerList(row.id).then(res=>{
            if(res.code === '0000'){
              res.data.forEach(item => {
                item.add = false
              })
              vm.childrenData =  res.data
              vm.addDialog = true
            }
          })
      }
      getChild()
      console.log( vm.childrenData,'zi')
    },
    deleteHandle(row){
      let arr = deleteChild(this.tableData,row)
      this.$set(this.$data,'tableData',[...arr])
      console.log(this.tableData,'deleted',row)
    },
    deleteConfirmHandler(){
      this.deleteConfirm = false
    },
    getData(parentId){
      let vm = this
        powerList(parentId).then(res=>{
          if(res.code === '0000' && res.data.length > 0){
            vm.tableData = res.data
          }
        })
    },
    addChildHandler(child){
      let vm = this
      powerAdd(child).then(res=>{
        if(res.code === '0000'){
          let arr = addChild(vm.tableData,child)
          vm.$set(vm.$data,'tableData',[...arr])
          console.log(vm.tableData,'liebiao')
          vm.$message({
            message: '添加成功',
            type: 'success'
          })
        }else{
          vm.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      })
    },
    updateChildHandler(child){
      let vm = this
      powerUpdate(child).then(res=>{
        if(res.code === '0000'){
          let arr = updateChild(vm.tableData,child)
          vm.$set(vm.$data,'tableData',[...arr])
          vm.updateDialog = false
          vm.$message({
            message: '更新成功',
            type: 'success'
          })
        }else{
          vm.$message({
            message: '更新失败',
            type: 'error'
          })
        }
      })
      
    },
    stopHandler(child){
      let vm = this
      powerStop(child).then(res=>{
        if(res.code === '0000'){
          let arr = stopChild(vm.tableData,child)
          vm.$set(vm.$data,'tableData',[...arr])
          console.log(vm.tableData,'stop',child)
          vm.$message({
            message: '停/启用成功',
            type: 'success'
          })
        }else{
          vm.$message({
            message: '停/启用失败',
            type: 'error'
          })
        }
      })
      
    }
  },
  created () {
    this.getData(0)
    // console.log('no-alive')
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
