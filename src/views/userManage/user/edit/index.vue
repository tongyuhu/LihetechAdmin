<template>
<!-- :rules="rules"  -->
  <el-form :model="editForm" 
  size="middle"
  ref="hospitalForm" label-width="100px" :inline="false" :rules="rules" >
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户姓名" prop="realName">
          <el-input v-model="editForm.realName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="电话" prop="mobile">
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
          <span v-if="editForm.adminIdMainDoctor && !changeDoctorType">
            <span >已绑定</span>
            <el-button type="text" @click="changeDoctor">更改</el-button>
          </span>
          <selectDoctor v-if="changeDoctorType || !editForm.adminIdMainDoctor" :doctor='editForm.adminIdMainDoctor'></selectDoctor>
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
        <el-form-item label="身高(cm)" prop="height">
          <el-input-number v-model="editForm.height" :controls="false" :min="1" :style="{'width':'100%'}">
          </el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="体重(kg)" prop="weight" >
          <el-input-number v-model="editForm.weight" :controls="false" :min="1" :style="{'width':'100%'}">
          </el-input-number>
          <!-- <el-input v-model="editForm.weight" type="number">
            <template slot="append">kg</template>
          </el-input> -->
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="出生年月日" prop="birthDate">
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

    <el-row>
      <el-col :span="12">
        <el-form-item label="账号状态" prop="isStop">
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
import {checkPass,checkPhone,checkUserName,checkEmail,checkName,checkNumber} from '@/utils/formCheck.js'
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
      return {
        editForm:this.defaultData,
        rules: {
          mobile: [
            { validator: checkPhone, trigger: ['blur', 'change']},
            {required: true}
          ],
          realName: [
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


