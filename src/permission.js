import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import nProgress from 'nprogress'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // next()
  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasUserInfo = store.getters.user // 获取本地信息
  // console.log(hasUserInfo)
  if (to.meta.auth) {
    // 判断当前的页面是否要权限
    // console.log(hasUserInfo)
    if (hasUserInfo) {
      next()
    } else {
      const hasToken = localStorage.getItem('token')
      if (hasToken) {
        // console.log(hasToken)
        try {
          // console.log(store.dispatch('user/getInfo'))
          await store.dispatch('user/getInfo')
          // console.log(store.dispatch('user/getInfo'))
          next()
        } catch (error) {
          // console.log(error)
          // await store.dispatch('user/resetToken')
          Message.error('登陆过期，请重新登陆')
          next(`/login?redirect=${to.path}`)
          nProgress.done()
        }
      } else {
        // console.log('没有用户信息')
        next(`/login?redirect=${to.path}`)
        nProgress.done()
      }
    }
  } else {
    if (to.path === '/login' && hasUserInfo) {
      next({ path: '/' })
    } else {
      next()
    }
    nProgress.done()
  }
  // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
