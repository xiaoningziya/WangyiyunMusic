import axios from 'axios'
import { Toast } from 'vant'
import 'vant/lib/index.css'
// axios.defaults.headers['Content-Type'] = 'application/json'
const API = axios.create({
  // withCredentials: true,
  baseURL: 'http://localhost:3000',
  timeout: 60000
})

// API.interceptors.request.use(
//   config => {
//     const URL = config.url
//     return config
//   },
//   error => {
//   }
// )

API.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  error => {
    if (error?.response?.data?.message) {
      Toast(error.response.data.message)
    }
    return Promise.reject(error.response.data.message)
  }
)

export default API
