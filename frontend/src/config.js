var apiHost = 'https://ucallfree-tecent.ucallclub.com'
// var webHost = 'https://mustberich.cn'
// 正式环境
// var webHost = 'https://oldmancard.ucallclub.com'
// 测试环境
var webHost = 'https://oldmancard-test.ucallclub.com'
// 本地环境
// var webHost = 'http://127.0.0.1:5000'
var webAPIHost = webHost + '/api'
var service = {
  enterpriseid: 4,
  yhServiceno: '2010660101',
  apiHost,
  webHost,
  webAPIHost,
  wxConfig: `https://agency.ucallclub.com/Common/JsApiConfig`,
  getOpenId: `${webAPIHost}/openid`,
  verifyQrCodeActive: `${apiHost}/api/v2/active`,
  weChatState: `${apiHost}/api/v1/wechatstate`, // 请求用户状态
  verifyCode: `${apiHost}/api/v1/verifycode`, // 根据电话号码获取验证码
  verify: `${apiHost}/api/v4/VerifyCodeOnly`, // 根据手机号和验证码验证
  ucall: `${webAPIHost}/ucall`, // 根据ucallfreeid获取二维码信息
  qrCodeInfo: `${webAPIHost}/qr_code_info`, // qrcode绑定的信息
  weChatCalling: `${apiHost}/api/v4/wechatcalling`,
  locationDesc: `${webAPIHost}/locationDesc`,
  msgNotification: `${webAPIHost}/msgNotification`,
  modifyOpenid: `${apiHost}/api/v1/ModifyOpenid`,
  updateQrcodeOwner: `${apiHost}/api/v5/updatequrcodeowner`,
  applyCard: `${webAPIHost}/applyCard`,
  isFamilyMember: `${webAPIHost}/isFamilyMember`
  // getURLFrom: `${webHost}/getUrlFrom`,
  // getCode: `${webHost}/code`
}
export {
  service
}
