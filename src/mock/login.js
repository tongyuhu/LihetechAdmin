import { param2Obj } from '@/utils'
const ServerRouter = [
  {
    path: '/HospitalManage',
    component: 'Layout',
    redirect: '/HospitalManage/Hospital',
    name: 'HospitalManage ',
    meta: {
      title: '医院管理', 
      icon: 'hospital',
      roles: ['add','delete','edit']
    },
    children: [
      {
        path: 'Hospital',
        name: 'Hospital',
        component: 'Hospital',
        meta: { 
          title: '医院管理',
          roles: []
        }
      },
      {
        path: 'Doctor',
        name: 'Doctor',
        component: 'Doctor',
        meta: { 
          title: '医生管理',
          roles: []
        }
      }
    ]
  },
  {
    path: '/userManage',
    component: 'Layout',
    redirect: '/userManage/userList',
    name: 'userManage ',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: 'userList',
        meta: { title: '用户列表' }
      },
      {
        path: 'bloodCover',
        name: 'bloodCover',
        component: 'bloodCover',
        meta: { title: '血压分布' }
      }
    ]
  },
  {
    path: '/messageManage',
    component: 'Layout',
    redirect: '/messageManage/messageList',
    name: 'messageManage ',
    meta: { title: '消息管理', icon: 'message' },
    children: [
      {
        path: 'messageList',
        name: 'messageList',
        component: 'messageList',
        meta: { title: '消息管理' }
      }
    ]
  },
  {
    path: '/infoManage',
    component: 'Layout',
    redirect: '/infoManage/infoList',
    name: 'infoManage ',
    meta: { title: '资讯管理', icon: 'info' },
    children: [
      {
        path: 'infoList',
        name: 'infoList',
        component: 'infoList',
        meta: { title: '资讯管理' }
      },
      {
        path: 'editInfo',
        name: 'editInfo',
        hidden: true,
        component: 'editInfo',
        meta: { title: '编辑资讯',noCache: true }
      },
    ]
  },
  {
    path: '/sysLog',
    component: 'Layout',
    redirect: '/sysLog/doctor',
    name: 'sysLog ',
    meta: { title: '系统日志', icon: 'sys' },
    children: [
      {
        path: 'doctor',
        name: 'doctor',
        component: 'doctor',
        meta: { title: '医生操作日志' }
      },
      {
        path: 'user',
        name: 'user',
        component: 'user',
        meta: { title: '用户操作日志' }
      }
    ]
  },
  {
    path: '/adminManage',
    component: 'Layout',
    redirect: '/adminManage/adminList',
    name: 'adminManage ',
    meta: { title: '管理员管理', icon: 'admin' },
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        component: 'adminList',
        meta: { title: '管理员列表' }
      },
      {
        path: 'power',
        name: 'power',
        component: 'power',
        meta: { title: '权限管理' }
      },
      {
        path: 'log',
        name: 'log',
        component: 'log',
        meta: { title: '管理员操作日志' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]  
const userMap = {
  admin: {
    roles: ['admin'],
    router:ServerRouter,
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    router:ServerRouter,
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
