import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  headers: {'Access-Control-Allow-Origin': '*'},
  timeout: 5000 // request timeout
})
// service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['xhrFields'] ={ withCredentials: true  }
      config.headers['crossDomain'] = true
      config.headers['Access-Control-Allow-Origin'] = '*'
      
    // }
    if (config.url === '/BPWatch/upload/commons') {
      config.baseURL = process.env.BASE_IPS
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }else if (config.method === 'post') {
      config.baseURL = process.env.BASE_API
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // Message({
    //   message: res.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    const res = response.data
    if (res.code === '1005') {
      window.location.href = '/operat/login'
      return Promise.reject('error')
    } else if(res.code === '1101') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      window.location.href = '/operat/login'
    } else if(res.code === '1102') {
      Message({
        message: '数据更新，请重新登录',
        type: 'error',
        duration: 5 * 1000
      })
    } else if(res.code !== '0000') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }  else {
    return response.data
  }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break

        case 401:
          error.message = '未授权，请登录'
          break

        case 403:
          window.location.href = '/operat/login'
          error.message = '拒绝访问'
          break

        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          // router.replace({path: '404'})
          break

        case 408:
          error.message = '请求超时'
          Message({
            type: 'warning',
            message: '请求超时',
            duration: 5000,
            showClose: true
          })
          break
        case 500:
          // sessionStorage.clear()
          // window.location.href = '/BPWatch/admin/login/page'
          // location.reload()
          // router.replace({name: '500'})
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break

        case 502:
          error.message = '网关错误'
          break

        case 503:
          error.message = '服务不可用'
          break

        case 504:
          error.message = '网关超时'
          break

        case 505:
          error.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    
    return Promise.reject(error)
  }
)

export default service
