
<template>
  <div>
    <el-tree
      :data="tableData"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      @check="checkNode">
    </el-tree>
      <!-- check-strictly -->

    <!-- <div class="buttons"> -->
      <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
      <!-- <el-button @click="setCheckedNodes">通过 node 设置</el-button> -->
      <!-- <el-button @click="setCheckedKeys">通过 key 设置</el-button> -->
      <!-- <el-button @click="resetChecked">清空</el-button> -->
    <!-- </div> -->
  </div>
</template>

<script>
  import {powerList,powerAdd,powerUpdate,powerStop} from '@/api/adminManage.js'
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
    })
    return [...new Set([...source])]
  }
  export default {
    props:{
      value:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        tableData:[]
      };
    },
    methods: {
      setCheckedKeys() {
        this.$nextTick(function(){
          let arr = []
          try {
            arr = this.value.split(',') || []
            arr.forEach(item=>{
              this.$refs.tree.setChecked(item,true);
            })
          } catch (error) {
            
          }
        })
      },
      checkNode(nodes,val){
        let child = val.checkedKeys
        let parent = val.halfCheckedKeys
        let arr = []
        arr = child.concat(child,parent)
        let result = [...new Set([...arr])]
        this.$emit('check',result.join(','))
        // console.log(result.join(','))
      },
      getData(parentId){
        let vm = this
        // vm.loading = true
          powerList(parentId).then(res=>{
            if(res.code === '0000' && res.data.length > 0){
              vm.tableData = res.data
              
              vm.getChild(vm.tableData)
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
        // console.log(this.tableData)
      },
    },
    created () {
      let vm = this
      async function foo(){
        await vm.getData(0)
      }
      foo()
      
    },
    watch: {
      tableData:{
        handler:function(val){
          this.setCheckedKeys()
        },
        deep:true,
      }
    }
  };
</script>
