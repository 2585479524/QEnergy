<template>
<div class="my-bill" @touchmove.prevent>
  <div class="header-wrapper">
    <div class="date-picker">
      <DatePicker :value="dateMain" :editable="false" placeholder="选择日期" type="month" style="width: 100px" @on-change="selsectData"></DatePicker>
      <Button class="close-btn" type="text" @click="closePage">返回</Button>
    </div>
  </div>
  <div class="show-wrapper" :style="oHeight">
    <div class="line-wrapper">
    <VeLine :data="charLine" height="300px" :settings="chartSetLine":loading="loading" :data-empty="dataEmpty"></VeLine>
  </div>
  <div class="bar-wrapper">
    <VeBar :data="chartBar" height="300px" :settings="chartSetBar":loading="loading" :data-empty="dataEmpty"></VeBar>
  </div>
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
        dayPay: "支出"
      }
    };
    this.chartSetBar = {
      xAxisType: ["KMB"],
      metrics: ["payTotal"],
      labelMap: {
        payTotal: "标签对应总支出"
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
      oHeight: {
        height: window.screen.height - 56 + "px"
      },
      loading: false,
      dataEmpty: false
    };
  },
  created() {
    this.loading = true;
    this.dataEmpty = true;
    axios
      .post("http://120.78.86.45/bill/showAnalysis", {
        yearMonth: this.dateMain
      })
      .then(res => {
        if (res.status === 200) {
          this.loading = false;
          if (res.data.isGet == true) {
            this.dataEmpty = false;
            this.charLine.rows = res.data.lineList;
            this.chartBar.rows = res.data.pieList.labelPayList;
          } else {
            this.dataEmpty = true;
          }
        }
      })
      .catch();
  },
  computed: {
    dateMain() {
      let dateTime = new Date();
      let str = dateTime.toJSON().substring(0, 7);
      return str;
    },
    selsectData(time) {
      if (time != "") {
        axios
          .post("http://120.78.86.45/bill/showAnalysis", {
            yearMonth: time
          })
          .then(res => {
            this.charLine.rows = res.data.lineList;
            this.chartBar.rows = res.data.pieList.labelPayList;
          })
          .catch();
      }
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
@import "v-charts/lib/style.css";
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

.my-bill .line-wrapper {
  position: relative;
  left: -5px;
}
.my-bill .bar-wrapper {
  position: relative;
  top: -20px;
  left: -5px;
}
</style>
