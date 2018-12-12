import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import { Server } from 'tls';
// import components from './router'
// export const routerComponents = components
/* Router Modules */


/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '主页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
const roles = [ 'hospital','hospitalAdd','hospitalEdit','hospitaldEelete',
                'user','userAdd','userEdit','userdEelete',
                'message','messageEdit','messagedEelete',
                'info','infoAdd','infoEdit','infodEelete',
                'sys',
                'manager','managerAdd','managerEdit','managerdEelete']

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

export const asyncRouterMap = [

  {
    path: '/HospitalManage',
    component: Layout,
    redirect: '/HospitalManage/Hospital',
    name: 'HospitalManage ',
    meta: { title: '医院管理', icon: 'hospital' },
    children: [
      {
        path: 'Hospital',
        name: 'Hospital',
        component: () => import('@/views/hospitalManage/hospital/index'),
        meta: { title: '医院管理' }
      },
      {
        path: 'Doctor',
        name: 'Doctor',
        component: () => import('@/views/hospitalManage/doctor/index'),
        meta: { title: '医生管理' }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/userList',
    name: 'userManage ',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/userManage/user/index'),
        meta: { title: '用户列表' }
      },
      {
        path: 'bloodCover',
        name: 'bloodCover',
        component: () => import('@/views/userManage/bloodCover/index'),
        meta: { title: '血压分布' }
      }
    ]
  },
  {
    path: '/messageManage',
    component: Layout,
    redirect: '/messageManage/messageList',
    name: 'messageManage ',
    meta: { title: '消息管理', icon: 'message' },
    children: [
      {
        path: 'messageList',
        name: 'messageList',
        component: () => import('@/views/messageManage/messageList/index'),
        meta: { title: '消息管理' }
      }
    ]
  },
  {
    path: '/infoManage',
    component: Layout,
    redirect: '/infoManage/infoList',
    name: 'infoManage ',
    meta: { title: '资讯管理', icon: 'info' },
    children: [
      {
        path: 'infoList',
        name: 'infoList',
        component: () => import('@/views/infoManage/infoList/index'),
        meta: { title: '资讯管理' }
      },
      {
        path: 'editInfo',
        name: 'editInfo',
        hidden: true,
        component: () => import('@/views/infoManage/infoList/edit/index'),
        meta: { title: '编辑资讯',noCache: true }
      },
    ]
  },
  {
    path: '/sysLog',
    component: Layout,
    redirect: '/sysLog/doctor',
    name: 'sysLog ',
    meta: { title: '系统日志', icon: 'sys' },
    children: [
      {
        path: 'doctor',
        name: 'doctor',
        component: () => import('@/views/sysLog/doctor/index'),
        meta: { title: '医生操作日志' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/sysLog/user/index'),
        meta: { title: '用户操作日志' }
      }
    ]
  },
  {
    path: '/adminManage',
    component: Layout,
    redirect: '/adminManage/adminList',
    name: 'adminManage ',
    meta: { title: '管理员管理', icon: 'admin' },
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        component: () => import('@/views/adminManage/adminList/index'),
        meta: { title: '管理员列表' }
      },
      {
        path: 'power',
        name: 'power',
        component: () => import('@/views/adminManage/power/index'),
        meta: { title: '权限管理' }
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/adminManage/log/index'),
        meta: { title: '管理员操作日志' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const routerComponents ={
  Layout:()=>import('@/views/redirect/index'),
  Hospital:()=>import('@/views/hospitalManage/hospital/index'),
  Doctor:()=>import('@/views/hospitalManage/doctor/index'),
  userList:()=>import('@/views/userManage/user/index'),
  bloodCover:()=>import('@/views/userManage/bloodCover/index'),
  messageList:()=>import('@/views/messageManage/messageList/index'),
  infoList:()=>import('@/views/infoManage/infoList/index'),
  editInfo:()=>import('@/views/infoManage/infoList/edit/index'),
  doctor:()=>import('@/views/sysLog/doctor/index'),
  user:()=>import('@/views/sysLog/user/index'),
  adminList:()=>import('@/views/adminManage/adminList/index'),
  power:()=>import('@/views/adminManage/power/index'),
  log:()=>import('@/views/adminManage/log/index')
}
// export const routerComponents ={
//   Layout:require('@/views/redirect/index').default,
//   Hospital:require('@/views/hospitalManage/hospital/index').default,
//   Doctor:require('@/views/hospitalManage/doctor/index').default,
//   userList:require('@/views/userManage/user/index').default,
//   bloodCover:require('@/views/userManage/bloodCover/index').default,
//   messageList:require('@/views/messageManage/messageList/index').default,
//   infoList:require('@/views/infoManage/infoList/index').default,
//   editInfo:require('@/views/infoManage/infoList/edit/index').default,
//   doctor:require('@/views/sysLog/doctor/index').default,
//   user:require('@/views/sysLog/user/index').default,
//   adminList:require('@/views/adminManage/adminList/index').default,
//   power:require('@/views/adminManage/power/index').default,
//   log:require('@/views/adminManage/log/index').default
// }
