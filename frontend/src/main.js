// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
// Toast
import './components/Toast/index.css'
import Toast from './components/Toast/index'
import 'default-passive-events'
Vue.use(Toast)

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // ios微信和android微信适配
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isiOS && to.path !== location.pathname) {
    location.assign(to.fullPath) // 此处不可使用location.replace
  } else {
    next()
  }
})
// var onPlusReady = function (callback, context = this) {
//   if (window.plus) {
//     callback.call(context)
//   } else {
//     document.addEventListener('plusready', callback.bind(context))
//   }
// }
// Vue.mixin({
//   beforeCreate () {
//     onPlusReady(() => {
//       this.plusReady = true
//     }, this)
//   },
//   methods: {
//     onPlusReady: onPlusReady
//   }
// })
