export function getUrlParam (name) { // 获取url 参数
  // return decodeURIComponent(
  //   (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
  let reg = `(^|&)${name}=([^&]*)(&|$)`
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
// // 截取code
// export function getUrlParam (paramName) {
//   /// 获取地址栏指定参数的值
//   /// <param name="paramName">参数名</param>
//   // 获取url中跟在问号后面的部分
//   var params = window.location.search
//   // 检测参数是否存在
//   if (params.indexOf(paramName) > -1) {
//     var paramValue = ''
//     paramValue = params.substring(params.indexOf(paramName), paramName.length + 1)
//     // // 检测后面是否还有参数
//     // if (paramValue.indexOf('&') > -1) {
//     //   // 去除后面多余的参数, 得到最终 paramName=paramValue 形式的值
//     //   paramValue = paramValue.substring(0, paramValue.indexOf('&'))
//     //   // 去掉参数名, 得到最终纯值字符串
//     //   paramValue = paramValue.replace(paramName + '=', '')
//     //   return paramValue
//     // }
//     return paramValue
//   }
// }
