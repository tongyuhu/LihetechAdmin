import { asyncRouterMap, constantRouterMap} from '@/router'
const ServerRouter = [
  {
    path: '/HospitalManage',
    component: 'Layout',
    redirect: '/HospitalManage/Hospital',
    name: 'HospitalManage ',
    meta: {
      title: '医院管理', 
      icon: 'hospital',
    },
    children: [
      {
        path: 'Hospital',
        name: 'Hospital',
        component: 'Hospital',
        meta: { 
          title: '医院管理',
        }
      },
      {
        path: 'Doctor',
        name: 'Doctor',
        component: 'Doctor',
        meta: { 
          title: '医生管理',
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
  // { path: '*', redirect: '/404', hidden: true }
]  

export const routerComponentsMap ={
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
  // Layout:require('@/views/redirect/index').default,
  // Hospital:require('@/views/hospitalManage/hospital/index').default,
  // Doctor:require('@/views/hospitalManage/doctor/index').default,
  // userList:require('@/views/userManage/user/index').default,
  // bloodCover:require('@/views/userManage/bloodCover/index').default,
  // messageList:require('@/views/messageManage/messageList/index').default,
  // infoList:require('@/views/infoManage/infoList/index').default,
  // editInfo:require('@/views/infoManage/infoList/edit/index').default,
  // doctor:require('@/views/sysLog/doctor/index').default,
  // user:require('@/views/sysLog/user/index').default,
  // adminList:require('@/views/adminManage/adminList/index').default,
  // power:require('@/views/adminManage/power/index').default,
  // log:require('@/views/adminManage/log/index').default
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param srverRouter
 */
function filterSrverRouter(srverRouter,asyncRouterMap) {
  let routers = srverRouter
  routers.forEach(route => {

    if(route.component){
      route.component = routerComponentsMap[route.component]
      // console.log('routername',route.component)
    }
    if(route.children){
      route.children = filterSrverRouter(route.children)
    }
    
  })

  return routers
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        accessedRouters = filterSrverRouter(ServerRouter)
        // commit('SET_ROUTERS', accessedRouters)
        console.log('luyou',accessedRouters)
        console.log('luyou',asyncRouterMap)
        // if (roles.includes('admin')) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
