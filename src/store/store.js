import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    userId: 'xxx',
    pwd: '',
    // 计算器相关参数
    calShow: false,
    result: "0.00",
    enter: "",
    icon: {
        iconName: "",
        iconCode: ""
    },
    billType: "",
    refresh: false,

    billList: {},
    totalIncome: 0,
    totalPay: 0,
}
const mutations = {
    // 更新账号密码
    update(state, userId, pwd) {
        state.userId = userId;
        state.pwd = pwd;
    },
    // 存入bill列表
    updateBill(state, bill) {
        state.billList = bill.billList;
        state.totalIncome = bill.totalIncome;
        state.totalPay = bill.totalPay;
    },
    // 显示计算器
    showCalculator(state, track) {
        state.result = "0";
        state.enter = "";

        if (track.icon) {
            state.icon = track.icon;
            state.billType = track.billType
        }
        if (track.btnType == 0) {
            state.calShow = true;
        } else if (track.btnType == 1) {
            state.calShow = false;
        }
    },
    // 计算
    calculate(state, value) {
        if (value === 'x') {
            state.result = "0";
            state.enter = "";
        } else if (value === '+' || value === '-') {
            state.result = eval(state.enter)
            state.enter += value;
        } else {
            state.enter += value;
            state.result = eval(state.enter)
        }
    },
    refreshOk(state, boo) {
        state.refresh = boo;
    }
}
export default new Vuex.Store({
    state, mutations
})