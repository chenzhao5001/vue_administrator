import Vue from 'vue'
import Router from 'vue-router'
import HomeAdmin from '@/components/admin/home/Home'
import LoginAdmin from '@/components/admin/login/login'
import VideoCheck from '@/components/admin/home/pageview/video'
import PaperCheck from '@/components/admin/home/pageview/paper'
import AdminWelcome from '@/components/admin/home/pageview/welcome'

import HomeUser from '@/components/user/home/Home'
// import LoginUser from '@/components/user/login/login'
import ClassRoom from '@/components/user/home/pageview/classroom'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/admin/login',

    },
    {
      path: '/admin/login',
      name: 'Login',
      component: LoginAdmin
    },
    {
      path: '/admin/home',
      name: 'home',
      redirect: '/admin/home/welcome',
      component: HomeAdmin,
      children: [
        {
          path: 'welcome',
          name: "welcome",
          component: AdminWelcome,

        },
        {
          path: 'video',
          name: "videopage",
          component: VideoCheck,

        },
        {
          path: 'paper',
          name: "paperpage",
          component: PaperCheck,

        }
      ]
    },



    //用户登陆页面路由部分

    {
      path: '/user/home',
      name: 'home',
      redirect: '/user/home/classroom',
      component: HomeUser,
      children: [

        {
          path: 'classroom',
          name: "classroom",
          component: ClassRoom,
        },

      ]

    }

  ]
})
router.beforeEach((to, from, next) => {

  if (to.name != 'Login') {
    if (sessionStorage.getItem('isLogin')) {
      next()
    } else {
      next({
        path: '/admin/login'
      })
    }
  } else {
    next()
  }
})

export default router
