<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Mock from "mockjs";

import router from "./router";
import store from "./store/store";
import { mapState, mapGetters } from "vuex";
// 使用 Mock
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "list|1-10": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "cid|1-100": 1,
      clable: "@word",
      cinfo: "@cparagraph",
      cstart: '@datetime("y-MM-dd HH:mm:ss")',
      ctarget: '@datetime("y-MM-dd HH:mm:ss")'
    }
  ]
});
// // 输出结果
// console.log(JSON.stringify(data, null, 4))

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
    checkLogin() {},
    toLogin() {
      this.userInfo = {
        nick: "Doterlin",
        ulevel: 20,
        uid: "10000"
      };
      this.$store.commit("updateUserInfo", this.userInfo);
    }
  }
};
</script>

<style>
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
