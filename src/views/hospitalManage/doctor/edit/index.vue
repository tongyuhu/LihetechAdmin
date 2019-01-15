<template>
<div class="box">
  <el-form ref="doctorForm" :model="tableData" :rules="rules" label-width="120px" size="mini">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="tableData.username"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="tableData.mobile"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="tableData.name"></el-input>
    </el-form-item>
    <el-form-item label="原始密码" prop="password">
      <el-input v-model="tableData.password"></el-input>
    </el-form-item>
    <!-- <el-form-item label="所属医院的id">
      <el-input v-model="tableData.adminHospitalId"></el-input>
    </el-form-item> -->
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="tableData.email"></el-input>
    </el-form-item>
    <el-form-item label="所属医院">
      <el-select v-model="tableData.adminHospitalId" placeholder="请选择">
        <el-option
          v-for="item in hospitalList"
          :key="item.id"
          :label="item.hospitalName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    
    <!-- <el-form-item label="主键编号" v-if="action === '编辑'">
      <el-input v-model="tableData.id"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="当前用户版本号" v-if="action === '编辑'">
      <el-input v-model="tableData.version"></el-input>
    </el-form-item> -->
    <el-form-item label="账号开启或停用" v-if="action === '编辑'">
      <el-switch
        v-model="tableData.isStop"
        active-color="#ff4949"
        inactive-color="#13ce66">
      </el-switch>
    </el-form-item>
    
    
    <el-form-item size="mini">
      <el-button type="primary" @click="update('doctorForm')">{{action}}</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  
  import {hospitalList} from '@/api/hospitalManage.js'
  import {checkPass,checkPhone,checkUserName,checkEmail,checkName,checkNumber} from '@/utils/formCheck.js'
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object,
        default:()=>{return {}}
      },
      action:{
        type:String
      }
    },
    
    data() {
      
      return {
        tableData: this.defaultData,
        hospitalList:[],
        rules:{
          
          username: [
            { validator: checkUserName, trigger: ['blur', 'change'] },
            {required: true}
          ],
          mobile: [
            { validator: checkPhone, trigger: ['blur', 'change']},
            {required: true}
          ],
          name: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
            
          ],
          password: [
            { validator: checkPass, trigger: ['blur', 'change']},
            {required: true}
          ],
          email: [
            { validator: checkEmail, trigger: ['blur', 'change'] },
            {required: true}
          ],
          hospitalName: [
            { validator: checkName, trigger: ['blur', 'change'] },
            {required: true}
          ]
        }
        // text:'更新'
      }
    },
    created () {
      this.$set(this.$data,'tableData',this.defaultData)
      this.getHospitalList()
      if(this.action === '编辑'){
        this.rules.password = []
      }
    },
    methods: {
      update(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$emit('edit',this.tableData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
        // console.log(this.tableData,'tinajiadeliria')
      },
      getHospitalList(){
        let vm = this
        hospitalList({
          pageNum:1,
          pageSize:9999
        }).then(res=>{
          vm.hospitalList = res.data
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    margin: 20px 30px 20px 10px;
  }
</style>


