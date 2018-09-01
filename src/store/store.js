import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  // 用户信息相关参数
  avator: "",
  pwd: '',
  userName: '',

  // 计算器相关参数
  nowIndex: -1,
  calShow: false,
  result: "0.00",
  enter: "",

  // bill相关参数
  billList: {},
  icon: {
    iconName: "",
    iconCode: ""
  },
  billType: "",
  totalIncome: 0,
  totalPay: 0,

  // tomato相关参数
  clockList: {},
  percent: 0,
  msec: 0,
  min: 0,
  sec: 0,
  btnName: "设置时钟",
  showFinish: false,
}
const mutations = {
  // 更新账号密码
  update(state, userInfo) {
    state.avator = userInfo.avator;
    state.pwd = userInfo.pwd;
    state.userName = userInfo.userName;
  },
  // 存入bill列表
  updateBill(state, bill) {
    state.billList = bill.billList;
    state.totalIncome = bill.totalIncome;
    state.totalPay = bill.totalPay;
  },
  updateTomato(state, clockList) {
    state.clockList = clockList;
  },
  setPercent(state, rat) {
    if (rat == 100 || rat == 0) {
      state.percent = rat;
    } else {
      state.percent += rat;
    }
  },
  setMsec(state, msec) {
    state.msec = msec;
  },
  setMin(state, min) {
    state.min = min;
  },
  setSec(state, sec) {
    state.sec = sec;
  },
  setBtn(state, name) {
    state.btnName = name;
  },
  setRefresh(state, refresh) {
    state.showFinish = refresh;
  },
  todoClick(state) {
    let rat = 100 / state.msec * 1000;
    window.time = setInterval(() => {
      state.percent += rat;

      state.msec -= 1000;

      let min = parseInt((state.msec / 1000 / 60) % 60);
      let sec = parseInt((state.msec / 1000) % 60);
      state.min = min > 9 ? min : "0" + min;
      state.sec = sec > 9 ? sec : "0" + sec;

      if (state.percent + rat > 100) {
        state.percent = 100;
        clearInterval(window.time);
        state.min = 0;
        state.sec = 0;
        state.showFinish = true;
        state.btnName = "设置时钟";
      }
    }, 1000);
  },

  updateIndex(state, index) {
    state.nowIndex = index;
  },
  // 显示计算器
  showCalculator(state, track) {
    state.result = "0.00";
    state.enter = "";

    if (track.icon) {
      state.icon = track.icon;
      state.billType = track.billType
    }
    if (track.btnType == 0) {
      state.calShow = true;
    } else if (track.btnType == 1) {
      state.calShow = false;
      state.nowIndex = -1;
    }
  },
  // 计算
  calculate(state, value) {

    if (value === '.' && state.enter == '') {
      value = "0."
    }
    if (value === 'x') {
      state.result = "0.00";
      state.enter = "";
    } else if (value === '+' || value === '-') {
      state.result = eval(state.enter).toFixed(2)
      state.enter += value;
    } else {
      state.enter += value;
      state.result = eval(state.enter).toFixed(2)
    }
  },
}
export default new Vuex.Store({
  state, mutations
})
