import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
// 动态  暂时引入 测试用
import asyncRoutes from '@/constants/router'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        hidden: true,
        path: '/404',
        component: Layout,
        redirect: '/404/index',
        name: '404',
        children: [{
            path: 'index',
            name: '404',
            component: () => import('@/views/404'),
            meta: { title: '404' }
        }]
    },
    // 动态  暂时引入 测试用
    ...asyncRoutes


]

const Router = new VueRouter({
    routes: [
        ...constantRoutes
    ],
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 })
})
export default Router
