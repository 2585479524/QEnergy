<template>
<div class="my-tomato">
    <div class="down-wrapper" ref="downWrapper">
        <div class="content-out">
            <div class="content">
                <span>累计数据</span>
                <div class="showDate">
                    <div class="up">
                        <span class="name">番茄个数</span>
                        <span class="name">累计时长</span>
                    </div>
                    <div class="down">
                        <span class="count">{{total.totalCount}}</span>
                        <span class="count">
                            {{total.totalDuration}}
                            <span class="pi">分钟</span>
                        </span>
                    </div>
                </div>
                
                <span>当日数据</span>
                <div class="showDate">
                    <div class="up">
                        <span class="name">番茄个数</span>
                        <span class="name">累计时长</span>
                    </div>
                    <div class="down">
                        <span class="count">{{total.todayCount}}</span>
                        <span class="count">
                            {{total.todayDuration}}
                            <span class="pi">分钟</span>
                        </span>
                        
                    </div>
                </div>
                 <VeLine :data="chartData"></VeLine>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import { Card } from "iview";
import axios from "axios";
import VeLine from "v-charts/lib/pie.common";
export default {
  data() {
    return {
      chartData: {
        columns: ["lable", "duration"],
        rows: [
          { lable: "吃饭", duration: 1393 },
          { lable: "学习", duration: 3530 },
          { lable: "睡觉", duration: 2923 },
          { lable: "游戏", duration: 1723 },
        ]
      },
      total: {}
    };
  },
  components: {
    Card,
    VeLine
  },
  created() {
    axios
      .post(
        "http://120.78.86.45/tomato/showAnalysis",
        JSON.stringify({
          userId: 1
        })
      )
      .then(res => {
        console.log(res);
        this.total = res.data;
        this.rows = res.data.clockAnalysis;
      })
      .catch(err => {});
  }
};
</script>

<style>
.my-tomato .down-wrapper {
  height: 620px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.my-tomato .down-wrapper .content-out {
  padding: 20px 0 60px;
}
.my-tomato .down-wrapper .content-out .content {
  margin: 0 20px 20px;
}
.my-tomato .down-wrapper .showDate {
  display: flex;
  font-size: 15px;
  height: 100px;
  flex-direction: column;
  justify-content: space-around;
  background: #fff;
}
.my-tomato .down-wrapper .showDate .up {
  display: flex;
  justify-content: space-around;
}
.my-tomato .down-wrapper .showDate .down {
  display: flex;
  font-size: 35px;
  justify-content: space-around;
}
.my-tomato .down-wrapper .showDate .down .count {
  position: relative;
}
.my-tomato .down-wrapper .showDate .down .count .pi {
  position: absolute;
  width: 20px;
  left: 35px;
  bottom: 10px;
  font-size: 10px;
}
.my-tomato .down-wrapper .showDate :last-child {
  border-right: none;
}
.my-tomato .down-wrapper .historyCard .showDate-body {
  padding: 0;
}
</style>
