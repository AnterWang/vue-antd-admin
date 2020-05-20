import { loginByUsername } from '@/api/login'
/* eslint-disable */
import { getToken, setToken, removeToken, setUserName, getUserName, removeUserName } from '@/utils/auth'
import { message } from 'ant-design-vue'

function getUser() { // 获取用户信息
    if (getUserName()) {
        return JSON.parse(getUserName())
    }
}

const user = {
    state: {
        user: getUser(),
        token: '',
    },
    mutations: {
        SET_TOKEN(state,token){
            state.token = token
        },
        SET_USER(state,info){
            state.user = info
        }
    },
    actions: {
        // 登录录入信息
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                try {
                    let data = {
                        merchant_name: userInfo.merchant_name,
                        real_name: userInfo.real_name,
                        phone: userInfo.phone,
                        type: userInfo.type,
                        id: userInfo.id,
                        merchant: userInfo.merchant,
                        store_code: userInfo.store_code||'',
                        store_id: userInfo.store_id||'',
                    }
                    // commit('SET_ROLE', [])
                    commit('SET_TOKEN', userInfo.token)
                    commit('SET_USER',data)
                    setToken(userInfo.token)
                    setUserName(data)
                    resolve();
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 退出
        Logout({ commit }){
            return new Promise((resolve,reject) =>{
                try {
                    message.success('退出成功！')
                    commit('SET_USER','')
                    commit('SET_TOKEN', '')
                    // commit('SET_ROLE', [])
                    removeToken()
                    removeUserName()
                    setTimeout(() => {
                        location.reload()
                    }, 200)
                    resolve();
                } catch (error) {
                    reject(error)
                }
            })

        }

    }
}

export default user