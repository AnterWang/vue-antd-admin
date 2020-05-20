import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login'] // 路由白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (whiteList.indexOf(to.path) !== -1) {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.addRoutes.length === 0) {
                store.dispatch('GetUserInfo').then(info => {
                    router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
                    next({ ...to, replace: true })
                }).catch((err) => {
                    store.dispatch('Logout').then(() => {
                        message.error(err || 'Verification failed, please login again')
                        next({ path: '/' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }

})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
