<template>
<div class="wrap">
  <div class="top-wrap">
    <el-row :gutter="8">
      <el-col :span="12">
        <el-card>
          <el-row type="flex" class="item">
            <el-col :span="16">
              <div class="img-wrap">
                <img src="@/assets/mainPageImg/houtai-02.png" alt="">
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="text-wrap">
                <div>{{number.numHospital}}</div>
                <div>在线医院</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <el-row type="flex" class="item">
            <el-col :span="16">
              <div class="img-wrap">
                <img src="@/assets/mainPageImg/houtai-03.png" alt="">
              </div>
            </el-col>
            <el-col :span="8">
              <div class="text-wrap">
                <div>{{number.numDoctor}}</div>
                <div>在线医生</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-row :gutter="8">
    <el-col :span="12">
      <el-card>
        <el-row type="flex" class="item">
          <el-col :span="16">
            <div class="img-wrap">
                <img src="@/assets/mainPageImg/houtai-04.png" alt="">
              </div>
          </el-col>
          <el-col :span="8">
            <div class="text-wrap">
              <div>{{number.numSumMember}}</div>
              <div>注册用户</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <el-row type="flex" class="item">
          <el-col :span="16">
            <div class="img-wrap">
                <img src="@/assets/mainPageImg/houtai-05.png" alt="">
              </div>
          </el-col>
          <el-col :span="8">
            <div class="text-wrap">
              <div>{{number.numBindDocMember}}</div>
              <div>绑定医生用户</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>
<script>
import {userNumber} from '@/api/home'
export default {
  name:'Total',
  data () {
    return {
      number:{
        "numBindDocMember": 0, 
        "numSumMember": 0, 
        "numDoctor": 0, 
        "numHospital": 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData(){
      userNumber().then(res=>{
        if(res.code === '0000') {
          this.number = {...res.data}
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .top-wrap{
    margin-bottom: 8px;
  }
  .wrap{
    text-align: center;
  }
  .text-wrap{
    text-align: center;
    // height: 140px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    
    line-height: 1.5;
    :first-child{
      text-align: left;
      font-weight: 600;
      font-size: 36px;
      // color:#908888;
    }
    :last-child{
      text-align: left;
      font-weight: 400;
      font-size: 18px;
    }
  }
  .img-wrap{
    img{
      border-radius: 8px;
      width: 60%;
        box-shadow: 4px 3px 6px 0px #adabab;
    }
  }
  .item{
    justify-content: center;
    align-items: center;
  }
</style>
