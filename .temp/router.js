import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import header from '@/components/header'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'header',
      component: header
    }
  ]
})
