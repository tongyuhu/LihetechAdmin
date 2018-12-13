
export default{
  Layout:()=>import('@/views/layout/Layout'),
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