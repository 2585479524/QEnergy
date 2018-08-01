<template>
    <div class="calculator">
        <div class="calMain">
            <div class="calRow">
                <Input :value="enter" placeholder="请输入金额" style="width: 300px"></Input>
                
                <Button type="ghost">{{result}}</Button>
            </div>
            <div class="calRow">
                <Button type="ghost" @click="calculate(7)">7</Button>
                <Button type="ghost" @click="calculate(8)">8</Button>
                <Button type="ghost" @click="calculate(9)">9</Button>
                <Button type="ghost" icon="chevron-down" @click="showCalculator(1)"></Button>
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
import { Button, Icon, Input } from "iview";
import { mapState, mapMutations } from "vuex";
import axios from 'axios';
import store from "../../store/store";
export default {
  data() {
    return {
      remark: "aaa"
    };
  },
  components: {
    Button,
    Icon,
    Input
  },
  computed: {
    ...mapState(["result", "enter", "icon", "billType"])
  },
  methods: {
    ...mapMutations(["showCalculator", "calculate"]),
    back() {
      axios.post("http://120.78.86.45/bill/createBill", {
        label: this.icon.iconName,
        iconCode: this.icon.iconCode,
        type: this.billType,
        money: this.result,
      }).then(res => {
        console.log(res);
        
      }).catch();
      // 触发ajax提交参数
      // 返回页面后触发ajax重新获取数据
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.calculator {
  width: 100%;
  background: #e2e2e2;
}
.calculator .calRow {
  display: flex;
  height: 45px;
  justify-content: space-around;
}
.calculator .calRow .ivu-input {
  height: 100%;
}
.calculator .calRow .ivu-btn {
  width: 25%;
  font-size: 20px;
  border-radius: 0;
  border: 1px solid #fff;
}
</style>
