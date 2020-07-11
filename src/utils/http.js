import request from './request.js';
const http={
  /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
  */
  get(url,params){
    const config={
      method:'get',
      url:url
    }
    if(params) config.params=params
    return request(config)
  },
  post(url,data,params){
    const config={
      method:'post',
      url:url,
      data:data
    }
    if(params) config.params=params
    return request(config)
  },
  put(url,data,params){
    const config = {
      method: 'put',
      url:url,
      data:data
    }
    if(params) config.params = params
    return request(config)
  },
  delete(url,data,params){
    const config = {
      method: 'delete',
      url:url,
      data:data
    }
    if(params) config.params = params
    return request(config)
  }
};
export default http;
