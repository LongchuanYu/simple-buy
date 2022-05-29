import http from './http'

function Login(data = {}): Promise<any> {
  return http({url: '/login', data})
}


export default {
  Login
}