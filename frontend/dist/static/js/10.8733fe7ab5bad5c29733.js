webpackJsonp([10],{"0+BY":function(t,e){},wZsC:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("looZ"),i=n("n5Qe"),o={name:"addContact",components:{Topbar:s.a},data:function(){return{number:"",verifyNumber:"",verifyBtnContent:"获取验证码",isVerifyBtnClickable:!0,centerDialogVisible:!1,isClearInterval:!1,contact:null===sessionStorage.getItem("contact")?"":sessionStorage.getItem("contact"),modifyIndex:1,index:this.$route.query.index?this.$route.query.index:0}},created:function(){document.title=this.$route.meta.title},mounted:function(){var t=this.$route.query.modifyNumber;console.log("在addContact页面获取到的参数是:",t),console.log("在addContact页面获取到的参数contact是:",this.contact),null===t|""===t|void 0===t?console.log("在addContact页面获取到的参数contact2是:",t):t.toString().match("[0-9]{1,}")?this.number=t:this.number=""},methods:{getVerifyCode:function(){if(this.isClearInterval=!1,0!==this.number.length)if(this.isVerifyBtnClickable)if(-1===this.contact.split(",").indexOf(this.number,0)){var t=this;i.a.getVerifyCode(sessionStorage.getItem("openId"),this.number).then(function(e){console.log("获取号码",e),0===e.data.Code?(t.$toast("短信已发送"),t.countDown()):-3===e.data.Code?t.$toast("验证码请求太频繁！"):-6===e.data.Code&&t.$toast("号码格式不正确！")}).catch(function(e){console.log("获取验证码失败:",e),t.$toast("获取验证码失败!")})}else this.$toast("您已添加此号码!");else this.$toast("您点的太快了，请稍等！");else this.$toast("号码不能为空！")},verify:function(){var t=this;if(0!==this.number.length)if(0!==this.verifyNumber.length){var e=this.showLoading("验证中...");i.a.verifyNumber(sessionStorage.getItem("openId"),this.number,this.verifyNumber).then(function(e){if(console.log("验证成功:",e),0===e.data.Code)if(-1===t.contact.indexOf(t.number,0)){var n=t.$route.query.index;if(null===n|""===n|void 0===n)t.contact+=t.number+",",sessionStorage.setItem("contact",t.contact),t.$router.push({path:"/settings",query:{getPhoneNumberFromNet:!1}});else{var s=t.contact.split(","),i="";0===parseInt(n)?i=t.number+","+s[1]+","+s[2]:1===parseInt(n)?i=s[0]+","+t.number+","+s[2]:2===parseInt(n)&&(i=s[0]+","+s[1]+","+t.number),console.log("t",i),t.contact=i,sessionStorage.setItem("contact",t.contact),t.$router.push({path:"/settings",query:{getPhoneNumberFromNet:!1}})}}else t.$router.push({path:"/settings",query:{getPhoneNumberFromNet:!1}});else t.$toast("验证失败"),t.centerDialogVisible=!1}).catch(function(){t.$toast("验证失败"),t.centerDialogVisible=!1}).finally(function(){e.close()})}else this.$toast("验证码不能为空！");else this.$toast("号码不能为空！")},countDown:function(){var t=this;t.isVerifyBtnClickable=!1;var e=60,n=setInterval(function(){t.verifyBtnContent=e+"s后重新发送",(--e<=0||t.isClearInterval)&&(window.clearInterval(n),t.isVerifyBtnClickable=!0,t.verifyBtnContent="获取验证码")},1e3)},dialogSkip:function(){this.contact=this.contact.substr(0,this.contact.length-1),sessionStorage.setItem("contact",this.contact),console.log("跳过"),this.$router.push({path:"/settings",query:{getPhoneNumberFromNet:!1}})},dialogAddMore:function(){console.log("添加下一位"),this.centerDialogVisible=!1,this.isClearInterval=!0,this.number="",this.verifyNumber=""},showLoading:function(t){return this.$loading({lock:!0,customClass:"create-isLoading",text:t,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0)"})},hideLoading:function(t){t.close()}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"all-container"},[n("topbar"),t._v(" "),n("el-row",{staticClass:"add-tip"},[n("i",{staticClass:"linear-line margin-horizontal"}),t._v(" "),n("span",{staticClass:"tip-text"},[t._v("您最多可以绑定3位联系人")])]),t._v(" "),n("div",{staticClass:"contact-panel"},[n("el-row",{staticClass:"first-item"},[n("i",{staticClass:"el-icon-star-on red-star margin-horizontal"}),t._v(" "),n("span",{staticClass:"title-name"},[t._v("联系人"+t._s(parseInt(this.index)+1))]),t._v(" "),n("span",{staticClass:"title-tip"},[t._v("(必填)")])]),t._v(" "),n("el-row",{staticClass:"first-input-container bottom-border"},[n("el-input",{staticClass:"normal-input-style no-border-input",attrs:{type:"number",placeholder:"请输入手机号码",clearable:""},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),t._v(" "),n("el-row",{staticClass:"second-input-container"},[n("el-input",{staticClass:"normal-input-style no-border-input sixty-percent",attrs:{type:"number",placeholder:"请输入验证码"},model:{value:t.verifyNumber,callback:function(e){t.verifyNumber=e},expression:"verifyNumber"}}),t._v(" "),n("span",{staticClass:"fourty-percent verify-code-text-btn",on:{click:t.getVerifyCode}},[t._v(t._s(this.verifyBtnContent))])],1)],1),t._v(" "),n("el-button",{staticClass:"wide-button",attrs:{type:"success"},on:{click:t.verify}},[t._v("下一步")]),t._v(" "),n("el-dialog",{attrs:{visible:t.centerDialogVisible,title:"绑定成功",width:"80%","show-close":!1,center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[n("span",{staticClass:"center-dialog-content"},[t._v("还需要再添加一位联系人么？")]),t._v(" "),n("span",{staticClass:"dialog-footer dialog-btn-group",attrs:{slot:"footer"},slot:"footer"},[n("span",{staticClass:"skip-btn",on:{click:t.dialogSkip}},[t._v("跳过")]),t._v(" "),n("span",{staticClass:"add-another-btn",attrs:{type:"primary"},on:{click:t.dialogAddMore}},[t._v("添加下一位")])])])],1)},staticRenderFns:[]};var r=n("VU/8")(o,a,!1,function(t){n("0+BY")},"data-v-58ec22e4",null);e.default=r.exports}});
//# sourceMappingURL=10.8733fe7ab5bad5c29733.js.map