import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/upload',
        name: 'upload',
        component: () => import('../views/upload/upload.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
      },
      {
        // 播放视频页
        path: '/detail/:_id',
        component: () => import('../views/detail/detail.vue')
      },
      {
        // 分类页面
        path: '/type',
        component: () => import('../views/type/type.vue')
      },
      {
        // 个人中心
        path: '/mine',
        component: () => import('../views/user/mine.vue'),
        redirect: '/mine/video',
        children: [
          {
            path: '/mine/video',
            component: () => import('../views/user/children/video.vue')
          },
          // {
          //   path: '/mine/collection',
          //   component: () => import('../views/user/children/collection.vue')
          // },
          // {
          //   path: '/mine/attention',
          //   component: () => import('../views/user/children/attention.vue')
          // },
          {
            path: '/mine/setting',
            component: () => import('../views/user/children/setting.vue')
          },
          {
            path: '/mine/sh',
            component: () => import('../views/user/children/sh.vue')
          }
          // {
          //   path: '/mine/live',
          //   component: () => import('../views/user/children/live.vue')
          // }
        ]
      },
      {
        path: '/search',
        component: () => import('../views/search/search.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 上传
    path: '/upload',
    component: () => import('../views/upload/upload.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
    redirect: '/login/loginForm',
    children: [
      {
        // 登录表单
        path: '/login/loginForm',
        component: () => import('../views/login/children/loginForm')
      },
      {
        // 注册表单
        path: '/login/signIn',
        component: () => import('../views/login/children/signIn')
      },
      {
        // 忘记密码
        path: '/login/reSet',
        component: () => import('../views/login/children/reSet')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//  路由守卫
// router.beforeEach((to, from, next) => {
//   const istoken = localStorage.elementToken
//   if (to.path == '/login' || to.path == '/home' || to.path == '/detail/:_id') {
//   next()
// } else {
//   istoken ? next() : router.push('/login')
//   }
// }
// )
export default router
