var apiHost = 'https://ucallfree-tecent.ucallclub.com'
var webHost = 'https://mustberich.cn/api'
// var webHost = 'https://oldmancard.ucallclub.com/api'
// var webHost = 'http://127.0.0.1:5000'
var service = {
  enterpriseid: 107,
  yhServiceno: '2010660101',
  apiHost,
  webHost,
  wxConfig: `https://agency.ucallclub.com/Common/JsApiConfig`,
  getOpenId: `${webHost}/openid`,
  verifyQrCodeActive: `${apiHost}/api/v2/active`,
  weChatState: `${apiHost}/api/v1/wechatstate`, // 请求用户状态
  verifyCode: `${apiHost}/api/v1/verifycode`, // 根据电话号码获取验证码
  verify: `${apiHost}/api/v4/VerifyCodeOnly`, // 根据手机号和验证码验证
  qrCodeInfo: `${webHost}/qr_code_info`, // qrcode绑定的信息
  weChatCalling: `${apiHost}/api/v4/wechatcalling`
  // getURLFrom: `${webHost}/getUrlFrom`,
  // getCode: `${webHost}/code`
}
export {
  service,
  webHost
}
