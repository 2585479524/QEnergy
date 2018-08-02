<template>
<div class="my-bill">
  <Button  @click="closePage" type="ghost">取消</Button>
  <div class="date-wrapper">
    <DatePicker :value="dateMain" type="month" placeholder="Select month" style="width: 200px"></DatePicker>
  </div>
  <div class="line-wrapper">
    <VeLine :data="charLine" height="300px" :settings="chartSetLine"></VeLine>
  </div>
    <hr>
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
      dateMain: "2018-08"
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
.my-bill {
  background: linear-gradient(to bottom, #f7c2f0, #acc7fa);
}
.my-bill .date-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.my-bill .ivu-btn-ghost {
  position: absolute;
  top: 10px;
  right: 10px;
  color: azure;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
