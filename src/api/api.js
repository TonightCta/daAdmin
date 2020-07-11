import http from '../utils/http.js'
let resquest='/dev'

export default{
  getListAPI(url,params){
    return http.get(`${resquest}/${url}`,params)
  },
  postFormAPI(url,params){
    return http.post(`${resquest}/${url}`,params)
  },
  putSomeAPI(url,params){
    return http.put(`${resquest}/${url}`,params)
  },
  deleteListAPI(url,params){
    return http.delete(`${resquest}/${url}`,params)
  }
}
