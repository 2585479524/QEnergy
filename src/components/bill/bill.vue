<template>
    <div class="bill">
        <div class="datePicker">
            <DatePicker :value="dateMain" type="month" placeholder="Select month" style="width: 200px"></DatePicker>
        </div>
         <div class="incomeAndPay">
             <div class="income">
                 <span class="name">收入</span>
                 <span class="count">0.00</span>
             </div>
             <div class="pay">
                 <span class="name">支出</span>
                 <span class="count">0.00</span>
             </div>
         </div>
         <div class="show-wrapper" ref="showWrapper">
            <div class="content-out">
                <div v-show="billList" class="content" v-for="(itemBill, index) in billList">
                    <h3>{{itemBill.date}}</h3>
                    <!-- 对组件添加事件要加.native -->
                    <Card v-show="itemBill.dayDetail" class="historyCard" v-for="(item, index) in itemBill.dayDetail" :key="index">
                        <span class="label"><Icon type="icecream"></Icon></span>
                        <span class="text">{{item.label}}</span>
                        <span class="money">{{item.type}}￥{{item.money}}</span>
                    </Card>
                </div>
            </div>
        </div>
        <Button class="addBtn" type="primary" shape="circle" icon="ios-plus-empty"  @click="edit"></Button>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from "better-scroll";
import { DatePicker, Card, Button, Icon } from "iview";
export default {
  data() {
    return {
      billList: [
        {
          date: "2018年5月30日",
          dayDetail: [
            {
              billId: 1,
              label: "日常",
              info: "无",
              type: "支出",
              money: "50.00"
            },
            {
              billId: 2,
              label: "日常",
              info: "无",
              type: "支出",
              money: "50.00"
            }
          ]
        },
      ],
      showModalDetail: false,
      showModalEdit: false,
      dateMain: "2018-8"
    };
  },
  components: {
    DatePicker,
    Card,
    Button,
    Icon
  },
  created() {
    axios.post("120.78.86.45/bill/showTodoList", {

    }).then().catch()
    this.$nextTick(function() {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    showDetail(index) {
      this.axy = this.diaryDetail[index].date;
      console.log(this.axy);

      this.showModalDetail = true;
    },
    edit() {
        this.$router.push("/editBill");
    },
  }
};
</script>

<style>
.bill {
  position: relative;
}
.bill .datePicker {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.bill .show-wrapper {
  height: 450px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.bill .show-wrapper .content-out {
  padding: 20px 0 60px;
}
.bill .show-wrapper .content-out .content h3{
  padding: 0 0 5px 20px;
  color:dimgrey;
}
.ivu-modal {
  top: 20px;
}
.bill .addBtn {
  display: block;
  position: absolute;
  bottom: 20px;
  right: 30px;
}
.bill .addBtn .ivu-icon {
  font-size: 30px;
  font-weight: 700;
}
.bill .incomeAndPay {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
}
.bill .incomeAndPay .income,
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bill .incomeAndPay .income .count {
  font-size: 20px;
  font-weight: 700;
}
.bill .incomeAndPay .pay .count {
  font-size: 20px;
  font-weight: 700;
}
.bill .show-wrapper .ivu-card {
  margin: 0 20px 20px;
}

.bill .show-wrapper .ivu-card-body {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bill .show-wrapper .ivu-card-body .label {
  position: absolute;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 12px;
  background: rgb(247, 129, 75);
  text-align: center;
  color: #fff;
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
