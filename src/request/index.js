import axios from 'axios'
import router from '@/router'
import { ElMessage, ElLoading } from 'element-plus'
import Qs from 'qs'
import { ref } from 'vue'

const Loading = ref({})
const service = axios.create({
  //后面部署生产，需要将请求路径/admin/替换为经过网关请求/publicserviceplatform/admin/
  // 'http://8.134.252.82:8090/publicserviceplatform',
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  paramsSerializer: function (params) {
    let newParams = {
      ...(params || {})
    }

    for (let name in newParams) {
      let val = newParams[name]
      if (val instanceof Array || val instanceof Object) {
        newParams[name] = JSON.stringify(val)
      }
    }
    return Qs.stringify(newParams, { arrayFormat: 'indices' })
  }
})

//请求拦截
service.interceptors.request.use((config) => {
  let { Authorization } = config
  // console.log(config)
  // console.log(config.params)
  let loading = config?.headers?.loading || false
  let target = config?.headers?.target || '#app'
  if (loading && !Loading.value[target]) {
    Loading.value[target] = ElLoading.service({
      lock: true,
      target: target,
      text: '加載中...'
      // background: 'rgba(0, 0, 0, 0.7)',
    })
  }
  if (!Authorization) {
    config.headers['codePlatformAccessKey'] = localStorage['accessKey']
  }

  console.log('=== config', config)

  return config
})

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    let loading = res.config?.headers?.loading || false
    let target = res.config?.headers?.target || '#app'
    if (loading && Loading.value) {
      Loading.value[target]?.close()
      Loading.value[target] = null
    }
    if (res.status !== 200) {
      ElMessage({
        message: '请求错误',
        type: 'error'
      })
    }

    if (res.data && res.data.code && res.data.code !== 200) {
      ElMessage({
        message: res.data.msg,
        type: 'error'
      })
    }

    return res.data
  },
  (err) => {
    console.log(err)
    let loading = err.config?.headers?.loading || false
    let target = err.config?.headers?.target || '#app'
    if (loading && Loading.value) {
      Loading.value[target]?.close()
      Loading.value[target] = null
    }

    if (err && err.response && err.response.status === 401) {
      // router.replace('/login')
      ElMessage({
        message: '登录已超时，请重新登录',
        type: 'warning'
      })
    } else {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    }
    if (err instanceof axios.Cancel) {
      return Promise.reject(new Error('break'))
    } else {
      return Promise.reject(err)
    }
  }
)

export default service
