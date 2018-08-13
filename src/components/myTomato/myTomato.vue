<template>
    <div class="my-tomato" @touchmove.prevent>
      <div class="header-wrapper">
        <Button class="close-btn" type="text" @click="closePage">取消</Button>
      </div>

      <div class="content-wrapper">
        <totalTomato :name="name[0]" :count="total.totalCount" :duration="total.totalDuration"></totalTomato>
        <totalTomato :name="name[1]" :count="total.todayCount" :duration="total.todayDuration"></totalTomato>
      </div>
      <VePie :data="chartData" :loading="loading" :data-empty="dataEmpty"></VePie>
    </div>
    
</template>

<script>
import { Card, Button } from "iview";
import axios from "axios";
import totalTomato from "../totalTomato/totalTomato"
import VePie from "v-charts/lib/pie.common";
export default {
  data() {
    return {
      chartData: {
        columns: ["label", "scale"],
        rows: []
      },
      total: {
        totalCount: 0,
        totalDuration: 0,
        todayCount: 0,
        todayDuration: 0
      },
      name: ["累计数据", "今日数据"],
      loading: false,
      dataEmpty: false
    };
  },
  components: {
    Card,
    VePie,
    Button,
    totalTomato
  },
  created() {
    this.$nextTick(() => {
      this.loading = false;
      this.dataEmpty = false;
      axios
        .post("http://120.78.86.45/tomato/showAnalysis")
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            if (res.data.isGet == true) {
              this.dataEmpty = false;
              this.total.totalCount = res.data.totalCount;
              this.total.totalDuration = res.data.totalDuration;
              this.total.todayCount = res.data.todayCount;
              this.total.todayDuration = res.data.todayDuration;
              this.chartData.rows = res.data.clockAnalysis;
            } else {
              this.dataEmpty = true;
            }
          }
        })
        .catch();
    });
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

.my-tomato .header-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 55px;
  background: #1cbe99;
  border-bottom: 1px solid rgba(28, 190, 153, 0.1);
}
.my-tomato .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  left: 82%;
}

</style>
