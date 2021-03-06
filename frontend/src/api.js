import {get, post} from './http'
import {service} from './config'

const wxConfig = () => {
  return get(service.wxConfig)
}
const wxConfigWithUrl = (url) => {
  return get(service.wxConfig, {
    url: url
  })
}
const getHeader = function (openId) {
  return {
    'content-type': 'application/json',
    'Authorization': 'Basic ' + openId
  }
}

const getOpenId = (code) => {
  return get(service.getOpenId, {
    code: code
  })
}
const weChatState = (openId, nickName = '', serviceno = '') => {
  return post(service.weChatState,
    {
      Nickname: nickName,
      serviceno: serviceno
    }
    , getHeader(openId))
}
const verifyQrCodeActive = (qrCodeId) => {
  return get(service.verifyQrCodeActive, {
    qrcodeid: qrCodeId
  })
}
// 激活二维码
const activateQrCode = (openId, qrcodeid, ucallfreeid) => {
  return post(service.verifyQrCodeActive, {
    qrcodeid: qrcodeid,
    ucallfreeid: ucallfreeid
  }, getHeader(openId))
}
// 根据手机号获取验证码
const getVerifyCode = (openId, number) => {
  return get(service.verifyCode, {
    tel: number
  }, getHeader(openId))
}
// 验证手机号是否合法
const verifyNumber = (openId, number, verifyNumber) => {
  return post(service.verify, {
    AuthCode: verifyNumber,
    Tel: number
  }, getHeader(openId))
}

const applyCard = (ucallFreeId, phoneNumber, address, name, postCode) => {
  return post(service.applyCard, {
    ucallFreeId,
    phoneNumber,
    address,
    name,
    postCode
  }, {
    'Content-Type': 'application/json'
  })
}

const getApplyCardInfo = (ucallFreeId) => {
  return get(service.applyCard, {ucallFreeId})
}

const getInfoByUCallId = (ucallFreeId) => {
  return get(service.ucall, {ucallFreeId})
}

const getInfo = (qrCodeId) => {
  return get(service.qrCodeInfo, {qrcodeid: qrCodeId})
}
/**
 * 保存老人信息
 * @param qrCodeId 二维码id
 * @param oldManInfo 老人信息，类型：{}
 * @param phone_number 联系人，类型：[]
 */
const saveInfo = (qrCodeId, ucallFreeId, oldManInfo, phoneNnumber) => {
  return post(service.qrCodeInfo, {
    qr_code_id: qrCodeId,
    ucallFreeId: ucallFreeId,
    old_man_info: oldManInfo,
    phone_number: phoneNnumber
  }, {
    'Content-Type': 'application/json'
  })
}
const weChatCalling = (openId, phoneNumbers, qrcodeid) => {
  var serviceNo = ''
  for (var i = 0; i < phoneNumbers.length; i++) {
    serviceNo += phoneNumbers[i] + '`'
  }
  serviceNo = serviceNo.substr(0, serviceNo.length - 1)
  console.log('参数:', service.enterpriseid, service.yhServiceno, serviceNo)
  return post(service.weChatCalling, {
    Enterpriseid: service.enterpriseid,
    YhServiceno: service.yhServiceno,
    Callmode: 1,
    Servicetype: 1,
    Serviceno: serviceNo,
    Display: 1,
    Eqrcode: qrcodeid
  }, getHeader(openId))
}
/**
 * 根据经纬度获取地理位置的描述信息
 * @param lat 维度
 * @param lon 精度
 * @param key 腾讯地图的key
 */
const getLocationDesc = (lat, lon) => {
  // var d = [lat, lon].join(',')
  return get(service.locationDesc, {
    'lat': lat,
    'lon': lon
  })
}
/**
 * 发送短信通知
 * @param orgid 企业id
 * @param password 密码
 * @param mobile 手机号
 * @param content 短信内容
 */
const sendMsgNotification = (mobile, content) => {
  return post(service.msgNotification, {
    'mobile': mobile,
    'content': content
  }, {
    'Content-Type': 'application/json'
  })
}

// 查询某个电话号码是否在家属联系人列表中
const isFamilyMember = (qrCodeId, ucallFreeId, phoneNumber) => {
  return get(service.isFamilyMember, {
    qrCodeId: qrCodeId,
    ucallFreeId: ucallFreeId,
    phoneNumber: phoneNumber
  })
}

const updateQrcodeOwner = (openId, qrCodeId) => {
  return post(service.updateQrcodeOwner, {
    QrcodeId: qrCodeId
  }, getHeader(openId))
}

const modifyOpenid = (openId, ucallfreeid, nickname, unionid, headurl) => {
  return post(service.modifyOpenid, {
    'ucallfreeid': ucallfreeid,
    'nickname': nickname,
    'unionid': unionid,
    'headurl': headurl
  }, getHeader(openId))
}

export default {
  wxConfig,
  wxConfigWithUrl,
  getOpenId,
  weChatState,
  verifyQrCodeActive,
  activateQrCode,
  getVerifyCode,
  verifyNumber,
  getInfoByUCallId,
  getInfo,
  saveInfo,
  weChatCalling,
  getLocationDesc,
  sendMsgNotification,
  modifyOpenid,
  applyCard,
  isFamilyMember,
  getApplyCardInfo,
  updateQrcodeOwner
}
