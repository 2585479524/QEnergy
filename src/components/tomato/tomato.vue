<template>
  <div class="tomato">
    <circleTime></circleTime>
    <div class="down-wrapper" ref="downWrapper" :style="oHeight">
        <div class="content" v-if="tomatoShow">
          <Card v-for="(item, index) in clockList" :key="index">
              <span class="label">{{item.clockLabel}}</span>
              <div class="text">
                  <span>开始时间：{{item.clockStart}}</span><br>
                  <span>番茄时长：{{item.clockDuration}}</span>
              </div>
              <br><br>
              <span class="remarks" v-if="item.clockInfo">备注：{{item.clockInfo}}</span>
          </Card>
        </div>
        <div class="noData" v-else>
          <span>暂无数据</span>
        </div>
    </div>
  </div>
</template>

<script>
import circleTime from "../circleTime/circleTime";
import axios from "axios";
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
import { Card } from "iview";

export default {
  data() {
    return {
      oHeight: {
        height: window.screen.height - 250 + "px"
      }
    };
  },
  components: {
    Card,
    BScroll,
    circleTime
  },
  created() {
    this.$nextTick(function() {
      axios
        .post("http://120.78.86.45/tomato/showTodoList")
        .then(res => {
          this.updateTomato(res.data.clockList);
        })
        .catch(err => {});
      this._initScroll();
    });
  },
  computed: {
    ...mapState(["clockList"]),
    tomatoShow() {
      if (this.clockList == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapMutations(["updateTomato"]),
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
  overflow: hidden;
}
.tomato .down-wrapper .content {
  padding: 20px 0;
}
.tomato .down-wrapper .noData {
  display: flex;
  justify-content: center;
}
.tomato .down-wrapper .noData span {
  display: block;
  position: absolute;
  font-size: 15px;
  width: 15px;
  top: 120px;
}
.tomato .down-wrapper .content .ivu-card {
  margin: 0 20px 20px;
}
.tomato .down-wrapper .content .ivu-card-body {
  position: relative;
  height: 100px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(180, 197, 183);
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
