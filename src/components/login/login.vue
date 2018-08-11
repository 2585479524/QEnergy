<template>
    <div class="login" >
      <div class="mainLogin" :style="oHeight">
        <img src="../../assets/img/title2.png" alt="青能量">
        <Input v-model="userLogin.telNumber" icon="person" placeholder="请输入账号" style="width: 200px"></Input>
        <Input v-model="userLogin.pwd" icon="locked" type="password" placeholder="请输入密码" style="width: 200px"></Input>
        <div class="check">
          <Checkbox v-model="remember" class="checkout">记住账号</Checkbox>
          <span>忘记密码？</span>
        </div>
        <Button class="login-btn" style="width: 200px" @click="loginUser">登录</Button>
        
        <span class="new-user" @click="clickRegister">注册新账号</span>
      </div>
      <Modal class="registerModal" v-model="showModal" width="360">
        <p slot="header" style="color:#1cbe99; text-align:center">
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
          <Button class="register-btn" size="large" long @click.prevent="submitRegister">注册</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Input, Button, Message, Modal, Icon, Checkbox } from "iview";
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
      showModal: false,
      remember: false,
      oHeight: {
        height: window.screen.height + "px"
      }
    };
  },
  store,
  components: {
    Input,
    Button,
    Modal,
    Icon,
    Checkbox
  },
  created() {
    // 将localStroge中的两个参数存入userLogin
    let userLogin = {
      telNumber: window.localStorage.getItem("telNumber"),
      pwd: window.localStorage.getItem("pwd")
    };
    // 如果存在这两个参数，自动调用登录函数
    if (userLogin.telNumber && userLogin.pwd) {
      this._loginPost(userLogin);
    }
  },
  computed: {
    ...mapState(["userId", "pwd", "userName"])
  },
  methods: {
    ...mapMutations(["update"]),
    _loginPost(userLogin) {
      // 如果localStroge中没有登录缓存,记录缓存
      if (!window.localStorage.getItem("telNumber")) {
        window.localStorage.setItem("telNumber", this.userLogin.telNumber);
        window.localStorage.setItem("pwd", this.userLogin.pwd);
      }
      axios
        .post("http://120.78.86.45/auth/login", {
          userLogin: userLogin
        })
        .then(res => {
          if (res.data.isLogin == true) {
            this.$Message.success(res.data.message);
            this.update({
              userId: res.data.userId,
              pwd: res.data.pwd,
              userName: res.data.userName
            });
            this.$router.push("footer/tomato");
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch();
    },
    loginUser() {
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
document.addEventListener("plusready", function() {
  // 注册返回按键事件
  plus.key.addEventListener(
    "backbutton",
    function() {
      // 事件处理
      plus.nativeUI.confirm(
        "退出程序？",
        function(event) {
          if (!event.index) {
            window.localStorage.clear();
            plus.runtime.quit();
          }
        },
        null,
        ["取消", "确定"]
      );
    },
    false
  );
});
</script>

<style>
.mainLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1cbe99;
}
/* img */
.mainLogin img {
  padding: 100px 0 30px;
}
/* input左侧icon */
.mainLogin .ivu-input {
  padding: 4px 32px;
}
.mainLogin .ivu-input-icon {
  left: 0;
}
.mainLogin .ivu-input-wrapper {
  background: hsla(0, 0%, 100%, 0.3);
  margin: 20px 0 0;
}
/* 记住密码和忘记密码 */
.mainLogin .check {
  display: flex;
  margin: 10px 0;
  padding-left: 2px;
  width: 200px;
  color: #fff;
  justify-content: space-between;
}
.mainLogin .check .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #ffffff6c;
  background-color: #1cbe99;
}
.mainLogin .check .ivu-checkbox-focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.486);
}
.mainLogin .check span {
  margin: 0;
}
/* 登录按钮 */
.mainLogin .login-btn {
  color: #fff;
  border-color: rgba(24, 111, 98, 0.219);
  background-color: #ff9900;
}
/* 注册新账号 */
.mainLogin .new-user {
  display: flex;
  margin-top: 5px;
  width: 200px;
  color: #fff;
  justify-content: flex-end;
}
/* 注册Modal */
.registerModal .ivu-modal-content {
  border-radius: 0;
  background-color: #ffffffe3;
}
.registerModal .ivu-input-focus :hover {
  box-shadow: 0 0 0 2px rgba(28, 190, 153, 0.2);
}
.registerModal .ivu-input:hover {
  border-color: #1cbe99;
}
.registerModal .text {
  display: inline-block;
  width: 70px;
  text-align: right;
}
.registerModal .register-btn {
  color: #fff;
  border-color: rgba(24, 111, 98, 0.219);
  background-color: #1cbe99;
}
</style>
