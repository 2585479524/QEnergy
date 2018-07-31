<template>
    <div class="tomato">
        <circleTime @refreshProps="refreshOk"></circleTime>
        <div class="down-wrapper" ref="downWrapper">
            <div class="content">
              <Card class="historyCard" v-for="(item, index) in clockList" :key="index">
                  <span class="label">{{item.clockLabel}}</span>
                  <div class="text">
                      <span>开始时间：{{item.clockStart}}</span><br>
                      <span>番茄时长：{{item.clockDuration}}</span>
                  </div>
                  <br><br>
                  <span class="remarks" v-if="item.clockInfo">备注：{{item.clockInfo}}</span>
              </Card>
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
      clockList: []
    };
  },
  components: {
    Card,
    BScroll,
    circleTime
  },
  created() {
    this.$nextTick(function() {
      this._initRefresh();
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.downScroll = new BScroll(this.$refs.downWrapper, {
        probeType: 3,
        click: true
      });
    },
    _initRefresh() {
      axios
        .post("http://120.78.86.45/tomato/showTodoList")
        .then(res => {
          this.clockList = res.data.clockList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    refreshOk(msg) {
      if (msg == true) {
        this._initRefresh();
      }
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
