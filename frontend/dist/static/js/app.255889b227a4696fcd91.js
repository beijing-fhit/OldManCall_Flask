webpackJsonp([1],{"+Grc":function(t,e){},"5wx/":function(t,e){},"9iyy":function(t,e){},B7Kp:function(t,e,n){t.exports=n.p+"static/img/call.e808d6e.png"},KuaY:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAvCAYAAAHShXlfAAAAAXNSR0IArs4c6QAABPtJREFUaAXtWU2IHEUU7uru0ZW4GiZhw54U9KiniCASyE3JwSCIQk6K153JLllWvcRJUNeVlQ2ZwVOuogYFQTHgTb0oqEfx4B8eIlE2uitZdzPVXX6vnddWV1dVT28yk4hT0PP+36ufV12vekQwaLLVuqiUmhVB8F7c6z0hwLgAxqOswBAKQdCfm1NCiD+A3g6lGMwkZg0w9jJOMNSJEk6udCbi7uQ0CXUFoRO51o1A1Pz8rJybe1aP7eycUzCwhiNJaGmm2NCEHLVkwAIXrG2QLTd567dapwKlTro8N3q9TDc3IEV14sRdcmfnJ92IFXVejvNAcwYQk7f7JOi32yu6Zx3XoxRmCQN/lRRlu/0kQdVu30dQbwUDzMACCbEPWgSlUk8T1FvBQBe48HEbKHWFuoKxbA269Jera5Qaay6hPq15auhMmyGnSG5gU6pyktsI8Umj2z2c0xoikBGdIE1f1HijRanXvjT0RSdbflWwXu28YMNhoTcAvaz1dUAmfGbQqzptC+oNYDOoy5sEqJwx7xTF3e6t8f79t7EXbKZD8Z49+RkPejGemjrAchss7WTOCt7qNiMbj85c1AvnUH28hY4dY51SABLgVX0wUeoDvIlnWdEH4TSF/F04fsrUswZgJeyDtxGkZMRyOL4UBcHDotv9nnkmzOsnU+CqxHQ9BD+AEuI78JwddQqGWQt5/PgxlSRvxo3GPWJt7Qc9OOO7P5jZgx++7E1Tv221FNNzf0GLXrU8NQXBEAS94m22Ix0B9evGBqAh6/URUrfPdRP1DvTvXE8RbWuVI9DrKeR9jCers8gZ8L1YyKz+sjknXmUAl+Gw/EmAypmaTNF/Y4oKRT82Fl8GuPcmzfwMOk80klLFIFZXf2ULqijEyspGTqPiEJ3ONtM2WMwiIRJdSXdOfN15RuvOlbpFt2W8GACfRkhAJQgrDA2Vmrfpls5k26FhM7TyhDiNYqxwmTFHEFDBhXZ+UOtY/ZhM6P4Sh+EDpnPSK43ANLbRamHh3kTKr/C6vsMmr8tDB6+gvnoQ9dU3tW3rGqhOJ07W1zfRea6Jv8Q0f1jXD+mj3HwE4CHCMQgZ7ds3XZX1pKu3bAUwo82g379TFzjxKJqRSfI5y0Mhng+VOs90HZiG4WNpmp5hm1iIwziFf2baC6enN8Xy8jp9a6TZnPYq36RCrNqfMZZtBinxOIjSCqg0fQM3lmyV8PMR1vmdsYwF9xHEPUKx0C+62DxTiivERtRsXsg6VxIOGFQHwxH2F1oYvtY4e/a5gWikIPtMkqZLFAQdTPBZ2nmilF5zI+3ZCJxf0wDwMfputbTk3D9qcXGGHle/yZZ8uOTD8Hc9AGz+DSnlj3JraxOn30tmMKTfx3J7+1L2ADflZEO2mQ/4MuXD0rseAAJM5UGE+BcfMPFPCZ8TgY47bEr2uV4Fci0DqHA9HvFkAOOZZ3eUyQq452Y8kskKjGee3VH+vyuAIusUzQuqxd/wVe2cOUdCqdch28ke4KacbMiW+Djolk35sLSzyqtyEHW7r0CHHmtDBfk+BM4TVvR630LurJOsTi1MfwrhMp3bKJVd/XJ6lEgx1kVfKO8KRFF0NEmSL3Bji3HVOzT4ZPEp8uZrPFd9jmvL/vkwc5Di4MnMkWISl5GjPl/eCw0Z0iVeXr58Ejn9QjYQn7frJKOO076Im83TuOTj/xp3+xshD+wEPMZo4AAAAABJRU5ErkJggg=="},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o=n("/ocq"),s={name:"topbar",data:function(){return{save_icon_url:n("iFoD")}},methods:{save:function(){this.$emit("saveInfo")},onBackTap:function(){this.$router.back()},goHome:function(){this.$router.push("/")}},props:{showSaveBtn:!1,hideBackBtn:!1}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"bartop"},[n("i",{staticClass:"el-icon-menu color-purple margin-horizontal big-font-size",on:{click:t.goHome}}),t._v(" "),n("i",{staticClass:"linear-line"}),t._v(" "),n("i",{directives:[{name:"show",rawName:"v-show",value:!t.hideBackBtn,expression:"!hideBackBtn"}],staticClass:"el-icon-back color-purple margin-horizontal big-font-size",on:{click:t.onBackTap}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:this.showSaveBtn,expression:"this.showSaveBtn"}],staticClass:"save-area",on:{click:t.save}},[n("el-image",{staticClass:"color-purple img-icon-style",attrs:{src:t.save_icon_url}}),t._v(" "),n("span",{staticClass:"color-purple small-font-size margin-left-style"},[t._v("保存")])],1)])},staticRenderFns:[]};var c=n("VU/8")(s,i,!1,function(t){n("hQVW")},"data-v-140eb342",null).exports,r=n("fxnj"),l=n.n(r),u=n("mvHQ"),d=n.n(u),f=n("//Fk"),m=n.n(f),p=n("mtWM"),v=n.n(p);v.a.defaults.timeout=1e4;var h=v.a.create({timeout:3e4});function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.t=(new Date).getTime(),h({url:t,method:"get",headers:n,params:e})}function C(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={url:t,method:"post",headers:arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},data:e};return n.data=d()(e),h(n)}h.interceptors.request.use(function(t){return t},function(t){m.a.reject(t)}),h.interceptors.response.use(function(t){var e={};return e.status=t.status,e.data=t.data,e},function(t){return t.response&&404===t.response.status&&console.log("error http 404:",t.response),m.a.reject(t.response)});var _="https://ucallfree-tecent.ucallclub.com",b="https://oldmancard.ucallclub.com",y=b+"/api",w={enterpriseid:107,yhServiceno:"2010660101",apiHost:_,webHost:b,webAPIHost:y,wxConfig:"https://agency.ucallclub.com/Common/JsApiConfig",getOpenId:y+"/openid",verifyQrCodeActive:_+"/api/v2/active",weChatState:_+"/api/v1/wechatstate",verifyCode:_+"/api/v1/verifycode",verify:_+"/api/v4/VerifyCodeOnly",qrCodeInfo:y+"/qr_code_info",weChatCalling:_+"/api/v4/wechatcalling"},I=function(t){return{"content-type":"application/json",Authorization:"Basic "+t}},A=function(){return g(w.wxConfig)},x=function(t){return g(w.getOpenId,{code:t})},S=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return C(w.weChatState,{Nickname:e,serviceno:n},I(t))},k=function(t){return g(w.verifyQrCodeActive,{qrcodeid:t})},U=function(t,e,n){return C(w.verifyQrCodeActive,{qrcodeid:e,ucallfreeid:n},I(t))},E=function(t,e){return g(w.verifyCode,{tel:e},I(t))},F=function(t,e,n){return C(w.verify,{AuthCode:n,Tel:e},I(t))},R=function(t){return g(w.qrCodeInfo,{qrcodeid:t})},N=function(t,e,n){return C(w.qrCodeInfo,{qr_code_id:t,old_man_info:e,phone_number:n},{"Content-Type":"application/json"})},T=function(t,e,n){for(var a="",o=0;o<e.length;o++)a+=e[o]+"`";return a=a.substr(0,a.length-1),console.log("serviceno:",a),C(w.weChatCalling,{Enterpriseid:w.enterpriseid,YhServiceno:w.yhServiceno,Callmode:1,Servicetype:1,Serviceno:a,Display:1,Eqrcode:n},I(t))},V={name:"scan",components:{topbar:c},data:function(){return{tip:'请您拿起家属联络卡，如下<span class="black-text">红色正面</span>朝上。点击下方“扫码”按钮，扫描卡上二维码绑定手机。',img_url:n("uy1N")}},mounted:function(){console.log("created---"),l.a.ready(function(){console.log("ready-----")}),l.a.error(function(t){console.log("error-----")}),A().then(function(t){console.log("config",t.data),l.a.config({debug:!1,appId:t.data.appId,timestamp:t.data.timestamp,nonceStr:t.data.nonceStr,signature:t.data.signature,jsApiList:["scanQRCode"]})})},methods:{routeToScanSuccess:function(){this.startScan()},startScan:function(){var t=this,e=sessionStorage.getItem("UcallFreeId");null!==e&&""!==e&&"undefined"!==e&&void 0!==e&&l.a.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(e){var n=e.resultStr;t.handleScanResult(n),console.log("scanQrCode:",n)}})},handleScanResult:function(t){var e=this;if(-1!==t.indexOf("qrcodeid")){var n=t.split("?")[1],a=this.getQueryValue(n,"qrcodeid");console.log("传入的qrcode是:"+a),sessionStorage.setItem("qrCodeId",a),k(a).then(function(t){console.log("验证二维码激活状态结果:",t);var n=sessionStorage.getItem("UcallFreeId");console.log("本地的UCallfreeid为:",n);var a=t.data;if(0===a.Code)switch(a.ActiveState){case 0:sessionStorage.setItem("isQrCodeActive",0),e.$router.push("/addContact");break;case 1:sessionStorage.setItem("isQrCodeActive",1),a.Owner===n?e.$router.push("/settings"):e.$router.push("/alreadyBindInfo");break;default:e.$toast("二维码无效")}}).catch(function(t){console.log("error验证二维码激活状态结果:",t)})}},getQueryValue:function(t,e){for(var n=t.split("&"),a=0;a<n.length;a++){var o=n[a].split("=");if(o[0]===e)return o[1]}return null}}},q={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"all-container"},[n("topbar",{attrs:{"hide-back-btn":!0}}),t._v(" "),n("div",{staticClass:"img-text-container"},[n("div",{staticClass:"text-container"},[n("label",{staticClass:"label-style",domProps:{innerHTML:t._s(this.tip)}})]),t._v(" "),n("el-image",{staticClass:"img-style",attrs:{src:t.img_url}})],1),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"},on:{click:function(e){return e.preventDefault(),t.routeToScanSuccess(e)}}},[t._v("扫码")])],1)},staticRenderFns:[]};var D=n("VU/8")(V,q,!1,function(t){n("+Grc")},"data-v-0e1602a8",null).exports;function P(t){var e="(^|&)"+t+"=([^&]*)(&|$)",n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}var Q={name:"auth",data:function(){return{}},created:function(){this.init()},methods:{init:function(){var t=this,e=P("openid"),n=P("ucallfreeid"),a=P("qrcodeid");if(e&&n&&a)sessionStorage.setItem("openId",e),sessionStorage.setItem("UcallFreeId",n),sessionStorage.setItem("qrCodeId",a),k(a).then(function(e){0===e.data.Code&&(0===e.data.ActiveState?t.$router.push({path:"/info",query:{message:"二维码未激活，请前往公众号激活!"}}):t.$router.push("/call"))}).catch(function(e){t.$router.push({path:"/info",query:{message:e}})});else{var o=P("code");if(o)this.getOpenId(o);else{var s=encodeURI(w.webHost);window.location.href="https://agency.ucallclub.com/wechart/Oauth2?redirect_uri="+s}}},getOpenId:function(t){var e=this;x(t).then(function(t){if(0===t.data.status_code){var n=t.data.data;sessionStorage.setItem("openId",n),S(n).then(function(t){sessionStorage.setItem("UcallFreeId",t.data.UcallFreeId),sessionStorage.setItem("Tel",t.data.Tel[0]),e.$router.push("/scan")}).catch(function(t){console.log("webChatState error",t)})}else console.log(t.data.message)}).catch(function(t){console.log("在app.vue中获取openid失败:",t)})}}},O={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var B=n("VU/8")(Q,O,!1,function(t){n("zUBj")},"data-v-32d1a9ef",null).exports,$={name:"ScanSuccess",data:function(){return{success_img_url:n("mzrL"),bindStatusStr:'<span class="black-text">绑定成功!</span>',statusTip:"接下来让我们去添加联系人吧"}}},z={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"scan-success-container"}},[n("el-image",{staticClass:"success-img",attrs:{src:t.success_img_url}}),t._v(" "),n("div",{staticClass:"status-container"},[n("div",{domProps:{innerHTML:t._s(t.bindStatusStr)}}),t._v(" "),n("div",{staticClass:"normal-tip",domProps:{textContent:t._s(t.statusTip)}})]),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"},on:{click:function(e){return e.preventDefault(),t.routeToScanSuccess(e)}}},[t._v("下一步")])],1)},staticRenderFns:[]};var M=n("VU/8")($,z,!1,function(t){n("9iyy")},"data-v-6d6b4362",null).exports,j={name:"oldManInfo",data:function(){return{backgroundImage:n("fWB7")}},props:{info:{default:{name:"预设内容",age:"预设内容",address:"预设内容",medical_history:"预设内容",allergy:"预设内容",blood_type:"预设内容",drugs:"预设内容",treatment:"预设内容"}}}},G={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info-panel"},[n("div",{staticClass:"title"},[t._v("个人信息")]),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"info-key"},[t._v("姓名")]),t._v(" "),n("span",{staticClass:"info-value"},[t._v(t._s(this.info.name))]),t._v(" "),n("span",{staticClass:"info-key"},[t._v("年纪")]),t._v(" "),n("span",{staticClass:"info-value"},[t._v(t._s(this.info.age))])]),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"info-key"},[t._v("地址")]),t._v(" "),n("span",{staticClass:"long-info-value"},[t._v(t._s(this.info.address))])]),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"info-key"},[t._v("病史")]),t._v(" "),n("span",{staticClass:"long-info-value"},[t._v(t._s(this.info.medical_history))])]),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"info-key"},[t._v("过敏史")]),t._v(" "),n("span",{staticClass:"long-info-value"},[t._v(t._s(this.info.allergy))])]),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"info-key"},[t._v("血型")]),t._v(" "),n("span",{staticClass:"info-value"},[t._v(t._s(this.info.blood_type))])]),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"long-info-key"},[t._v("正在吃的药")]),t._v(" "),n("span",{staticClass:"long-info-value"},[t._v(t._s(this.info.drugs))])]),t._v(" "),n("el-row",{staticClass:"info-item item-margin-top"},[n("span",{staticClass:"long-info-key"},[t._v("正在进行的治疗")]),t._v(" "),n("span",{staticClass:"long-info-value"},[t._v(t._s(this.info.treatment))])])],1)},staticRenderFns:[]};var Z=n("VU/8")(j,G,!1,function(t){n("tgPZ")},"data-v-427b514e",null).exports,J={name:"alreadyBindInfo",components:{oldManInfo:Z},data:function(){return{heart_img_url:n("YfaA"),bind_info:"该二维码已经绑定过了",info:{name:"预设内容",age:"预设内容",address:"预设内容",medical_history:"预设内容",allergy:"预设内容",blood_type:"预设内容",drugs:"预设内容",treatment:"预设内容"}}},created:function(){var t=this;R(sessionStorage.getItem("qrCodeId")).then(function(e){console.log("获取信息成功",e);var n=e.data;0===n.status_code&&(t.info=n.data.old_man_info)}).catch(function(t){console.log("获取信息失败",t)})},methods:{backToIndex:function(){this.$router.back()}}},L={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info-container"},[n("el-image",{staticClass:"heart-img",attrs:{src:t.heart_img_url}}),t._v(" "),n("div",{staticClass:"bind-info"},[t._v(t._s(t.bind_info))]),t._v(" "),n("old-man-info",{attrs:{info:this.info}}),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"},on:{click:t.backToIndex}},[t._v("返回")])],1)},staticRenderFns:[]};var H=n("VU/8")(J,L,!1,function(t){n("5wx/")},"data-v-6099ebf4",null).exports,W={name:"addContact",components:{Topbar:c},data:function(){return{number:"",verifyNumber:"",verifyBtnContent:"获取验证码",isVerifyBtnClickable:!0,centerDialogVisible:!1,isClearInterval:!1,contact:null===sessionStorage.getItem("contact")?"":sessionStorage.getItem("contact"),modifyIndex:1}},mounted:function(){var t=this.$route.query.modifyNumber;console.log("在addContact页面获取到的参数是:",t),console.log("在addContact页面获取到的参数contact是:",this.contact),null===t|""===t|void 0===t?console.log("在addContact页面获取到的参数contact2是:",t):t+"".match("[0-9]{1,}")?this.number=t:this.number=""},methods:{getVerifyCode:function(){if(0!==this.number.length)if(this.isVerifyBtnClickable)if(-1===this.contact.split(",").indexOf(this.number,0)){var t=this;E(sessionStorage.getItem("openId"),this.number).then(function(e){console.log("获取号码",e),0===e.data.Code?(t.$toast("短信已发送"),t.countDown()):-3===e.data.Code?t.$toast("验证码请求太频繁！"):-6===e.data.Code&&t.$toast("号码格式不正确！")}).catch(function(t){console.log("获取验证码失败:",t)})}else this.$toast("您已添加此号码!");else this.$toast("您点的太快了，请稍等！");else this.$toast("号码不能为空！")},verify:function(){var t=this;0!==this.number.length?0!==this.verifyNumber.length?F(sessionStorage.getItem("openId"),this.number,this.verifyNumber).then(function(e){if(console.log("验证成功:",e),0===e.data.Code){if(t.$toast("验证成功"),t.centerDialogVisible=!0,console.log("验证成功contact:",t.contact),-1===t.contact.indexOf(t.number,0)){var n=t.$route.query.index;if(null===n|""===n|void 0===n)t.contact+=t.number+",",t.contact.length>=3&&(t.contact=t.contact.substr(0,t.contact.length-1)),sessionStorage.setItem("contact",t.contact);else{var a=t.contact.split(","),o="";0===n?o=t.number+","+a[1]+","+a[2]:1===n?o=a[0]+","+t.number+","+a[2]:2===n&&(o=a[0]+","+a[1]+","+t.number),t.contact=o,sessionStorage.setItem("contact",t.contact),t.$router.push({path:"/settings",query:{getPhoneNumberFromNet:!1}})}}}else t.$toast("验证失败"),t.centerDialogVisible=!1}).catch(function(){t.$toast("验证失败"),t.centerDialogVisible=!1}):this.$toast("验证码不能为空！"):this.$toast("号码不能为空！")},countDown:function(){var t=this;t.isVerifyBtnClickable=!1;var e=60,n=setInterval(function(){t.verifyBtnContent=e+"s后重新发送",(--e<=0||t.isClearInterval)&&(window.clearInterval(n),t.isVerifyBtnClickable=!0,t.verifyBtnContent="获取验证码")},1e3)},dialogSkip:function(){console.log("跳过"),this.$router.push({path:"/settings",query:{getPhoneNumberFromNet:!1}})},dialogAddMore:function(){console.log("添加下一位"),this.centerDialogVisible=!1,this.isClearInterval=!0}}},K={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"all-container"},[n("topbar"),t._v(" "),n("el-row",{staticClass:"add-tip"},[n("i",{staticClass:"linear-line margin-horizontal"}),t._v(" "),n("span",{staticClass:"tip-text"},[t._v("您最多可以绑定3位联系人")])]),t._v(" "),n("div",{staticClass:"contact-panel"},[n("el-row",{staticClass:"first-item"},[n("i",{staticClass:"el-icon-star-on red-star margin-horizontal"}),t._v(" "),n("span",{staticClass:"title-name"},[t._v("联系人1")]),t._v(" "),n("span",{staticClass:"title-tip"},[t._v("(必填)")])]),t._v(" "),n("el-row",{staticClass:"first-input-container bottom-border"},[n("el-input",{staticClass:"normal-input-style no-border-input",attrs:{type:"number",placeholder:"请输入手机号码",clearable:""},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),t._v(" "),n("el-row",{staticClass:"second-input-container"},[n("el-input",{staticClass:"normal-input-style no-border-input sixty-percent",attrs:{type:"number",placeholder:"请输入验证码"},model:{value:t.verifyNumber,callback:function(e){t.verifyNumber=e},expression:"verifyNumber"}}),t._v(" "),n("span",{staticClass:"fourty-percent verify-code-text-btn",on:{click:t.getVerifyCode}},[t._v(t._s(this.verifyBtnContent))])],1)],1),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"},on:{click:t.verify}},[t._v("确定")]),t._v(" "),n("el-dialog",{attrs:{visible:t.centerDialogVisible,title:"绑定成功",width:"80%","show-close":!1,center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[n("span",{staticClass:"center-dialog-content"},[t._v("还需要再添加一位联系人么？")]),t._v(" "),n("span",{staticClass:"dialog-footer dialog-btn-group",attrs:{slot:"footer"},slot:"footer"},[n("span",{staticClass:"skip-btn",on:{click:t.dialogSkip}},[t._v("跳过")]),t._v(" "),n("span",{staticClass:"add-another-btn",attrs:{type:"primary"},on:{click:t.dialogAddMore}},[t._v("添加下一位")])])])],1)},staticRenderFns:[]};var X=n("VU/8")(W,K,!1,function(t){n("e85r")},"data-v-30ee5a32",null).exports,Y={name:"settings",components:{Topbar:c},inject:["reload"],data:function(){return{manInfo:{name:"",address:"",age:"",medical_history:"",allergy:"",blood_type:"",drugs:"",treatment:""},text1:"请输入手机号码",text2:"请输入手机号码",showContact2Delete:!1,showContact3Delete:!1,contact:this.getContact()}},created:function(){var t=this;R(sessionStorage.getItem("qrCodeId")).then(function(e){if(0===e.data.status_code){var n=e.data.data;if(t.manInfo.name=n.old_man_info.name,t.manInfo.age=n.old_man_info.age,t.manInfo.address=n.old_man_info.address,t.manInfo.medical_history=n.old_man_info.medical_history,t.manInfo.allergy=n.old_man_info.allergy,t.manInfo.blood_type=n.old_man_info.blood_type,t.manInfo.drugs=n.old_man_info.drugs,t.manInfo.treatment=n.old_man_info.treatment,null!==t.$route.query.getPhoneNumberFromNet&&!1===t.$route.query.getPhoneNumberFromNet)return;sessionStorage.setItem("contact",t.generatePhoneStr(n.phone_number)),t.contact=t.getContact()}})},methods:{routeToCallUpdatePage:function(){this.$router.push("/updateNumber")},generatePhoneStr:function(t){for(var e="",n=0;n<t.length;n++){e+=t[n]+","}return e=e.substr(0,e.length-1)},getleagalContact:function(t){for(var e=[],n=0,a=t,o=0;o<a.length;o++)null!==a[o]&&""!==a[o]&&void 0!==a[o]&&"undefined"!==a[o]&&(e[n]=a[o],n++);return e},getContact:function(){if(null!==sessionStorage.getItem("contact")){var t=sessionStorage.getItem("contact").split(",");switch(t.length){case 1:this.showContact2Delete=!1,this.showContact3Delete=!1;break;case 2:this.showContact2Delete=!0,this.showContact3Delete=!1;break;case 3:this.showContact2Delete=!0,this.showContact3Delete=!0}return t}return[]},modifyContact:function(t){2!==t||""!==this.text1?this.$router.push({path:"/addContact",query:{modifyNumber:this.contact[t],index:t,mode:""===this.contact[t]?1:0}}):this.$toast("请先绑定第二个联系人！")},deleteContact:function(t){this.contact[t]="",sessionStorage.setItem("contact",this.generatePhoneStr(this.contact)),this.contact=this.getContact(),this.reload()},saveInfo:function(){var t=this;if(0!==this.manInfo.name.length){var e=sessionStorage.getItem("qrCodeId"),n=this.manInfo,a=this.getleagalContact(this.contact);N(e,n,a).then(function(n){0===n.data.status_code?0===sessionStorage.getItem("isQrCodeActive")||"0"===sessionStorage.getItem("isQrCodeActive")?U(sessionStorage.getItem("openId"),e,sessionStorage.getItem("UcallFreeId")).then(function(e){0===e.data.Code?(t.$toast("激活二维码成功"),t.$router.push("/call")):t.$toast("激活二维码失败")}).catch(function(e){t.$toast("激活二维码失败"),console.log("激活二维码失败:",e)}):(t.$toast("保存信息成功"),t.$router.push("/call")):t.$toast("保存信息失败")}).catch(function(e){console.log("保存信息失败:",e),t.$toast("保存信息失败")})}else this.$toast("姓名不能为空!")}}},tt={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("Topbar",{staticClass:"topbar",attrs:{"show-save-btn":!0},on:{saveInfo:t.saveInfo}})],1),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"contact-panel"},[n("el-row",{staticClass:"contact-item border-bottom"},[n("span",{staticClass:"contact-name"},[t._v("联系人1")]),t._v(" "),n("span",{staticClass:"contact-number",on:{click:function(e){return t.modifyContact(0)}}},[t._v(t._s(void 0===t.contact[0]||"undefined"===t.contact[0]||null===t.contact[0]||""===t.contact[0]?t.text1:t.contact[0]))]),t._v(" "),n("span",{staticClass:"delete-img"})]),t._v(" "),n("el-row",{staticClass:"contact-item border-bottom"},[n("span",{staticClass:"contact-name"},[t._v("联系人2")]),t._v(" "),n("span",{staticClass:"contact-number",on:{click:function(e){return t.modifyContact(1)}}},[t._v(t._s(void 0===t.contact[1]||"undefined"===t.contact[1]||null===t.contact[1]||""===t.contact[1]?t.text1:t.contact[1]))]),t._v(" "),n("el-popconfirm",{attrs:{"confirm-button-text":"确定","cancel-button-text":"取消",icon:"el-icon-info",iconColor:"red",title:"删除该联系人吗？"},on:{onConfirm:function(e){return t.deleteContact(1)}}},[n("i",{directives:[{name:"show",rawName:"v-show",value:t.showContact2Delete,expression:"showContact2Delete"}],staticClass:"el-icon-delete delete-img",attrs:{slot:"reference"},slot:"reference"})])],1),t._v(" "),n("el-row",{staticClass:"contact-item"},[n("span",{staticClass:"contact-name"},[t._v("联系人3")]),t._v(" "),n("span",{staticClass:"contact-number",on:{click:function(e){return t.modifyContact(2)}}},[t._v(t._s(void 0===t.contact[2]||"undefined"===t.contact[2]||null===t.contact[2]||""===t.contact[2]?t.text1:t.contact[2]))]),t._v(" "),n("el-popconfirm",{attrs:{"confirm-button-text":"确定","cancel-button-text":"取消",icon:"el-icon-info",iconColor:"red",title:"删除该联系人吗？"},on:{onConfirm:function(e){return t.deleteContact(2)}}},[n("i",{directives:[{name:"show",rawName:"v-show",value:t.showContact3Delete,expression:"showContact3Delete"}],staticClass:"el-icon-delete delete-img",on:{click:function(e){return t.deleteContact(2)}}})])],1)],1),t._v(" "),t._m(1),t._v(" "),n("div",{staticClass:"info-fill-panel leftpadding"},[n("el-row",{staticClass:"info-item border-bottom "},[n("span",{staticClass:"info-name"},[t._v("姓名")]),t._v(" "),n("el-input",{staticClass:"info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容(必填)",clearable:""},model:{value:t.manInfo.name,callback:function(e){t.$set(t.manInfo,"name",e)},expression:"manInfo.name"}})],1),t._v(" "),n("el-row",{staticClass:"info-item border-bottom "},[n("span",{staticClass:"info-name"},[t._v("地址")]),t._v(" "),n("el-input",{staticClass:"info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.address,callback:function(e){t.$set(t.manInfo,"address",e)},expression:"manInfo.address"}})],1)],1),t._v(" "),n("el-row",{staticClass:"info-item border-bottom leftpadding white-bg"},[n("span",{staticClass:"info-name"},[t._v("年纪")]),t._v(" "),n("el-input",{staticClass:"info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.age,callback:function(e){t.$set(t.manInfo,"age",e)},expression:"manInfo.age"}})],1),t._v(" "),n("div",{staticClass:"info-fill-panel leftpadding"},[n("el-row",{staticClass:"info-item border-bottom"},[n("span",{staticClass:"info-name"},[t._v("病史")]),t._v(" "),n("el-input",{staticClass:"info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.medical_history,callback:function(e){t.$set(t.manInfo,"medical_history",e)},expression:"manInfo.medical_history"}})],1),t._v(" "),n("el-row",{staticClass:"info-item border-bottom"},[n("span",{staticClass:"info-name"},[t._v("过敏史")]),t._v(" "),n("el-input",{staticClass:"info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.allergy,callback:function(e){t.$set(t.manInfo,"allergy",e)},expression:"manInfo.allergy"}})],1)],1),t._v(" "),n("el-row",{staticClass:"info-item border-bottom leftpadding white-bg"},[n("span",{staticClass:"info-name"},[t._v("血型")]),t._v(" "),n("el-input",{staticClass:"info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.blood_type,callback:function(e){t.$set(t.manInfo,"blood_type",e)},expression:"manInfo.blood_type"}})],1),t._v(" "),n("div",{staticClass:"info-fill-panel leftpadding "},[n("el-row",{staticClass:"info-item border-bottom"},[n("span",{staticClass:"long-info-name"},[t._v("正在吃的药")]),t._v(" "),n("el-input",{staticClass:"long-info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.drugs,callback:function(e){t.$set(t.manInfo,"drugs",e)},expression:"manInfo.drugs"}})],1),t._v(" "),n("el-row",{staticClass:"info-item"},[n("span",{staticClass:"long-info-name"},[t._v("正在进行的治疗")]),t._v(" "),n("el-input",{staticClass:"long-info-content normal-input-style no-border-input",attrs:{placeholder:"预设内容",clearable:""},model:{value:t.manInfo.treatment,callback:function(e){t.$set(t.manInfo,"treatment",e)},expression:"manInfo.treatment"}})],1)],1),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"},on:{click:t.saveInfo}},[t._v("保存")])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"item-title"},[e("span",{staticClass:"title-text"},[this._v("联系人号码绑定/修改")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"item-title border-bottom"},[e("span",{staticClass:"title-text"},[this._v("信息填写")])])}]};var et=n("VU/8")(Y,tt,!1,function(t){n("mxGn")},"data-v-76fbcad5",null).exports,nt={name:"updateNumber",components:{Topbar:c},data:function(){return{delete_img:n("KuaY")}}},at={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("topbar",{staticClass:"topbar"}),t._v(" "),n("div",{staticClass:"contact-panel"},[n("el-row",{staticClass:"contact-item border-bottom"},[n("span",{staticClass:"contact-name"},[t._v("联系人1")]),t._v(" "),n("span",{staticClass:"contact-number"},[t._v("手机号码")]),t._v(" "),n("i",{staticClass:"el-icon-delete delete-img"})]),t._v(" "),n("el-row",{staticClass:"contact-item border-bottom"},[n("span",{staticClass:"contact-name"},[t._v("联系人2")]),t._v(" "),n("span",{staticClass:"contact-number"},[t._v("手机号码")]),t._v(" "),n("i",{staticClass:"el-icon-delete delete-img"})]),t._v(" "),n("el-row",{staticClass:"contact-item"},[n("span",{staticClass:"contact-name"},[t._v("联系人3")]),t._v(" "),n("span",{staticClass:"contact-number"},[t._v("手机号码")]),t._v(" "),n("i",{staticClass:"el-icon-delete delete-img"})])],1),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"}},[t._v("确定")])],1)},staticRenderFns:[]};var ot=n("VU/8")(nt,at,!1,function(t){n("tvWB")},"data-v-52b13598",null).exports,st={name:"call",components:{OldManInfo:Z},data:function(){return{call_img:n("B7Kp"),info:{name:"预设内容",age:"预设内容",address:"预设内容",medical_history:"预设内容",allergy:"预设内容",blood_type:"预设内容",drugs:"预设内容",treatment:"预设内容"},phone_number:[]}},mounted:function(){console.log("created---"),l.a.ready(function(){console.log("ready-----")}),l.a.error(function(t){console.log("error-----")}),A().then(function(t){console.log("config",t.data),l.a.config({debug:!1,appId:t.data.appId,timestamp:t.data.timestamp,nonceStr:t.data.nonceStr,signature:t.data.signature,jsApiList:["getLocation"]})})},created:function(){var t=this;R(sessionStorage.getItem("qrCodeId")).then(function(e){console.log("获取信息成功",e);var n=e.data;0===n.status_code&&(t.info=n.data.old_man_info,t.phone_number=n.data.phone_number)}).catch(function(t){console.log("获取信息失败",t)})},methods:{startCall:function(){var t=this;this.getLocation(),T(sessionStorage.getItem("openId"),this.phone_number,sessionStorage.getItem("qrCodeId")).then(function(e){console.log("呼叫成功:",e),0===e.data.Code&&""!==e.data.Caller?window.location.href="tel://"+e.data.Caller:t.$toast("呼叫失败!")}).catch(function(t){console.log("呼叫失败:",t)})},getLocation:function(){l.a.getLocation({type:"wgs84",success:function(t){var e=t.latitude,n=t.longitude,a=t.speed,o=t.accuracy;console.log("地理位置:{0},{1},{2},{3}".format(e,n,a,o))}})}}},it={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"info-container"},[e("old-man-info",{attrs:{info:this.info}}),this._v(" "),e("el-image",{staticClass:"call-img",attrs:{src:this.call_img},on:{click:this.startCall}}),this._v(" "),e("span",{staticClass:"call-text"},[this._v("呼叫家属")])],1)},staticRenderFns:[]};var ct=n("VU/8")(st,it,!1,function(t){n("oMhy")},"data-v-09b5e14e",null).exports,rt={name:"InfoDisplay",data:function(){return{message:this.$route.query.message,success_img_url:n("mzrL")}}},lt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"display-info-container"},[e("i",{staticClass:"el-icon-error success-img big-font-size color-red"}),this._v(" "),e("div",{staticClass:"status-container"},[e("span",{staticClass:"normal-tip"},[this._v(this._s(this.message))])])])},staticRenderFns:[]};var ut=n("VU/8")(rt,lt,!1,function(t){n("Of5+")},"data-v-6026c660",null).exports;a.default.use(o.a);var dt=new o.a({mode:"history",routes:[{path:"/info",name:"InfoDisplay",component:ut,meta:{title:"提示"}},{path:"/",name:"auth",component:B,meta:{title:"授权"}},{path:"/scan",name:"scan",component:D,meta:{title:"扫码"}},{path:"/ScanSuccess",name:"ScanSuccess",component:M,meta:{title:"绑定成功"}},{path:"/alreadyBindInfo",name:"alreadyBindInfo",component:H,meta:{title:"号码绑定"}},{path:"/addContact",name:"addContact",component:X,meta:{title:"号码绑定"}},{path:"/settings",name:"settings",component:et,meta:{title:"设置"}},{path:"/updateNumber",name:"updateNumber",component:ot,meta:{title:"号码绑定和修改"}},{path:"/call",name:"call",component:ct,meta:{title:"呼叫"}}]}),ft=n("zL8q"),mt=n.n(ft),pt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var vt=n("VU/8")({name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},created:function(){},methods:{},reload:function(){this.isRouterAlive=!1,this.$nextTick(function(){this.isRouterAlive=!0})}},pt,!1,function(t){n("tUSV")},null,null).exports,ht=(n("tvR6"),n("ZtTw"),n("woOf")),gt=n.n(ht),Ct={show:!1,component:null},_t={install:function(t){t.prototype.$toast=function(e,n){var a,o;if(a=(n=gt()({position:"center",duration:1e3,wordWrap:!1},n)).wordWrap?"zh-word-wrap":"",o=n.width?'style="width: '+n.width+'"':"",!Ct.show){if(!Ct.component){var s=t.extend({data:function(){return{show:Ct.show,text:e,position:"zh-toast-"+n.position}},template:'<div v-show="show" :class="position" class="zh-toast '+a+'" '+o+">{{text}}</div>"});Ct.component=new s;var i=Ct.component.$mount().$el;document.body.appendChild(i)}Ct.component.position="zh-toast-"+n.position,Ct.component.text=e,Ct.component.show=Ct.show=!0,setTimeout(function(){Ct.component.show=Ct.show=!1},n.duration)}}}};n("EOXk");a.default.use(_t),a.default.use(mt.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:dt,components:{App:vt},template:"<App/>"}),dt.beforeEach(function(t,e,n){t.meta.title&&(document.title=t.meta.title),n()})},"Of5+":function(t,e){},YfaA:function(t,e,n){t.exports=n.p+"static/img/heart.7bf04e5.png"},ZtTw:function(t,e){},e85r:function(t,e){},fWB7:function(t,e,n){t.exports=n.p+"static/img/card_bg.a694466.png"},hQVW:function(t,e){},iFoD:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAAEgvhuhAAAAAXNSR0IArs4c6QAABMdJREFUaAXtWV+IlFUUv+ebWYrUQinSzIcEFWZyiyB6UcuZ9U8PPvSwCz5okDoDQUGQKRkxKIWGCPnkfJqC+7Cwiy89beYshoEIGbQxI0YhqCgErVGhazPfdzrnm858d2bunf12Z3bTmAvDvfd3z/3dc889995z5wNFKZXII+eSANSNJnDj6hPrWCAuUqlk/gyXK573JGWvNvUQQUcKjbkTDNSIUh1SSfe0Qtymt42VsiRPidXlyuu9x5/9G/AxLOPVOq3ue76iQd+rm5ROxQx2rXTJujJrtbn3i1UMNtqMMTZR+gV3pbQ7PIXR8R1XGYiUTKy2ji0nYetknbWtQ83iNgEdXzeQiVU7JPNlhaGv6EJSBuhJ1sxom7jgqYT7h1V3EQqZnQGrsAIYEkHJa97DgPh1tRGrdc2VasLsg8Jgy+1qGHo8bMKgcE2c9uSexgUwzI22gn9/Ws5kIrFhrAQvVLlRE643YjpJX9L9SOq8fVlWtjDjqefdNxijrdzam4VEz33EA3xI6ZheBnTucb3mUXrjVOUo3teKfIAah1uZRhSg813RwvmFHzI/CSa5UXPSbIQEptwbQmLLp7UdbCQ2vEtutAykkycTiOUiLd9f4Khtyo9NGiUjgnxG+OjvI2+obn8eQKnyKKJaFpHDLAaqQk42NFbMbGcB0jz/AZEeMkvPHOWNBsFGIZOMFbMLmKpv9cnlvlf+JRaP9X09vrMwFb1sNNm1fMZw3EK30WDVFQGCaUxFxO39/cOxVPLEFptsuFNxa0AuBw13cMDTLrNmijulO+8q9L5sbmlA6ECc1U1kPFsadKirLnx84bGJP3/360BLZdrkIxcH+Kz+3MJXBzeRQ48/yd7qe16Obqm366RNlRYr1ET+1eXs7XTS9RBxjYnLhAHAVhPeRM5ChWLGiJsIWmGz6i1dcqPpu2b5P5qFL1XjvNoA+S0O6UR+ks6eRxxwPkEF37bBRzeN9yh6cFopXMBvPcjl0Lkw7N7lAdoi1jpz4F8oZj8Lgs1ggBH3fYrV93dyEG28toscB1Fs9fHa/szhXA78IOBSWP6+pjAHXqiOogPfyb2Nyl9MD6hTMjod30dQ4RWpt5OTQispbNpd4wC1C1TsZlCnJVSeeplc4R1eRsaqE+h5ieOt6xLEEfhpoZTdVyP5tyBhkuBRwyWRb5Xzc43eJt+IDPTAqjDyEVQp8mnyZfUhI+zkcVE6EIHYhVA0LHGUFCmQCLvUlehduYmef6O0UhNrn1rxdO78err/p5lYN/SCTqzzrJ7loWpI4TktNuKiSxM/Lw7xmZfmSHG4zirSEt+dP++J32aubtizI2FPSGcunStmzlALbaHOpTmyeOcUFqZIFj87vutaOuHeoiPwGe7oVbxz9MASjrZy/rdDErnSr6YTRdr1PJLi3KFQyizd2Jt/peKpN2nNn9NJ2i3TMXcNnPhg4ccdF6NyRVacCc+OZy9Rxr//PD20Pt5VfK59p2vxrsUjWqDrKhEN1TExh0KfMDbmF8eDmnTdSGdylfBTIr0WBvUPRw/KHDa8eGpF9RUuGsFQEGrO1t/lMkwncwrEwle+EAdfKlRlL/0Z8hoFPktm8oVOuDqSk0uQZW/TY/k8qPjBQvGtkvD+A4vloj2lnWMWAAAAAElFTkSuQmCC"},mxGn:function(t,e){},mzrL:function(t,e,n){t.exports=n.p+"static/img/success.18d8ed6.png"},oMhy:function(t,e){},tUSV:function(t,e){},tgPZ:function(t,e){},tvR6:function(t,e){},tvWB:function(t,e){},uy1N:function(t,e,n){t.exports=n.p+"static/img/yellow_card.bb586a4.png"},zUBj:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.255889b227a4696fcd91.js.map