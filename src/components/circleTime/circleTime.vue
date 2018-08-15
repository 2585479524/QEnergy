<template>
<div class="circle-time">
    <div class="circle-wrapper">
        <!-- circle组件 -->
        <xCircle :percent="percent" :stroke-color="strokeColor" trail-color="#fff" :size="140">
            <Icon v-if="percent == 100" type="ios-checkmark-empty" size="50" style="color: #fff"></Icon>
            <span v-else style="font-size:15px; color:#fff">
              剩余时间<br><br>
              {{ `${min} 分 ${sec} 秒` }}
              </span>
        </xCircle>
        <Button class="set-btn" @click="setTomato">{{btnName}}</Button>
    </div>

    <Modal
        v-model="showConfigModal"
        title="设置新的番茄时钟"
        class="modal-wrapper">

      <span class="text">时长：{{newDuration}}分钟</span>
      <Slider v-model="newDuration" :step="10" :min="1"></Slider>
      <span class="text">标签：</span>
      <Select v-model="newLabel" style="width:70px">
        <Option v-for="(item, index) in labelList" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <br><br>
      <span class="text">备注：</span>
      <Input v-model="newInfo" placeholder="写点东西吧..." style="width: 233px"></Input>

      <div slot="footer">
        <Button type="primary" long @click="configerTomato">确定</Button>
      </div>
    </Modal>

    <!-- 执行中断番茄操作 -->
    <Modal v-model="showInterrupt" width="360" class="interrput">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>中断番茄时钟</span>
        </p>
        <div style="text-align:center">
            <p>点击确定后，番茄时钟中断，且不会被记录</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="interruptOk">确定中断</Button>
        </div>
    </Modal>

    <!-- 番茄计时完成 -->
    <Modal v-model="showFinish" width="360">
        <p slot="header" style="color:#19be6b;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>番茄时钟完成</span>
        </p>
        <div style="text-align:center">
            <p>恭喜你完成了一个番茄时钟</p>
        </div>
        <div slot="footer">
            <Button type="success" size="large" long @click="refreshOk">确定</Button>
        </div>
    </Modal>
</div>
    
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import {
  Button,
  Circle,
  Icon,
  Modal,
  Input,
  Select,
  Option,
  Slider,
  Notice
} from "iview";

axios.defaults.withCredentials = true;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;

export default {
  data() {
    return {
      labelList: ["学习", "运动", "工作", "阅读", "其他"],

      // 设置番茄的三个参数
      newDuration: 25,
      newLabel: "学习",
      newInfo: "",

      // 点击设置番茄后弹出模态框
      showConfigModal: false,
      // 点击中断番茄后弹出模态框
      showInterrupt: false,
      clockX: 0
    };
  },
  components: {
    Button,
    xCircle: Circle,
    Icon,
    Modal,
    Input,
    Select,
    Option,
    Slider
  },
  computed: {
    ...mapState([
      "clockList",
      "percent",
      "msec",
      "min",
      "sec",
      "btnName",
      "showFinish"
    ]),
    strokeColor() {
      // 番茄红
      let color = "#fa565e";
      if (this.percent == 100) {
        color = "#fff";
      }
      return color;
    },
    durationNum() {
      this.setMsec(this.newDuration * 60 * 1000);
      return this.msec;
    }
  },
  methods: {
    ...mapMutations([
      "updateTomato",
      "setPercent",
      "setMsec",
      "todoClick",
      "setMin",
      "setSec",
      "setBtn",
      "setRefresh"
    ]),
    setTomato() {
      if (this.btnName == "设置时钟") {
        this.showConfigModal = true;
      } else if (this.btnName == "中断番茄") {
        this.showInterrupt = true;
      }
    },
    configerTomato() {
      axios
        .post(
          "http://120.78.86.45/tomato/createClock",
          JSON.stringify({
            clockDuration: this.durationNum,
            clockLabel: this.newLabel,
            clockInfo: this.newInfo
          })
        )
        .then(res => {
          this.clockX = res.data.clockId;
        })
        .catch();
      this.setPercent(0);
      this.showConfigModal = false;
      this.setBtn("中断番茄");
      this.todoClick();
    },
    interruptOk() {
      axios
        .post("http://120.78.86.45/tomato/interruptClock")
        .then(res => {
          if (res.data.isInterrupt == true) {
            clearInterval(window.time);
            this.setBtn("设置时钟");
            this.setPercent(0);
            this.setMin(0);
            this.setSec(0);
          }
        })
        .catch();
      this.showInterrupt = false;
    },
    refreshOk() {
      this.setRefresh(false);
      this.newDuration = 25;
      this.newLabel = this.labelList[0];
      this.setPercent(0);
    }
  }
};
</script>

<style>
.circle-time {
  background: #1cbe99;
}
/* 圆环 */
.circle-time .circle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
}
.circle-time .circle-wrapper .ivu-chart-circle {
  margin: 10px 0;
}

/* 按钮 */
.circle-time .circle-wrapper .set-btn {
  background-color: #fa565e;
  border-radius: 0;
  border-color: #fa565ea4;
  color: #fff;
}
.circle-time .circle-wrapper .time {
  display: block;
  font-size: 14px;
  color: #fff;
}

/* modal  修改原生组件css */
/* .modal-wrapper .ivu-modal-content {
  border-radius: 0;
} */
.modal-wrapper .ivu-input-wrapper .ivu-input {
  border-radius: 0;
}
.modal-wrapper .ivu-input-wrapper .ivu-input:hover {
  border-color: #1cbe99;
}
/* 滑块效果 */
.modal-wrapper .ivu-slider-bar {
  background: #1cbe99;
}
.modal-wrapper .ivu-slider-button {
  border: 2px solid #1cbe99;
}

.modal-wrapper .ivu-btn-primary {
  background-color: #1cbe99;
  border-color: #1cbe99;
}
/* 选择框颜色 */
.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  background: #1cbe99;
}
.ivu-select-item-selected.ivu-select-item-focus {
  background: #1cbe99;
}
.interrput .ivu-modal-content .ivu-btn {
  background-color: #ed3f14;
  border-color: #ed3f14;
}

</style>
