import { constantRoutes } from '@/router';
import { getUserRoles } from '@/api/login';
import Layout from '@/views/layout';

const componentTo = (data) => { // 路由懒加载
  return () => import(`@/views${data}`)
}

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    authList: {}
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes); // 异步路由 合并路由
    },
    SET_AUTH_LIST: (state, authList) => {
      state.authList = authList;
    }
  },
  actions: {
    // 获取用户权限
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserRoles()
          .then((res) => {
            const data = res.data || [];
            var arr = []; // 生成的路由表

            // 操作权限 - 递归
            const authList = {};
            const iterate = (list) => {
              list.forEach((item) => {
                if (!item.component && item.accessUrl) {
                  authList[item.menuId] = true;
                }
                if (Array.isArray(item.accessDTOList)) {
                  iterate(item.accessDTOList);
                }
              });
            };
            iterate(data);
            commit('SET_AUTH_LIST', authList);

            for (const a in data) {
              // 动态 ---------处理服务端返回的路由

              // 只有一级路由特殊处理
              // if (data[a].menuName === '首页') {
              //   arr.push({
              //     path: '/',
              //     redirect: data[a].menuUrl,
              //     name: 'dashboard',
              //     component: Layout,
              //     children: [
              //       {
              //         path: data[a].menuUrl,
              //         name: data[a].pathName,
              //         component: componentTo(data[a].menuUrl),
              //         meta: { title: '首页', icon: 'bell' }
              //       }
              //     ]
              //   });
              // }
              // else if (data[a].menuName === '小程序') {
              //   arr.push(
              //     {
              //       path: '/miniprogram',
              //       name: 'miniprogram',
              //       component: Layout,
              //       children: [
              //         {
              //           path: '/miniprogram/index',
              //           name: 'miniprogramIndex',
              //           component: () => import('@/views/miniprogram/miniprogramIndex'),
              //           meta: { title: '小程序' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramMenu/:id',
              //       name: 'MiniprogramMenu',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramMenu/:id',
              //           name: 'miniprogramMenu',
              //           component: () => import('@/views/miniprogram/miniprogramMenu'),
              //           meta: { title: '菜单配置' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramUcenterPage/:id',
              //       name: 'MiniprogramUcenterPage',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramUcenterPage/:id',
              //           name: 'miniprogramUcenterPage',
              //           component: () => import('@/views/miniprogram/miniprogramUcenterPage'),
              //           meta: { title: '个人中心配置' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramInfo/:id',
              //       name: 'miniprogramInfo',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramInfo/:id',
              //           name: 'miniprogramInfo',
              //           component: () => import('@/views/miniprogram/miniprogramInfo'),
              //           meta: { title: '基础配置' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramAuthorSet/:id/:isRelease',
              //       name: 'miniprogramAuthorSet',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramAuthorSet/:id/:isRelease',
              //           name: 'miniprogramAuthorSet',
              //           component: () => import('@/views/miniprogram/miniprogramAuthorSet'),
              //           meta: { title: '一键设置' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramHomepage/:id',
              //       name: 'miniprogramHomepage',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramHomepage/:id',
              //           name: 'miniprogramHomepage',
              //           component: () => import('@/views/miniprogram/miniprogramHomepage'),
              //           meta: { title: '首页配置' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramQrcode/:id',
              //       name: 'miniprogramQrcode',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramQrcode/:id',
              //           name: 'miniprogramQrcode',
              //           component: () => import('@/views/miniprogram/miniprogramQrcode'),
              //           meta: { title: '二维码' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramAssemblySetting/:id',
              //       name: 'miniprogramAssemblySetting',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramAssemblySetting/:id',
              //           name: 'miniprogramAssemblySetting',
              //           component: () => import('@/views/miniprogram/miniprogramAssemblySetting'),
              //           meta: { title: '组件配置' }
              //         }
              //       ]
              //     },
              //     {
              //       path: '/miniprogram/miniprogramMessage/:id',
              //       name: 'miniprogramMessage',
              //       component: Layout,
              //       hidden: true,
              //       children: [
              //         {
              //           path: '/miniprogram/miniprogramMessage/:id',
              //           name: 'miniprogramMessage',
              //           component: () => import('@/views/miniprogram/miniprogramMessage'),
              //           meta: { title: '消息推送' }
              //         }
              //       ]
              //     }
              //   );
              // } else if (data[a].menuName === '增加功能') {
              //   if (data[a].accessDTOList.length > 0) {
              //     arr.push({
              //       path: '/access',
              //       name: 'access',
              //       component: Layout,
              //       children: [
              //         {
              //           path: '/access/accessList',
              //           name: 'accessList',
              //           component: () => import('@/views/access/accessList'),
              //           meta: { title: '增加功能' }
              //         }
              //       ]
              //     });
              //     // 详情页置入
              //     if (data[a].accessDTOList.length === 2) {
              //       arr.push({
              //         path: '/access/accessDetail/:id',
              //         name: 'AccessDetail',
              //         component: Layout,
              //         hidden: true,
              //         children: [
              //           {
              //             path: '/access/accessDetail/:id',
              //             name: 'accessDetail',
              //             component: () => import('@/views/access/accessDetail'),
              //             meta: { title: '功能详情' }
              //           }
              //         ]
              //       });
              //     }
              //   }
              // } else {
              //   // 有二级及以上的路由
              //   if (data[a].accessDTOList.length > 0) {
              //     var obj = {
              //       path: data[a].menuUrl,
              //       name: data[a].pathName,
              //       component: Layout,
              //       meta: { title: data[a].menuName },
              //       children: []
              //     };
              //     for (const b in data[a].accessDTOList) {
              //       var secondList = data[a].accessDTOList[b];
              //       obj.children.push({
              //         path: secondList.accessUrl,
              //         name: secondList.pathName,
              //         component: componentTo(data[a].menuUrl),
              //         meta: { title: secondList.menuName }
              //       });
              //     }
              //     arr.push(obj);
              //   }
              // }
            }
            arr.push({
              // 最后置入404
              path: '*',
              redirect: '/404',
              hidden: true
            });
            commit('SET_ROUTES', arr);
            resolve(res);
          })
          .catch((err) => {
            console.log('err...', err);
            reject(err);
          });
      });
    }
  }
};
export default permission;
