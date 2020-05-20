console.log(process.env.NODE_ENV);

module.exports = {
  publicPath: '/', // 解决打包后空白
  lintOnSave: false, // 关闭eslint检测
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, // less 配置
      },
    }, // css预设器配置项
  },
  devServer: {
    // 跨域设置
    proxy: {
      '/': {
        target: 'https://hhsaas-test.miyapay.com', // 新测试
        // target: 'https://saas-zuultest.miyapay.com', // 开发
        // target: 'http://47.99.149.224:8080', // 开发
        ws: false, // 是否代理websockets
        changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL
      },
    },
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');

    // // 或者
    // // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  },
};
