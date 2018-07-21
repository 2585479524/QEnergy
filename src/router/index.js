import Vue from 'vue'
import Router from 'vue-router'
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
      redirect: 'tomato'
    },
    {
      path: '/tomato',
      name: 'tomato',
      component: tomato
    },
    {
      path: '/diary',
      name: 'diary',
      component: diary
    },
    {
      path: '/bill',
      name: 'bill',
      component: bill
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: discuss
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    }
  ],
  linkActiveClass: 'active' //  将 router-link-active  改为 active（方便样式操作）
})
