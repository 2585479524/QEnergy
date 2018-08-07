<template>
    <div class="my-tomato">
      <Button  @click="closePage" type="ghost">取消</Button>
      <div class="content">
        <span class="title">累计数据</span>
        <div class="showDate">
            <div class="left">
                <span class="name">番茄个数</span>
                <span class="count">{{total.totalCount}}</span>
            </div>
            <div class="right">
                <span class="name">累计时长</span>
                <span class="count">{{total.totalDuration}}<span class="pi">分钟</span></span>
            </div>
        </div>
        <span class="title">当日数据</span>
        <div class="showDate">
            <div class="left">
                <span class="name">番茄个数</span>
                <span class="count">{{total.todayCount}}</span>
            </div>
            <div class="right">
                <span class="name">累计时长</span>
                <span class="count">{{total.todayDuration}}<span class="pi">分钟</span></span>
            </div>
        </div>
      </div>
      <VePie :data="chartData" :loading="loading" :data-empty="dataEmpty"></VePie>
    </div>
    
</template>

<script>
import { Card, Button } from "iview";
import axios from "axios";
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
      loading: false,
      dataEmpty: false
    };
  },
  components: {
    Card,
    VePie,
    Button
  },
  created() {
    this.$nextTick(() => {
      this.loading = false;
      this.dataEmpty = false;
      axios
        .post("http://120.78.86.45/tomato/showAnalysis")
        .then(res => {
          // if (res.status === 200) {
          //   this.loading = false;
          //   if (res.data.isGet == true) {
          //     this.dataEmpty = false;
              this.total.totalCount = res.data.totalCount;
              this.total.totalDuration = res.data.totalDuration;
              this.total.todayCount = res.data.todayCount;
              this.total.todayDuration = res.data.todayDuration;
              this.chartData.rows = res.data.clockAnalysis;
            // } else {
            //   this.dataEmpty = true;
            // }
          // }
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

.my-tomato {
  background: linear-gradient(to bottom, #b6c7e7, #71ffb8);
}

.my-tomato .ivu-btn-ghost {
  position: absolute;
  top: 10px;
  right: 10px;
  color: azure;
  background-color: rgba(255, 255, 255, 0.3);
}
.my-tomato .content {
  padding: 35px 20px 10px;
}
.my-tomato .showDate {
  display: flex;
  font-size: 15px;
  height: 80px;
  justify-content: space-around;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
}

.my-tomato .title {
  display: block;
  padding: 3px 0;
  font-size: 14px;
}
.my-tomato .showDate .left,
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.my-tomato .showDate .name {
  text-align: center;
  font-size: 13px;
}
.my-tomato .showDate .count {
  display: block;
  position: relative;
  font-size: 25px;
  text-align: center;
}
.my-tomato .showDate .pi {
  font-size: 10px;
  padding: 3px;
}
</style>
