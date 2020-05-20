// 动态路由表，传输给服务端存储用
import Layout from '@/views/layout';
const asyncRoutes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'dashboard',
        component: Layout,
        firstRoute: true,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: ()=> import('@/views/dashboard'),
                meta: { title: '首页', icon: 'bell' },
            }
        ]
    },
    {
        path: '/component',
        name: 'component',
        component: Layout,
        meta: { title: '组件', icon: 'bell' },
        children: [
            {
                path: '/component/form',
                name: 'componentForm',
                component: ()=> import('@/views/component/form'),
                meta: { title: '表单', icon: 'windows' }
            },
        ]
    },
]
export default asyncRoutes