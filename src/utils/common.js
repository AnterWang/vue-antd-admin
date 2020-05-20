import Vue from 'vue'

import { message } from 'ant-design-vue/es'
let lessNodesAppended

// event bus (语言)
const bus = new Vue()

const thatColor = '#1890FF' // 主题色设置
// 更新主题
const updateTheme = (primaryColor = thatColor) => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
  return;
} */
  // Determine if the component is remounted
//   if (!primaryColor) {
//     return
//   }

//   const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt() {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor
        })
        .then(() => {
          // hideMessage()
        })
        .catch(() => {
          message.error('Failed to update theme')
          // hideMessage()
        })
    }, 200)
  }

  if (!lessNodesAppended) {
    // 需要引入 less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
    window.less = {
      async: true,
      env: 'production',
      javascriptEnabled: true
    };
  `
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}

/**
 * 下载文件
 * @param {*} res 
 */
function download(res, name) {
  var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
  var contentDisposition = res.headers['content-disposition']; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  var result = patt.exec(contentDisposition);
  var filename = Array.isArray(result) && result.length > 0 && result[1];

  const lastDotIndex = filename && filename.lastIndexOf('.') || -1;
  let extName = '';
  if (lastDotIndex > -1) {
    extName = filename.slice(lastDotIndex);
  } 
  
  if (name) {
    filename = name.lastIndexOf('.') > -1 ? name: `${name}${extName || '.xlsx'}`
  }

  if (!filename) {
    filename = '文件.xlsx';
  }

  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); //创建下载的链接
  var reg = /^["](.*)["]$/g;
  downloadElement.style.display = 'none';
  downloadElement.href = href;
  downloadElement.download = decodeURI(filename.replace(reg, "$1")); //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
}

// 动态加载高德地图sdk
export function loadAMapScript() {
  if (window.__global_map__) {
      return Promise.resolve();
  }
  //2cd8b02225f7caf489d265806e550200
  //1d513c9e11da27818bcff443487c995f
  const url = 'https://webapi.amap.com/maps?v=1.4.15&key=950bd65707370fbb40be8d0fff3ef412&plugin=AMap.PolyEditor,AMap.Autocomplete';
  const jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  return new Promise((resolve, reject) => {
      jsapi.onload = () => {
          window.__global_map__ = true;
          resolve();
      }
      document.head.appendChild(jsapi);
  })
}

// 生成唯一ID
export function generatorId(){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


function formatTime(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss', ms = true){
  const date = new Date()
  let fmtResult = fmt
  date.setTime(ms ? timestamp : timestamp * 1000)

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }

  if (/(y+)/.test(fmt)) {
    fmtResult = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }

  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(fmtResult)) {
      fmtResult = fmtResult.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      )
    }
  })

  return fmtResult
}

const pageSizeOptions = ['10', '20', '50', '100']

export {
    bus,
    formatTime,
    download,
    updateTheme,
    pageSizeOptions
}
