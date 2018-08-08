<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
import router from "./router";
import store from "./store/store";
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["count", "userInfo"])
  },
  store,
  watch: {
    $route: "checkLogin"
  },
  methods: {
    checkLogin() {
      router.beforeEach((to, from, next) => {
        if (to.meta.checkLogined) {
          if (
            window.localStorage.getItem("telNumber") &&
            window.localStorage.getItem("pwd")
          ) {
            next();
          } else {
            next({
              path: "/"
            });
          }
        } else {
          next();
        }
      });
    }
  }
};
document.addEventListener("plusready", function() {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener("backbutton", function() {
    webview.canBack(function(e) {
      if (e.canBack) {
        webview.back();
      } else {
        //webview.close(); //hide,quit
        //plus.runtime.quit();
        mui.plusReady(function() {
          //首页返回键处理
          //处理逻辑：1秒内，连续两次按返回键，则退出应用；
          var first = null;
          plus.key.addEventListener(
            "backbutton",
            function() {
              //首次按键，提示‘再按一次退出应用’
              if (!first) {
                first = new Date().getTime();
                mui.toast("再按一次退出应用");
                setTimeout(function() {
                  first = null;
                }, 1000);
              } else {
                if (new Date().getTime() - first < 1500) {
                  plus.runtime.quit();
                }
              }
            },
            false
          );
        });
      }
    });
  });
});
</script>

<style>
[v-cloak] {
  display: none;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.tab {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  background-color: #fff;
  justify-content: space-around;
}
.tab .tab-item .icon {
  display: block;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  border: 0;
}
.tab .tab-item .text {
  text-decoration: none;
  font-size: 12px;
  color: rgb(77, 85, 93);
}

#app .tab .tab-item .active {
  color: aquamarine;
  font-weight: 700;
}
</style>
