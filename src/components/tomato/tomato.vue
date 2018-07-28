<template>
    <div class="tomato">
        <div class="down-wrapper" ref="downWrapper">
            <div class="content-out">
            <circleTime></circleTime>
                <div class="content">
                <Card class="historyCard" v-for="(item, index) in clockList" :key="index">
                    <span class="label">{{item.clockLable}}</span>
                    <div class="text">
                        <span>开始时间：{{item.clockStart}}</span><br>
                        <span>番茄时长：{{item.clockDuration}}</span>
                    </div>
                    <br><br>
                    <span class="remarks">备注：{{item.clockInfo}}</span>
                </Card>
            </div>
          </div>
        </div>
    </div>
    
    
</template>

<script>
import circleTime from "../circleTime/circleTime";
import axios from "axios";
import BScroll from "better-scroll";
import { Card } from "iview";

export default {
  data() {
    return {
      clockList: [],
    };
  },
  components: {
    Card,
    BScroll,
    circleTime
  },
  created() {
    axios
      .post(
        "http://120.78.86.45/tomato/showTodoList",
        JSON.stringify({
          userId: 1
        })
      )
      .then(res => {
        this.clockList = res.data.clockList;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.$nextTick(function() {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.downScroll = new BScroll(this.$refs.downWrapper, {
        probeType: 3,
        click: true
      });
    }
  }
};
</script>

<style>
.tomato .down-wrapper {
  height: 570px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.tomato .down-wrapper .content {
  padding: 20px 0 60px;
}
.tomato .down-wrapper .ivu-card {
  margin: 0 20px 20px;
}
.tomato .down-wrapper .ivu-card-body {
  position: relative;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tomato .down-wrapper .label {
  position: absolute;
  top: 15px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  border-radius: 5px;
  background: rgb(4, 209, 148);
  text-align: center;
  color: #fff;
}
.tomato .down-wrapper .text {
  position: absolute;
  top: 15px;
  right: 15px;
}
.tomato .down-wrapper .remarks {
  padding-left: 8px;
}
</style>
