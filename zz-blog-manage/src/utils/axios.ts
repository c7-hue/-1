import axios from "axios"
import{baseUrl} from "./env"
import {YkMessage} from "@yike-design/ui"

const service = axios.create({
  baseURL: baseUrl,
  timeout: 8000
})

// 添加请求拦截器
service.interceptors.request.use(
  // 再发送请求之前做些什么
  config => {
    return config
  },
  // 对请求错误做些什么
  error => {
    YkMessage.error(error.message)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  // 对响应数据做点什么
  response => {
    // 直接返回响应数据，不进行拦截
    return response.data
  },
  // 对响应错误做点什么
  error => {
    YkMessage({type:'warning',message:error.message})
    return Promise.reject(error)
  }
)

export default service
