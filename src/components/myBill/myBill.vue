<template>
<div class="my-bill">
    
        <Col span="12">
            <DatePicker type="month" placeholder="Select month" style="width: 200px"></DatePicker>
        </Col>
    <!-- <VeRing :data="chartData1"></VeRing> -->
    <VeLine :data="chartData2" :settings="chartSettings"></VeLine>
</div>
</template>

<script>
import { Col, DatePicker } from "iview";
import VeLine from "v-charts/lib/line.common";
import VeRing from "v-charts/lib/ring.common";
export default {
  data() {
    this.chartSettings = {
      xAxisType: "time"
    };
    return {
      chartData1: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },
      chartData2: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "2018-01-14", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "2018-01-0", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "2018-03", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "2018-05", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "2018-07", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "2018-10", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  components: {
    VeLine,
    VeRing,
    Col,
    DatePicker
  }
};
</script>

<style>
</style>
