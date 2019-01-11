<template>
<!-- :rules="rules"  -->
  <el-form :model="editForm" 
  size="middle"
  ref="hospitalForm" label-width="100px" :inline="false">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户姓名" prop="hospitalName">
          <el-input v-model="editForm.realName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="电话" prop="hospitalAddress">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <!-- <el-col :span="12">
        <el-form-item label="邮箱" prop="adminName">
          <el-input v-model="editForm.adminName"></el-input>
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item label="性别" prop="adminName">
          <el-select v-model="editForm.sex" placeholder="请选择" :style="{'width':'100%'}">
            <el-option
              label="男"
              :value="1">
            </el-option>
            <el-option
              label="女"
              :value="0">
            </el-option>
          </el-select>
          <!-- <el-input v-model="editForm.adminName"></el-input> -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="绑定医生" prop="adminPhone">
          <span v-if="editForm.doctorId && !changeDoctorType">
            <span >已绑定</span>
            <el-button type="text" @click="changeDoctor">更改</el-button>
          </span>
          <selectDoctor v-if="changeDoctorType || !editForm.doctorId" :doctor='editForm.doctorId'></selectDoctor>
          <!-- <el-cascader
            :options="options"
            v-model="editForm.doctorId"
            @active-item-change="handleItemChange"
          ></el-cascader> -->
          
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="身高(cm)" prop="adminAccount">
          <el-input-number v-model="editForm.height" :controls="false" :min="1" :max="10" :style="{'width':'100%'}">
          </el-input-number>
          <!-- <el-input v-model="editForm.height" type="number">
            <template slot="append">cm</template>
          </el-input> -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="体重(kg)" prop="password" >
          <el-input-number v-model="editForm.weight" :controls="false" :min="1" :max="10" :style="{'width':'100%'}">
          </el-input-number>
          <!-- <el-input v-model="editForm.weight" type="number">
            <template slot="append">kg</template>
          </el-input> -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="出生年月日" prop="adminEmail">
          <!-- <el-input v-model="editForm.adminEmail"></el-input> -->
          <el-date-picker
            v-model="editForm.birthDate"
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="12">
        <el-form-item label="绑定医生姓名" prop="adminEmail">
          <el-input v-model="editForm.adminEmail"></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->
    <!-- <el-row>
      <el-col :span="12">
        <el-form-item label="登录账号" prop="adminAccount">
          <el-input v-model="editForm.adminAccount"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="初始密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="12">
        <el-form-item label="账号状态" prop="accountStatus">
          <el-switch v-model="editForm.isStop"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    
    <div class="action-btn">
      <el-button type="primary" @click="submitForm('hospitalForm')">提交</el-button>
      <!-- <el-button @click="resetForm('hospitalForm')">取消</el-button> -->
    </div>
  </el-form>
</template>

<script>
import {doctorList} from '@/api/commons/doctorList.js'
import {hospitalList,hospitalEdit,hospitalAdd,hospitalOnOff} from '@/api/hospitalManage.js'
import selectDoctor from '@/components/SelectDoctor'
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object
      }
    },
    components: {
      selectDoctor
    },
    data() {
      var checkEmail = (rule, value, callback) => {
        let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!value) {
          return callback(new Error('请输入管理员邮箱'))
        } else if (!emailrule.exec(value)) {
          return callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
      var checkAccount = (rule, value, callback) => {
        let accountRule = /[a-zA-Z0-9_]{4,15}$/
        if (!value) {
          return callback(new Error('请输入登录账号'))
        } else if (!accountRule.exec(value)) {
          return callback(new Error('允许5-16字节，可包含数字、字母和下划线'))
        } else {
          callback()
        }
      }
      var checkmobile = (rule, value, callback) => {
        let mobilerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
        if (!value) {
          return callback(new Error('请输入管理员电话'))
        } else if (!mobilerule.exec(value)) {
          return callback(new Error('请输入正确的电话'))
        } else {
          callback()
        }
      }
      var checkPass = (rule, value, callback) => {
        let passrule = /\w{5,17}$/
        if (!value) {
          return callback(new Error('请输入初始密码'))
        } else if (!passrule.exec(value)) {
          callback(new Error('请输入6~18密码,可包含数字、字母和下划线'))
        } else {
          callback()
        }
      }
      return {
        editForm:this.defaultData,
        rules: {
          hospitalName: [
            { required: true, message: '请输入医院名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          hospitalAddress: [
            { required: true, message: '请输入医院地址', trigger: 'change' }
          ],
          adminName: [
            { required: true, message: '请输入管理员姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          adminPhone: [
            { validator: checkmobile, trigger: 'change' }
          ],
          adminEmail: [
            { validator: checkEmail, trigger: 'change' }
          ],
          adminAccount: [
            { validator: checkAccount, trigger: 'change' }
          ],
          password: [
            { validator: checkPass, trigger: 'change' }
          ]
        },
        options:[],
        changeDoctorType:false
        // props: {
        //   value: 'hospital',
        //   children: 'doctor'
        // }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$emit('edit',this.editForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        // this.$emit('closeDialog')
      },
      handleItemChange(val){
        console.log('active item:', val)
      },
      getHospital(){
        let vm = this
        hospitalList().then(res=>{
          console.log('hospital',res)
          // vm.options
        })
      },
      changeDoctor(){
        this.changeDoctorType = true
      }
    },
    created(){
      this.getHospital()
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
</style>


