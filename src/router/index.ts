import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { token } from '@/lib/token'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/layout/index.vue'),
      redirect: '/demo',
      children: [
        {
          path: '/demo',
          name: 'demo',
          component: () => import('@/views/demo/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404.vue'),
    },
  ],
})

const whiteList = ['/login']
router.beforeEach((to, _, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    next()
    return
  }
  if (token.value) {
    next()
  } else {
    next(redirectLogin())
  }
})
router.afterEach(() => {
  NProgress.done()
})

function redirectLogin() {
  return `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`
}

export default router
