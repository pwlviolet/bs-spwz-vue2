import axios from 'axios'
// import { Message } from 'element-ui'
const http = axios.create({
  baseURL: 'http://localhost:8080'
})
//  请求拦截
// http.interceptors.request.use ( config => {
//     if(localStorage.elementToken)
//     {
//         config.headers.Authorization = localStorage.elementToken
//     }
//     return config
// })
// //响应拦截
// http.interceptors.response.use( res =>{
//     return res
// },err => {
//     console.log(err.response)
//     Message.error(err.response.data)
// })
export default http
