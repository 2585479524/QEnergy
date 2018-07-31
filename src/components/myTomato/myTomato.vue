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
      <VePie :data="chartData"></VePie>
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
        columns: ["label", "duration"],
        rows: [],
      },
      total: {
        totalCount: 0,
        totalDuration: 0,
        todayCount: 0,
        todayDuration: 0,
      }
    };
  },
  components: {
    Card,
    VePie,
    Button
  },
  created() {
    axios
      .post(
        "http://120.78.86.45/tomato/showAnalysis",
      )
      .then(res => {
        console.log(res);
        this.total = res.data;
        this.chartData.rows = res.data.clockAnalysis;
      })
      .catch(err => {});
  },
  methods: {
    closePage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.my-tomato {
  background: linear-gradient(to bottom, #b6c7e7, #71ffb8);
}

.my-tomato .ivu-btn-ghost {
  position: absolute;
  top: 10px;
  right: 10px;
  color: azure;
  background-color: rgba(255, 255, 255, 0.3)
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
