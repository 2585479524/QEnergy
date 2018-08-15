<template>
    <div class="login" >
      <div class="mainLogin" :style="oHeight">
        <img src="../../assets/img/title2.png" alt="青能量">
        <div class="input-comp">
          <span class="input input--hoshi">
              <input class="input__field input__field--hoshi" type="text" v-model="userLogin.telNumber"/>
              <label class="input__label input__label--hoshi input__label--hoshi-color-2">
                  <span class="input__label-content input__label-content--hoshi">账号</span>
              </label>
          </span>
          <span class="input input--hoshi">
              <input class="input__field input__field--hoshi" type="password" v-model="userLogin.pwd"/>
              <label class="input__label input__label--hoshi input__label--hoshi-color-2">
                  <span class="input__label-content input__label-content--hoshi">密码</span>
              </label>
          </span>
        </div>
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
        avator: "",
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
    this.$nextTick(function() {
      this._newInput();
    });
  },
  computed: {
    ...mapState([ "avator", "pwd", "userName"])
  },
  methods: {
    ...mapMutations(["update"]),
    _newInput() {
      [].slice
        .call(document.querySelectorAll("input.input__field"))
        .forEach(function(inputEl) {
          // in case the input is already filled..
          if (inputEl.value.trim() !== "") {
            classie.add(inputEl.parentNode, "input--filled");
          }

          // events:
          inputEl.addEventListener("focus", onInputFocus);
          inputEl.addEventListener("blur", onInputBlur);
        });

      function onInputFocus(ev) {
        classie.add(ev.target.parentNode, "input--filled");
      }

      function onInputBlur(ev) {
        if (ev.target.value.trim() === "") {
          classie.remove(ev.target.parentNode, "input--filled");
        }
      }
      function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
      }

      // classList support for class management
      // altho to be fair, the api sucks because it won't accept multiple classes at once
      var hasClass, addClass, removeClass;

      if ("classList" in document.documentElement) {
        hasClass = function(elem, c) {
          return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
          elem.classList.add(c);
        };
        removeClass = function(elem, c) {
          elem.classList.remove(c);
        };
      } else {
        hasClass = function(elem, c) {
          return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
          if (!hasClass(elem, c)) {
            elem.className = elem.className + " " + c;
          }
        };
        removeClass = function(elem, c) {
          elem.className = elem.className.replace(classReg(c), " ");
        };
      }

      function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
      }

      var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
      };

      // transport
      if (typeof define === "function" && define.amd) {
        // AMD
        define(classie);
      } else {
        // browser global
        window.classie = classie;
      }
    },
    _loginPost(userLogin) {
      // 如果localStroge中没有登录缓存,记录缓存
      if (!this.remember) {
        window.localStorage.setItem("remember", this.remember);
      } else if (this.remember && !window.localStorage.getItem("telNumber")) {
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
              avator: res.data.avator,
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
      if (this.userInfo.telNumber == "") {
        this.$Message.warning("请输入手机号");
      } else if (
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
      if (this.userInfo.userName == "") {
        this.$Message.warning("请输入昵称");
      } else if (
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
      if (this.userInfo.pwd == "") {
        this.$Message.warning("请输入密码");
      } else if (
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
      console.log(this.userInfo.idCard);
      if (this.userInfo.idCard == "") {
        this.$Message.warning("请输入身份证号");
      } else if (
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
        "若开启了番茄时钟，退出应用将中断番茄，是否确定退出？",
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

<style scoped>
@import url("../../assets/normalize.css");

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
.ivu-checkbox-checked .ivu-checkbox-inner {
  
  background-color: #1cbe99 !important;
}
.ivu-checkbox-inner {
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

/* input */
.input-comp {
  font-size: 130%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-comp .input {
  position: relative;
  z-index: 1;
  display: inline-block;
  max-width: 400px;
  vertical-align: top;
}

.input-comp .input__field {
  position: relative;
  display: block;
  float: right;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #aaa;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-appearance: none; /* for box shadows to show on iOS */
}

.input-comp .input__field:focus {
  outline: none;
}

.input-comp .input__label {
  display: inline-block;
  padding: 0 1em;
  width: 40%;
  color: #fff;
  font-weight: bold;
  font-size: 70.25%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.input-comp .input__label-content {
  position: relative;
  display: block;
  padding: 1.6em 0;
  width: 100%;
}

/* Hoshi */
.input-comp .input--hoshi {
  overflow: hidden;
}

.input-comp .input__field--hoshi {
  margin-top: 1em;
  padding: 0.85em 0.15em;
  width: 100%;
  background: transparent;
  color: #ffffff;
}

.input-comp .input__label--hoshi {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 0.25em;
  width: 100%;
  height: calc(100% - 1em);
  text-align: left;
  pointer-events: none;
}

.input-comp .input__label-content--hoshi {
  position: absolute;
}

.input-comp .input__label--hoshi::before,
.input__label--hoshi::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 10px);
  border-bottom: 1px solid #ffffff;
}

.input-comp .input__label--hoshi::after {
  margin-top: 2px;
  border-bottom: 4px solid red;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input-comp .input__label--hoshi-color-2::after {
  border-color: hsl(160, 100%, 50%);
}
.input-comp .input__field--hoshi:focus + .input__label--hoshi::after,
.input--filled .input__label--hoshi::after {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.input-comp .input__field--hoshi:focus + .input__label--hoshi .input__label-content--hoshi,
.input--filled .input__label-content--hoshi {
  -webkit-animation: anim-1 0.3s forwards;
  animation: anim-1 0.3s forwards;
}

@-webkit-keyframes anim-1 {
  50% {
    opacity: 0;
    -webkit-transform: translate3d(1em, 0, 0);
    transform: translate3d(1em, 0, 0);
  }
  51% {
    opacity: 0;
    -webkit-transform: translate3d(-1em, -40%, 0);
    transform: translate3d(-1em, -40%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, -40%, 0);
    transform: translate3d(0, -40%, 0);
  }
}

@keyframes anim-1 {
  50% {
    opacity: 0;
    -webkit-transform: translate3d(1em, 0, 0);
    transform: translate3d(1em, 0, 0);
  }
  51% {
    opacity: 0;
    -webkit-transform: translate3d(-1em, -40%, 0);
    transform: translate3d(-1em, -40%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, -40%, 0);
    transform: translate3d(0, -40%, 0);
  }
}
</style>
