import API from './axios';
interface IRequestdata {
  [propName: string]: any
}

// 登录--手机号密码
export function login_cellphone(params:IRequestdata){
  return API({
    method: 'get',
    url: '/login/cellphone',
    params
  })
}
// 退出登录
export function logout(params:IRequestdata){
  return API({
    method: 'get',
    url: '/logout',
    params
  })
}
// 注册(修改密码)
export function register_cellphone(params:IRequestdata){
  return API({
    method: 'get',
    url: '/register/cellphone',
    params
  })
}
// 发送验证码
export function captcha_sent(params:IRequestdata){
  return API({
    method: 'get',
    url: '/captcha/sent',
    params
  })
}