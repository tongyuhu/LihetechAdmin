<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/40/h/40'" class="user-avatar">
        <!-- <i class="el-icon-caret-bottom"/> -->
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item >
          <span @click="edit">编辑资料</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="changePwd">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="编辑资料"
      :visible.sync="editDialog"
      width="50%"
      center>
      <el-form class="from" ref="editAdminForm" :model="editForm" label-width="40px" :rules="rule">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更改密码"
      :visible.sync="changePwdDialog"
      width="50%"
      center>
      <!-- :validateField="validateFieldForm('oldPassword')" -->
      <el-form
        :model="changePasswordForm" 
        status-icon 
        :rules="changePasswordRules" 
        ref="changpasswordRef" 
        label-width="70px" 
        label-position="left"
        >
          <el-form-item prop="oldPassword" label="原始密码">
            <el-input
              :autofocus="true"
              placeholder="原始密码"
              v-model="changePasswordForm.oldPassword">
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword1" label="新密码">
            <el-input
              :autofocus="true"
              placeholder="请输入密码"
              v-model="changePasswordForm.newPassword1">
              <!-- <template slot="prepend"><i class="el-icon-info"></i></template> -->
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword2" label="确认密码">
            <el-input
              :autofocus="true"
              placeholder="请再次输入密码"
              v-model="changePasswordForm.newPassword2">
            </el-input>
          </el-form-item>
        </el-form>

      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="changePwdDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    var checkName = (rule, value, callback) => {
      let namerule = /^.{1,20}$/
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else if (!namerule.exec(value)) {
        return callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      let emailrule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else if (!emailrule.exec(value)) {
        return callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    var checkMobile = (rule, value, callback) => {
      let mobilerule = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!value) {
        return callback(new Error('电话不能为空'))
      } else if (!mobilerule.exec(value)) {
        return callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    var checkOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
    var checkNewPassword1 = (rule, value, callback) => {
      // let reg = new RegExp()
      let patrn = /^[a-zA-Z]\w{5,8}$/
      if (patrn.exec(value) === null) {
        callback(new Error('请输入6~9密码,以字母开头,可包含数字和下划线'))
      } else {
        callback()
      }
    }
    var checkNewPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordForm.newPassword1) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      editDialog: false,
      changePwdDialog: false,
      editForm:{
        name:"",
        mobile:"",
        email:""
      },
      changePasswordForm: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      rule: {
        name: [
            { validator: checkName, trigger: 'blur' }
        ],
        mobile: [
            { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
            { validator: checkEmail, trigger: 'blur' }
        ]
      },
      changePasswordRules: {
        oldPassword: [
            { validator: checkOldPassword, trigger: 'blur' }
        ],
        newPassword1: [
            { validator: checkNewPassword1, trigger: 'blur' }
        ],
        newPassword2: [
          { validator: checkNewPassword2, trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    edit() {
      this.editDialog = true
    },
    changePwd() {
      this.changePwdDialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 35px;
        height: 35px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>

