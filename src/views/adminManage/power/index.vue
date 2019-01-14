<template>
  <div class="wrap" v-loading="loading">
    <el-card :body-style="{'padding':'20px'}">
      <div class="button-wrap">
        <div>
          <!-- <el-button plain @click="addHandler">添加医院</el-button> -->
          <el-button plain @click="addHandler">添加权限</el-button>
        </div>
      </div>
      <treeTable :data="tableData" :eval-func="func"  :eval-args="args" :expand-all="expandAll">
        <!-- <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isStop"></el-checkbox>
          </template>
        </el-table-column> -->
        <el-table-column label="权限地址名称" width="120">
          <template slot-scope="scope">
            <span :class="{'gray-font':scope.row.isStop}">{{ scope.row.authName }}</span>
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
        <!-- <el-table-column label="权限码" >
          <template slot-scope="scope">
            <span>{{ scope.row.authCode }}</span>
          </template>
        </el-table-column> -->
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
        <el-table-column label="停用状态" >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isStop"
              active-color="#ff4949"
              inactive-color="#13ce66"
              @change="stopHandler(scope.row)">
            </el-switch>
            <!-- <span>{{ scope.row.isStop===true ? '是':'否'}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="addHandler(scope.row)">添加</el-button> -->
            <el-button type="text" @click="updateHandler(scope.row)">更新</el-button>
            <!-- <el-button type="text" @click="stopHandler(scope.row)">停/启用</el-button> -->
            <!-- <el-switch
              v-model="scope.row.isStop"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="stopHandler(scope.row)">
            </el-switch> -->
            <!-- <el-button v-if="scope.row.parentId" type="text" @click="deleteHandle(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </treeTable>
    </el-card>
    <el-dialog 
    title="" 
    :visible.sync="addDialog" 
    width="70%"
    center>
      <span slot="title">添加权限</span>
      <add @addChild ="addChildHandler" :defaultData="childrenData" :power="tableData"></add>
    </el-dialog>
    <el-dialog 
    title="" 
    :visible.sync="updateDialog" 
    v-if="updateDialog" 
    width="60%"
    center>
      <span slot="title">更新权限</span>
      <update  @update ="updateChildHandler" :defaultData="updateChildrenData" :power="tableData"></update>
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
function addChild(source,child){
  source.forEach(item=>{
    if(!item.children){
      item.children = []
    }
    if(item.id === child.parentId){
      // if(item.chi)
      // let is = false
      //   item.children.forEach(i => {
      //     if(i.id===child.id){
      //       is = true
      //     }
      //   })
        // if(!is){
          item.children.push(child)
        // }
    }else{
      if(item.children){
        addChild(item.children,child)
      }
    }
    if(item.children.length === 0){
      delete item['children']
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
      item.isStop = item.isStop
      // console.log(item.isStop,'gengg ')
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
      childrenData:{},
      updateChildrenData:{},
      loading:false,
      parents:[],
      childs:[],
      complete:false,
      // parentId:''
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
      // vm.childrenData = {
      //   parentId:row.id
      // }
      vm.addDialog = true
      // async function getChild() {
      //     await powerList(row.id).then(res=>{
      //       if(res.code === '0000'){
      //         res.data.forEach(item => {
      //           item.add = false
      //         })
      //         vm.childrenData =  res.data
      //         vm.addDialog = true
      //       }
      //     })
      // }
      // getChild()
      // console.log( vm.childrenData,'zi')
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
      // vm.loading = true
        powerList(parentId).then(res=>{
          if(res.code === '0000' && res.data.length > 0){
            vm.tableData = res.data
            
            vm.getChild(vm.tableData)
            // vm.parents = res.data
            // vm.getChild(vm.parents)
            // vm.getChild(res.data)
            // vm.loading = false
          }
        })
    },
    getChild(parent){
      let vm = this
      // let source = []
      function getChildren(parent){
        if(parent.length>0){
          parent.forEach(item=>{
            async function foo(){

              await powerList(item.id).then(res=>{
                res.data.forEach(item=>{
                  // let source = addChild(vm.parents,item)
                  let source = addChild(vm.tableData,item)
                  // vm.$set(vm.$data,'parents',[...source])
                  vm.$set(vm.$data,'tableData',[...source])
                })

                getChildren(res.data)
              })
            }
            foo()
          })
          
        }
      }
      getChildren(parent)
      
    },
    addChildHandler(child){
      let vm = this
      if(child.parentId === 0){
        powerAdd(child).then(res=>{
          if(res.code === '0000'){
            // let arr = addChild(vm.tableData,child)
            // vm.$set(vm.$data,'tableData',[...arr])
            // console.log(vm.tableData,'liebiao')
            vm.tableData.push(child)
            vm.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addDialog = false
          }else{
            vm.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }else{
        powerAdd(child).then(res=>{
          if(res.code === '0000'){
            let arr = addChild(vm.tableData,child)
            vm.$set(vm.$data,'tableData',[...arr])
            console.log(vm.tableData,'liebiao')
            vm.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addDialog = false
          }else{
            vm.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }
    },
    updateChildHandler(child){
      let vm = this
      if(child.parentId === 0){
        
      }
      powerUpdate(child).then(res=>{
        if(res.code === '0000'){
          let arr = updateChild(vm.tableData,child)
          vm.$set(vm.$data,'tableData',[...arr])
          vm.updateDialog = false
          vm.$message({
            message: '更新成功',
            type: 'success'
          })
          this.updateDialog = false
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
      console.log('onoff',child.isStop)
      powerStop(child).then(res=>{
        if(res.code === '0000'){
          let arr = stopChild(vm.tableData,child)
          vm.$set(vm.$data,'tableData',[...arr])
          console.log(vm.tableData,'stop',child)
          let text = ''
          if(!child.isStop){
            text = '开启'
          }
          if(child.isStop){
            text = '停用'
          }
          vm.$message({
            message: text+ '成功',
            type: 'success'
          })
        }else{
          vm.$message({
            message: '停/启用失败',
            type: 'error'
          })
        }
      })
      
    },
  },
  created () {
    this.getData(0)
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
  .gray-font{
    color: #999;
  }
</style>
