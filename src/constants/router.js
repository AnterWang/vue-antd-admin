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
            {
                path: '/component/modal',
                name: 'componentModal',
                component: ()=> import('@/views/component/modal'),
                meta: { title: '弹窗', icon: 'windows' }
            },
            {
                path: '/component/amap',
                name: 'componentAmap',
                component: ()=> import('@/views/component/amap'),
                meta: { title: '高德地图', icon: 'windows' }
            },
            {
                path: '/component/baidumap',
                name: 'componentBaidumap',
                component: ()=> import('@/views/component/baidumap'),
                meta: { title: '百度地图', icon: 'windows' }
            },
            {
                path: '/component/color',
                name: 'componentColor',
                component: ()=> import('@/views/component/color'),
                meta: { title: '颜色选择器', icon: 'windows' }
            },
        
        ]
    },

]
export default asyncRoutes