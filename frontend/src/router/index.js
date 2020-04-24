import Vue from 'vue'
import Router from 'vue-router'
import scan from '@/components/scan'
import auth from '@/components/auth'
import ScanSuccess from '@/components/ScanSuccess'
import alreadyBindInfo from '@/components/alreadyBindInfo'
import addContact from '@/components/addContact'
import settings from '@/components/settings'
import updateNumber from '@/components/updateNumber'
import call from '@/components/call'
import InfoDisplay from '../components/InfoDisplay'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
        keepAlive: true, // 该字段表示该页面需要缓存
        title: '设置'
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
    }
  ]
})
