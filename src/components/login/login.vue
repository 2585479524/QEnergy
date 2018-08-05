<template>
    <div class="login">
      <div class="mainLogin">
        <img src="../../assets/img/title2.png" alt="青能量">
          <Input v-model="userLogin.telNumber" placeholder="请输入账号" clearable style="width: 200px"></Input>
          <Input v-model="userLogin.pwd" type="password" placeholder="请输入密码" clearable style="width: 200px"></Input>

          <Button type="success" style="width: 200px" @click="login">登录</Button>
          <Button type="warning" style="width: 200px" @click="clickRegister">注册</Button>
      </div>
      <Modal v-model="showModal" width="360":styles="{top: '40px'}">
        <p slot="header" style="color:#57a3f3; text-align:center">
          <Icon type="edit"></Icon>
          <span>注册账号</span>
        </p>
        <div class="registerModal" style="text-align:center">
          <span class="text">手机号：</span>
          <Input v-model="userInfo.telNumber" placeholder="请输入手机号" clearable style="width: 200px" @on-blur="checkTel"></Input>
          <br><br>
          <span class="text">昵称：</span>
          <Input v-model="userInfo.userName" placeholder="请输入昵称" clearable style="width: 200px" @on-blur="checkName"></Input>
          <br><br>
          <span class="text">密码：</span>
          <Input v-model="userInfo.pwd" type="password" placeholder="请输入密码" clearable style="width: 200px" @on-blur="checkPwd"></Input>
          <br><br>
          <span class="text">确认密码：</span>
          <Input v-model="confirmPwd" type="password" placeholder="请再次输入密码" clearable style="width: 200px" @on-blur="checkConfirmPwd"></Input>
          <br><br>
          <span class="text">真实姓名：</span>
          <Input v-model="userInfo.realName" placeholder="请输入真实姓名" clearable style="width: 200px"></Input>
          <br><br>
          <span class="text">身份证号：</span>
          <Input v-model="userInfo.idCard" placeholder="请输入身份证号" clearable style="width: 200px" @on-blur="checkCard"></Input>
          <br>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long @click.prevent="submitRegister">注册</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Input, Button, Message, Modal, Icon } from "iview";
import router from "../../router";
import store from "../../store/store";
import { mapState, mapMutations } from "vuex";

axios.defaults.withCredentials = true;
Vue.prototype.$Message = Message;
export default {
  data() {
    return {
      userLogin: {
        telNumber: "",
        pwd: ""
      },
      userInfo: {
        userName: "",
        pwd: "",
        telNumber: "",
        realName: "",
        idCard: ""
      },
      regUser: {
        // 手机号
        telNumber: /(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}/,
        // 用户名： 中文、英文、数字，不包括下划线等特殊符号
        userName: /[\u4E00-\u9FA5A-Za-z0-9]+$/,
        // 密码： 字母数字下划线，6-16位
        pwd: /\w{6,16}/,
        // 身份证
        idCard: /(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])/
      },
      confirmPwd: "",
      showModal: false
    };
  },
  store,
  components: {
    Input,
    Button,
    Modal,
    Icon
  },
  created() {
    let userLogin = {
      telNumber: window.localStorage.getItem("telNumber"),
      pwd: window.localStorage.getItem("pwd")
    };
    if (userLogin.telNumber && userLogin.pwd) {
      this._loginPost(userLogin);
    }
  },
  methods: {
    _loginPost(userLogin) {
      if (window.storage.getItem("telNumber")) {
        storage.setItem("telNumber", this.userLogin.telNumber);
        storage.setItem("pwd", this.userLogin.pwd);
      }
      axios
        .post("http://120.78.86.45/auth/login", {
          userLogin: userLogin
        })
        .then(res => {
          if (res.data.isLogin == true) {
            this.$Message.success(res.data.message);
            this.$router.push("footer/tomato");
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch();
    },
    login() {
      if (this.userLogin.telNumber == "" || this.userLogin.pwd == "") {
        this.$Message.warning("请输入账号或密码");
      } else {
        this._loginPost(this.userLogin);
      }
    },
    // 正则检测手机号
    checkTel() {
      if (
        this.userInfo.telNumber != "" &&
        !this.regUser.telNumber.test(this.userInfo.telNumber)
      ) {
        this.$Message.warning("手机号不符合要求");
      } else {
        return true;
      }
    },
    // 正则检测用户名
    checkName() {
      if (
        this.userInfo.userName != "" &&
        !this.regUser.userName.test(this.userInfo.userName)
      ) {
        this.$Message.warning("昵称不符合要求");
      } else {
        return true;
      }
    },
    // 正则检测密码
    checkPwd() {
      if (
        this.userInfo.pwd != "" &&
        !this.regUser.pwd.test(this.userInfo.pwd)
      ) {
        this.$Message.warning("密码不符合要求");
      } else {
        return true;
      }
    },
    // 检测confirmPwd
    checkConfirmPwd() {
      if (this.confirmPwd != "" && this.confirmPwd != this.userInfo.pwd) {
        this.$Message.warning("两次输入密码不一致");
      } else {
        return true;
      }
    },
    // 正则检测身份证号
    checkCard() {
      if (
        this.userInfo.idCard != "" &&
        !this.regUser.idCard.test(this.userInfo.idCard)
      ) {
        this.$Message.warning("请输入真实的身份证号");
      } else {
        return true;
      }
    },
    // 显示注册Modal
    clickRegister() {
      this.showModal = true;
    },
    // 提交注册
    submitRegister() {
      if (
        this.checkTel() &&
        this.checkName() &&
        this.checkPwd() &&
        this.checkConfirmPwd() &&
        this.checkCard()
      ) {
        axios
          .post("http://120.78.86.45/auth/register", {
            userInfo: this.userInfo
          })
          .then(res => {
            if (res.data.isRegister == true) {
              this.$Message.success(res.data.message);
              this.$router.push("/footer/tomato");
            } else {
              this.$Message.error(res.data.message);
            }
          })
          .catch();
      }
    }
  }
};
</script>

<style>
.mainLogin {
  padding-top: 150px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1cbe99;
}
mainLogin .mainLogin img {
  height: 50px;
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
