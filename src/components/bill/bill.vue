<template>
    <div class="bill" v-cloak>
      <div class="header-wrapper">
        <div class="datePicker">
          <DatePicker :value="dateMain" type="month" placeholder="选择日期" style="width: 100px"></DatePicker>
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
      <div class="show-wrapper" ref="showWrapper">
        <div class="content">
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
      </div>
      <Button class="add-btn" type="primary" shape="circle" icon="ios-plus-empty"  @click="edit"></Button>
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
      billList: [],
      totalIncome: 0,
      totalPay: 0,
      showModalDetail: false,
      dateMain: "2018-08"
    };
  },
  components: {
    DatePicker,
    Card,
    Button,
    Icon
  },
  computed: {
    ...mapState["refresh"],
  },
  created() {
    if (this.refresh) {
      this._initRefresh();
      this.refreshOk(false);
    }
    this.$nextTick(function() {
      this._initRefresh();
      this._initScroll();
    });
  },
  methods: {
    ...mapMutations["refreshOk"],
    _initRefresh() {
      axios
        .post("http://120.78.86.45/bill/showTodoList", {
          yearMonth: this.dateMain
        })
        .then(res => {
          console.log(res);

          this.billList = res.data.billList;
          this.totalIncome = res.data.totalIncome;
          this.totalPay = res.data.totalPay;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    edit() {
      this.$router.push("/editBill");
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
.bill .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(28, 190, 153, 0.1);
}
.bill .header-wrapper .title {
  padding-bottom: 5px;
  height: 25px;
  font-size: 20px;
  color: #fff;
}
.bill .datePicker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.bill .show-wrapper {
  height: 520px;
  overflow: hidden;
}

.bill .show-wrapper h3 {
  display: block;
  padding: 5px 20px;
  font-size: 12px;
  color: rgba(7, 17, 27, 0.7);
}
.bill .add-btn {
  display: block;
  position: absolute;
  bottom: 10px;
  right: 30px;
  background: #1cbe99;
}
.bill .add-btn .ivu-icon {
  font-size: 30px;
  font-weight: 700;
}
.bill .incomePay {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
}
.bill .incomePay .income,
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #ffffff;
}
.bill .incomePay .income .count {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}
.bill .incomePay .pay .count {
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
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
  background: #26b9bb;
  text-align: center;
  color: #fff;
}
.ivu-card-bordered {
  border: none;
}
.bill .show-wrapper .text {
  position: absolute;
  left: 50px;
}

.bill .show-wrapper .money {
  position: absolute;
  right: 20px;
}
</style>
