<template>
    <div class="login">
        <div class="mainLogin">
            <Input v-model="this.userLogin.userId" placeholder="请输入账号" clearable style="width: 200px"></Input>
            <Input v-model="this.userLogin.pwd" type="password" placeholder="请输入密码" clearable style="width: 200px"></Input>

            <Button type="success" style="width: 200px" @click="login">登录</Button>
            <Button type="warning" style="width: 200px" @click="clickRegister">注册</Button>
        </div>
        <Modal v-model="showModal" width="360":styles="{top: '40px'}">
            <p slot="header" style="color:#57a3f3; text-align:center">
                <Icon type="edit"></Icon>
                <span>注册账号</span>
            </p>
            <div class="registerModal" style="text-align:center">
                <span class="text">账号：</span>
                <Input v-model="userInfo.userId" placeholder="请输入账号" clearable style="width: 200px"></Input>
                <br><br>
                <span class="text">昵称：</span>
                <Input v-model="userInfo.userName" placeholder="请输入昵称" clearable style="width: 200px"></Input>
                <br><br>
                <span class="text">密码：</span>
                <Input v-model="userInfo.pwd" placeholder="请输入密码" clearable style="width: 200px"></Input>
                <br><br>
                <span class="text">确认密码：</span>
                <Input v-model="confirmPwd" placeholder="请再次输入密码" clearable style="width: 200px"></Input>
                <br><br>
                <span class="text">手机号：</span>
                <Input v-model="userInfo.telNumber" placeholder="请输入手机号" clearable style="width: 200px"></Input>
                <br><br>
                <span class="text">真实姓名：</span>
                <Input v-model="userInfo.realName" placeholder="请输入真实姓名" clearable style="width: 200px"></Input>
                <br><br>
                <span class="text">身份证号：</span>
                <Input v-model="userInfo.idCard" placeholder="请输入身份证号" clearable style="width: 200px"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="submitRegister">注册</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Vue from "vue";
import { Input, Button, Message, Modal, Icon } from "iview";
import router from "../../router";
import store from "../../store/store";
import { mapState, mapMutations } from "vuex";
Vue.prototype.$Message = Message;
export default {
  data() {
    return {
      userLogin: {
        userId: "",
        userName: "",
        authCode: "",
      },
      userInfo: {
        userId: "",
        userName: "",
        pwd: "",
        telNumber: "",
        realName: "",
        idCard: ""
      },
      confirmPwd: "",
      showWarning: false,
      showModal: false
    };
  },
  computed: {},
  store,
  components: {
    Input,
    Button,
    Modal,
    Icon
  },
  methods: {
    ...mapMutations(["update"]),
    login() {
      if (this.userInfo.userId == "" || this.userInfo.pwd == "") {
        this.$Message.warning("请输入账号或密码");
      } else {
        router.push("/footer/tomato");
      }
    },
    clickRegister() {
      this.showModal = true;
    },
    submitRegister() {
        // userId  字母开头，字母、数字组成，6-15位
      let regUserId = new RegExp("^[a-zA-z]\w{6,15}$");
      if (false) {
        this.$Message.warning("必须是数字");
      } else {
        this.showModal = false;
      }
    }
  }
};
</script>

<style>
.mainLogin {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mainLogin * {
  margin: 10px 0;
}
.registerModal .text {
  display: inline-block;
  width: 70px;
  text-align: right;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}
.ivu-modal-footer {
  border: none;
}
</style>
