
<template>
  <div>
    <el-select v-model="checked" @change="check" multiple placeholder="请选择" :style="{width:'100%'}">
      <el-option
        v-for="item in tableData"
        :key="item.id + ''"
        :label="item.roleName"
        :value="item.id + ''">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {roleList,roleAdd,roleUpdate} from '@/api/adminManage.js'
  export default {
    props:{
      value:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        tableData:[],
        checked:[]
      };
    },
    watch:{
      value:{
        handler:(val)=>{
          let vm = this
          // vm.$nextTick(()=>{
            try {
              vm.checked = val.split(',')
            } catch (error) {
              // vm.checked = []
            }
          // })
        },
        deep:true,
        immediate:true
      }
    },
    methods: {
      getData(){

        let vm = this
        this.$nextTick(function(){
          roleList({pageNum:1,pageSize:999}).then(res=>{
            if(res.code === '0000' && res.data.length > 0){
              res.data.forEach(item => {
                item.value = item.id + ''
                vm.tableData.push(item)
              })
            }
          })
        })
      },
      check(val){
        this.$emit('check',val.join(','))
      }
    },
    created () {
      let vm = this
      try {
        vm.checked = vm.value.split(',')
      } catch (error) {
        
      }
      vm.getData()
    }
  };
</script>
