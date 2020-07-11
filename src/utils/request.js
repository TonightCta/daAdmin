import axios from 'axios'
import { Message } from 'element-ui'
const service=axios.create({
  baseUrl:process.env.BASE_API,
  timeout:5 * 1000
});
service.interceptors.request.use(config=>{
  let baseToken=window.sessionStorage.getItem('token')
  let baseID=window.sessionStorage.getItem('sessionID')
  config.data=JSON.stringify(config.data);
  config.headers={
    'Content-Type':'application/json',
    'Authorization':baseToken,
    'SessionId':baseID,
    'v':'v2'
  };
  return config;
},error=>{
  Promise.reject(error)
})
service.interceptors.response.use(response=>{
  let errorText='';
  switch (response.data.state) {
    case 1:
      return response
      break;
    case 404:
      errorText='资源不存在'
      break;
    default:
      errorText=response.data.msg
  };
  Message.error(errorText);
  return response
},error=>{
  if(error&&error.response){
    switch (error.response.status) {
      case 400:
        error.message='错误请求'
        break;
      case 401:
        error.message='登录已失效，请从新登录'
        setTimeout(()=>{
          window.location.href = "/"
        },500)
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    };
  }else{
    if(JSON.stringify(error).includes('timeout')){
      Message.error('服务器响应超时，请刷新页面后重试')
    }
    error.message('连接服务器失败')
  }
  Message.error(error.message);
  return Promise.resolve(error.response)
});
export default service;
