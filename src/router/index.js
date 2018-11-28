import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    // meta: { title: '立阖泰'},
    hidden: true,
    children: [{
      path: 'dashboard',
      // meta: { title: '立阖泰'},
      component: () => import('@/views/dashboard/index')
    }]
  },
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
      }
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

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
