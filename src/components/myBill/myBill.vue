<template>
<div class="my-bill">
  <div class="header-wrapper">
    <div class="date-picker">
      <DatePicker :value="dateMain" type="month" style="width: 100px"></DatePicker>
      <Button class="close-btn" type="text" @click="closePage">😂</Button>
    </div>
  </div>

  <div class="line-wrapper">
    <VeLine :data="charLine" height="300px" :settings="chartSetLine"></VeLine>
  </div>
    <div class="bar-wrapper">
      <VeBar :data="chartBar" height="300px" :settings="chartSetBar"></VeBar>
    </div>
</div>
</template>

<script>
import { DatePicker, Button } from "iview";
import axios from "axios";
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";
export default {
  data() {
    this.chartSetLine = {
      labelMap: {
        dayIncome: "收入",
        dayPay: "支出",
      },
    };
    this.chartSetBar = {
      xAxisType: ['KMB'],
      metrics: ["payTotal"],
      labelMap: {
        payTotal: "标签对应总支出",
      },
      dataOrder: {
        label: "payTotal",
        order: "desc"
      }
    };
    return {
      charLine: {
        columns: ["day", "dayIncome", "dayPay"],
        rows: []
      },
      chartBar: {
        columns: ["payLabel", "payTotal"],
        rows: []
      },
    };
  },
  created() {
    axios
      .post("http://120.78.86.45/bill/showAnalysis", {
        yearMonth: this.dateMain
      })
      .then(res => {
        this.charLine.rows = res.data.lineList;
        this.chartBar.rows = res.data.pieList.labelPayList;
      })
      .catch();
  },
  computed: {
    dateMain() {
      let dateTime = new Date();
      let str = dateTime.toJSON().substring(0, 7);
      return str;
    }
  },
  components: {
    VeLine,
    VeBar,
    DatePicker,
    Button
  },
  methods: {
    closePage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
/* header-wrapper */
.my-bill .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
}
.my-bill .header-wrapper .date-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 55px;
  padding: 10px 0;
}
.my-bill .header-wrapper .date-picker .ivu-input {
  background-color: #1cbe99;
  color: #fff;
  border: 1px solid #fff;
}
.my-bill .header-wrapper .date-picker .ivu-input:focus {
  border-color: aliceblue;
}
.my-bill .header-wrapper .date-picker .ivu-input-icon {
  color: #fff;
}
.my-bill .header-wrapper .date-picker .ivu-icon-ios-calendar-outline:before {
  content: "\F104";
}
.my-bill .header-wrapper .date-picker .ivu-icon-ios-close:before {
  content: "\F10D";
}
.my-bill .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  right: 10px;
}
</style>
