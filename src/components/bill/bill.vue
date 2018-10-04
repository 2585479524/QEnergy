<template>
  <div class="bill" v-cloak>
    <div class="header-wrapper">
      <div class="datePicker">
        <DatePicker :value="dateMain" :editable="false" placeholder="选择日期" type="month" style="width: 100px" @on-change="selsectData"></DatePicker>
      </div>
      <div class="incomePay">
        <div class="income">
            <span class="name">收入</span>
            <span class="count">{{totalIncome}}</span>
        </div>
        <div class="pay">
            <span class="name">支出</span>
            <span class="count">{{totalPay}}</span>
        </div>
      </div>
    </div>
    <div class="show-wrapper" ref="showWrapper" :style="oHeight">
      <div class="content" v-if="billShow">
          <div v-show="billList" v-for="(itemBill, index) in billList">
              <h3>{{itemBill.dateFull}}</h3>
              <!-- 对组件添加事件要加.native -->
              <Card v-show="itemBill.dayDetail" v-for="(item, index) in itemBill.dayDetail" :key="index">
                  <span class="label"><i class="iconfont" :class="item.iconCode"></i></span>
                  <span class="text">{{item.label}}</span>
                  <span class="money">{{item.type}}￥{{item.money}}</span>
              </Card>
          </div>
      </div>
      <div class="noData" v-else>
        <span>暂无数据</span>
      </div>
    </div>
    <Button class="add-btn" :style="addTop" type="primary" shape="circle" icon="ios-plus-empty"  @click="edit"></Button>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import { DatePicker, Card, Button, Icon } from "iview";
export default {
  data() {
    return {
      showModalDetail: false,
      oHeight: {
        height: window.screen.height - 140 + "px"
      },
      addTop: {
        top: window.screen.height - 120 + "px"
      }
    };
  },
  components: {
    DatePicker,
    Card,
    Button,
    Icon
  },
  computed: {
    ...mapState(["billList", "totalIncome", "totalPay"]),
    dateMain() {
      Date.prototype.toJSON = function() {
        return this.toLocaleString();
      };
      let dateTime = new Date();
      let month = dateTime.toJSON().substring(5, 7);
      let x = 0;
      if (month >= 10) {
        x = 7;
      }else {
        x = 6;
      }
      let str = dateTime.toJSON().substring(0, x);
      let arr = str.split("/");
      let strr = arr.join("-");
      console.log(str);
      
      return strr;
    },
    billShow() {
      if (this.billList == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    console.log(this.dateMain);
    
    axios
      .post("http://120.78.86.45/bill/showTodoList", {
        yearMonth: this.dateMain
      })
      .then(res => {
        this.updateBill({
          billList: res.data.billList,
          totalIncome: res.data.totalIncome,
          totalPay: res.data.totalPay
        });
      })
      .catch();

    this.$nextTick(function() {
      this._initScroll();
    });
  },
  methods: {
    ...mapMutations(["updateBill"]),
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    edit() {
      this.$router.push("/editBill");
    },
    selsectData(time) {
      if (time != "") {
        axios
          .post("http://120.78.86.45/bill/showTodoList", {
            yearMonth: time
          })
          .then(res => {
            this.updateBill({
              billList: res.data.billList,
              totalIncome: res.data.totalIncome,
              totalPay: res.data.totalPay
            });
          })
          .catch();
      }
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.bill {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* header-wrapper */
.bill .header-wrapper {
  background: #1cbe99;
  height: 90px;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
}
.bill .header-wrapper .datePicker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
.bill .header-wrapper .datePicker .ivu-input {
  background-color: #1cbe99;
  color: #fff;
  border: 1px solid #fff;
}
.bill .header-wrapper .datePicker .ivu-input:focus {
  border-color: aliceblue;
}
.bill .header-wrapper .datePicker .ivu-input-icon {
  color: #fff;
}
.bill .header-wrapper .datePicker .ivu-icon-ios-calendar-outline:before {
  content: "\F104";
}
.bill .header-wrapper .datePicker .ivu-icon-ios-close:before {
  content: "\F10D";
}
.bill .header-wrapper .incomePay {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
}
.bill .header-wrapper .incomePay .income,
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #ffffff;
}
.bill .header-wrapper .incomePay .income .count {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}
.bill .header-wrapper .incomePay .pay .count {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}

/* show-wrapper */
.bill .show-wrapper {
  overflow: hidden;
}
.bill .show-wrapper h3 {
  padding: 5px 20px;
  font-size: 13px;
  color: rgba(7, 17, 27, 0.7);
}
.bill .show-wrapper .noData {
  display: flex;
  justify-content: center;
}
.bill .show-wrapper .noData span {
  display: block;
  position: absolute;
  font-size: 15px;
  width: 15px;
  top: 165px;
}
.bill .show-wrapper .ivu-card {
  padding: 2px 0;
  border-radius: 0;
  border-bottom: 1px solid rgba(228, 228, 228, 0.5);
}
.bill .show-wrapper .ivu-card-body {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
}
.bill .show-wrapper .ivu-card-body .label {
  position: absolute;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 12px;
  background: #1cbe99;
  text-align: center;
  color: #fff;
}
.bill .ivu-card-bordered {
  border: none;
}
.bill .show-wrapper .text {
  position: absolute;
  left: 50px;
}
.bill .show-wrapper .money {
  position: absolute;
  right: 5%;
}
.bill .add-btn {
  position: absolute;
  right: 30px;
  background: #1cbe99;
}
.bill .ivu-btn-primary {
  border-color: #5acfb4;
}
.bill .add-btn .ivu-icon {
  font-size: 30px;
  font-weight: 700;
}
</style>
