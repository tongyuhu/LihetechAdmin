import request from '@/utils/request'
export function doctorList(adminHospitalId) {
  // let parms = {
  //   ids:params.id,
  //   isStop:params.isStop
  // }
  return request({
    url: '/common/doctor/list',
    method: 'post',
    data: {
      adminHospitalId:adminHospitalId
    }
  })
}