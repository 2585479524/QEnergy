import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import footer from '@/components/footer/footer'
import tomato from '@/components/tomato/tomato'
import diary from '@/components/diary/diary'
import bill from '@/components/bill/bill'
import discuss from '@/components/discuss/discuss'
import mine from '@/components/mine/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/footer',
      name: 'footer',
      component: footer,
      redirect: 'tomato',
      children: [
        {
          path: 'tomato',
          name: 'tomato',
          component: tomato,
          meta: {checkLogined: true},
        },
        {
          path: 'diary',
          name: 'diary',
          component: diary,
          meta: {checkLogined: true},
        },
        {
          path: 'bill',
          name: 'bill',
          component: bill,
          meta: {checkLogined: true},
        },
        {
          path: 'discuss',
          name: 'discuss',
          component: discuss,
          meta: {checkLogined: true},
        },
        {
          path: 'mine',
          name: 'mine',
          component: mine,
          meta: {checkLogined: true},
        }
      ]
    },

  ],
  linkActiveClass: 'active' //  将 router-link-active  改为 active（方便样式操作）
})
