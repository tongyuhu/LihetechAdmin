
<template>
  <div>
    <el-cascader
      :options="options"
      @active-item-change="handleItemChange"
      :props="props"
      :style="{width:'100%'}"
    ></el-cascader>
  </div>
</template>



<script>
  import {hospitalList} from '@/api/hospitalManage.js'
  import {doctorList} from '@/api/commons/doctorList.js'
  export default {
    props:{
      hospital:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    data() {
      return {
        options: [],
        props: {
          value: 'value',
          label:'label',
          children: 'children'
        },
        // hospitalList
      };
    },

    methods: {
      handleItemChange(val) {
        let vm = this
        console.log('active item:', val);
        doctorList(val[0]).then(res=>{
          res.data.forEach(item=>{
            item.label = item.name
            item.value = item.id
          })
          vm.options.forEach(item=>{
            if(item.value === val[0]){
              item.children = res.data
            }
          })
        })
      },
      getHospitalList(){
        let vm = this
        hospitalList({
          pageNum:1,
          pageSize:9999
        }).then(res=>{
          res.data.forEach(item => {
            item.label = item.hospitalName
            item.value = item.id
            item.children = []
          });
          vm.options = res.data
        })
      }
    },
    created(){
      this.getHospitalList()
    }
  };
</script>