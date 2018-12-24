<template>
  <div>
    <el-form label-position="left" inline class="table-expand">
      <el-form-item label="姓名:">
        <span>{{ userData.realName }}</span>
      </el-form-item>
      <el-form-item label="性别:">
        <span>{{ userData.sex | sex}}</span>
      </el-form-item>
      <el-form-item label="出生年月日:">
        <span>{{ userData.birthDate | joinTime}}</span>
      </el-form-item>
      <el-form-item label="身高 cm:">
        <span>{{ userData.height }}</span>
      </el-form-item>
      <el-form-item label="体重 kg:">
        <span>{{ userData.weight }}</span>
      </el-form-item>
      <el-form-item label="电话:">
        <span>{{ userData.mobile }}</span>
      </el-form-item>
      <el-form-item label="绑定医生id:">
        <span>{{ userData.doctorId }}</span>
      </el-form-item>
      <el-form-item label="账号开启或关闭:">
        <span>{{ userData.isStop | isStop}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:'edit',
    props:{
      defaultData:{
        type:Object
      }
    },
    data() {
      return {
        userData:this.defaultData,
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  .action-btn{
    text-align: center;
  }
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>


