<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <error-log class="errLog-container right-menu-item"/> -->

        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>

        <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip> -->

        <!-- <lang-select class="international right-menu-item"/> -->

        <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip> -->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img src='@/assets/defaultUser.png' class="user-avatar">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import avatars from '@/assets/defaultUser.png'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
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
      avatars:avatars,
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
      }
    }
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      // })
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
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
