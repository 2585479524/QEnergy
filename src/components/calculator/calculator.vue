<template>
    <div class="calculator">
        <div class="calMain">
            <div class="calRow">
                <!-- <Input :value="enter" placeholder="请输入金额"></Input> -->
                <div class="enter">
                  <span>{{enter}}</span>
                  </div>
                <!-- <Button type="ghost" style="width: 75%"></Button> -->
                <Button type="ghost">{{result}}</Button>
            </div>
            <div class="calRow">
                <Button type="ghost" @click="calculate(7)">7</Button>
                <Button type="ghost" @click="calculate(8)">8</Button>
                <Button type="ghost" @click="calculate(9)">9</Button>
                <Button type="ghost" icon="chevron-down" @click="showCalculator({btnType: 1})"></Button>
            </div>
            <div class="calRow">
                <Button type="ghost" @click="calculate(4)">4</Button>
                <Button type="ghost" @click="calculate(5)">5</Button>
                <Button type="ghost" @click="calculate(6)">6</Button>
                <Button type="ghost" @click="calculate('+')">+</Button>
            </div>
            <div class="calRow">
                <Button type="ghost" @click="calculate(1)">1</Button>
                <Button type="ghost" @click="calculate(2)">2</Button>
                <Button type="ghost" @click="calculate(3)">3</Button>
                <Button type="ghost" @click="calculate('-')">-</Button>
            </div>
            <div class="calRow">
                <Button type="ghost" @click="calculate('.')">.</Button>   
                <Button type="ghost" @click="calculate(0)">0</Button>   
                <Button type="ghost" @click="calculate('x')">清空</Button>    
                <Button type="ghost" @click="back">完成</Button>  
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Button, Icon, Input, Message } from "iview";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import store from "../../store/store";
Vue.prototype.$Message = Message;
export default {
  components: {
    Button,
    Icon,
    Input
  },
  computed: {
    ...mapState(["result", "enter", "icon", "billType"]),
    dateTime() {
      let dateTime = new Date();
      let str = dateTime.toJSON().substring(0, 10);
      return str;
    }
  },
  methods: {
    ...mapMutations(["showCalculator", "calculate"]),
    back() {
      if (this.result <= 0) {
        this.$Message.error("金额不能为0或者负数");
      } else {
        axios
          .post("http://120.78.86.45/bill/createBill", {
            date: this.dateTime,
            label: this.icon.iconName,
            iconCode: this.icon.iconCode,
            type: this.billType,
            money: this.result + ""
          })
          .then(res => {
            if (res.data.id) {
              this.$Message.success("添加成功");
            }
          })
          .catch();
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style>
.calculator {
  width: 100%;
  background: #1aebba;
}
.calculator .calRow {
  display: flex;
  height: 45px;
  justify-content: space-around;
}
.calculator .calMain :first-child {
  border: none;
}
.calculator .calMain .enter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  font-size: 12px;
  background: #fff;
  width: 75%;
}
.calculator .calRow .ivu-input {
  height: 100%;
  border-radius: 0;
  border-top: 1px solid #e9e9e9;
}
.calculator .calRow .ivu-btn {
  width: 25%;
  font-size: 16px;
  border-radius: 0;
  border: 1px solid #fff;
}
</style>
