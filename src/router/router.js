// import Layout from '@/views/redirect/index'
// import Hospital from '@/views/hospitalManage/hospital/index'
// import Doctor from '@/views/hospitalManage/doctor/index'
// import userList from '@/views/userManage/user/index'
// import bloodCover from '@/views/userManage/bloodCover/index'
// import messageList from '@/views/messageManage/messageList/index'
// import infoList from '@/views/infoManage/infoList/index'
// import editInfo from '@/views/infoManage/infoList/edit/index'
// import doctor from '@/views/sysLog/doctor/index'
// import user from '@/views/sysLog/user/index'
// import adminList from '@/views/adminManage/adminList/index'
// import power from '@/views/adminManage/power/index'
// import log from '@/views/adminManage/log/index'
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