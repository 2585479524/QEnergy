<template>
    <div class="login">
        <Input v-model="userId" placeholder="请输入账号" clearable style="width: 200px"></Input>
        <Input v-model="pwd" type="password" placeholder="请输入密码" clearable style="width: 200px"></Input>

        <Button type="success" style="width: 200px" @click="login">登录</Button>
        <Button type="warning" style="width: 200px" @click="register">注册</Button>
    </div>
</template>

<script>
import Vue from 'vue'
import { Input, Button, Message } from "iview";
import router from "../../router";
import store from "../../store/store";
import { mapState, mapMutations } from "vuex";
Vue.prototype.$Message = Message
export default {
  data() {
    return {
      userId: "",
      pwd: "",
      showWarning: false
    };
  },
  computed: {},
  store,
  components: {
    Input,
    Button
  },
  methods: {
    ...mapMutations(["update"]),
    login() {
      if (this.userId == "" || this.pwd == "") {
        console.log("未输入");
      this.$Message.warning("This is a warning tip");
      } else {
        console.log("用户未登录");
        router.push("/footer/tomato");
      }
    },
    register() {
      router.push("/tomato");
    }
  }
};
</script>

<style>
.login {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login * {
  margin: 10px 0;
}
</style>
