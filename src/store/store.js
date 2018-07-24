import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    userId: 'xxx',
    pwd: '',
}
const mutations = {
    update(state, userId, pwd) {
        state.userId = userId;
        state.pwd = pwd;
    }
}
export default new Vuex.Store({
    state, mutations
})