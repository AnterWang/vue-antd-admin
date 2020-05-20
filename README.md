# 会花商户后台
node + vue-cli3 + vue全家桶 + ant-design-vue + less

node版本10.16  npm版本6.9

# api地址修改(废弃，已做nignx反向代理，无需修改)
utils/request.js文件第6行添加如下，例:代码块

const service = axios.create({
     baseURL: 'api地址：http://.....',
     timeout: 10000
})

# 运行及打包
npm run serve

npm run build 打包后文件在dist目录下

# 兼容性
各大主流浏览器：chrome、firefox、opera、ie10+

# 特殊及重点说明
/public/color.less 主题色配置文件用于/utils/common.js中动态更新主题色

/utils/antd-components.js antd按需导入设置

