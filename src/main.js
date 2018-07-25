// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "./store/store";
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  iView,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.checkLogined) {
    if (store.state.userInfo != '') {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  }
});