import request from '@/utils/request'

// 登录
export function loginByUsername(userName, passWord) {
  return request({
    url: '/ops/merchant/login',
    method: 'post',
    data:{
        userName,
        passWord
    }
  })
}

// 获取权限
export function getUserRoles() {
  return request({
      url: '/ops/merchant/access/user/list',
      method: 'get'
  })
}

// exmaple  qs

// import qs from 'qs';
// export function memberintegralflowList(data = {}) {
//   return request({
//     url: '/user/member-integral-flow-do/search?' + qs.stringify(data),
//     method: 'get'
//   });
// }