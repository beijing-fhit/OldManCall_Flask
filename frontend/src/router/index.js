import Vue from 'vue'
import Router from 'vue-router'
const scan = () => import('@/components/scan')
// import scan from '@/components/scan'
const auth = () => import('@/components/auth')
const ScanSuccess = () => import('@/components/ScanSuccess')
const alreadyBindInfo = () => import('@/components/alreadyBindInfo')
const addContact = () => import('@/components/addContact')
const settings = () => import('@/components/settings')
const SettingsForAdmin = () => import('@/components/SettingsForAdmin')
const updateNumber = () => import('@/components/updateNumber')
const call = () => import('@/components/call')
const applyCard = () => import('../components/ApplyCard')
const registerApplyInfo = () => import('../components/RegisterApplyInfo')
const InfoDisplay = () => import('../components/InfoDisplay')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/info',
      name: 'InfoDisplay',
      component: InfoDisplay,
      meta: {
        title: '提示'
      }
    },
    {
      path: '/',
      name: 'auth',
      component: auth,
      meta: {
        title: '授权'
      }
    },
    {
      path: '/scan',
      name: 'scan',
      component: scan,
      meta: {
        title: '扫码'
      }
    },
    {
      path: '/ScanSuccess',
      name: 'ScanSuccess',
      component: ScanSuccess,
      meta: {
        title: '绑定成功'
      }
    },
    {
      path: '/alreadyBindInfo',
      name: 'alreadyBindInfo',
      component: alreadyBindInfo,
      meta: {
        title: '号码绑定'
      }
    },
    {
      path: '/addContact',
      name: 'addContact',
      component: addContact,
      meta: {
        title: '号码绑定'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings,
      meta: {
        keepAlive: false, // 该字段表示该页面需要缓存
        title: '设置'
      }
    },
    {
      path: '/settingsForAdmin',
      name: 'settingsForAdmin',
      component: SettingsForAdmin,
      meta: {
        keepAlive: false, // 该字段表示该页面需要缓存
        title: '管理员设置'
      }
    },
    {
      path: '/updateNumber',
      name: 'updateNumber',
      component: updateNumber,
      meta: {
        title: '号码绑定和修改'
      }
    },
    {
      path: '/call',
      name: 'call',
      component: call,
      meta: {
        title: '呼叫'
      }
    },
    {
      path: '/applycard',
      name: 'applycard',
      component: applyCard,
      meta: {
        title: '申请'
      }
    },
    {
      path: '/registerApplyInfo',
      name: 'registerApplyInfo',
      component: registerApplyInfo,
      meta: {
        title: '申请信息填写'
      }
    }
  ]
})
