import Cookies from 'js-cookie'

// token
const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// userinfo
const userName = 'userName'

export function getUserName() {
    return Cookies.get(userName)
}

export function setUserName(token) {
    return Cookies.set(userName, token)
}

export function removeUserName() {
    return Cookies.remove(userName)
}