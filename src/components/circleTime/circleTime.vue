<template>
<div class="circle-time">
    <div class="circle-wrapper">
        <!-- circle组件 -->
        <xCircle :percent="percent" :stroke-color="strokeColor" :trail-color="trailColor" :size="140">
            <Icon v-if="percent == 100" type="ios-checkmark-empty" size="50" style="color: #fff"></Icon>
            <span v-else style="font-size:15px; color:#fff">
              剩余时间<br><br>
              {{ `${min} 分 ${sec} 秒` }}
              </span>
        </xCircle>

        <!-- <span class="time"></span> -->
        <Button class="set-btn" @click="setTomato">{{btnName}}</Button>
    </div>

    <Modal
        v-model="showConfigModal"
        title="设置新的番茄时钟"
        class="modal-wrapper">

      <span class="text">时长：</span>
      <Slider v-model="newDuration" show-input :step="10"></Slider>
      <!-- <Select v-model="newDuration" style="width:70px">
        <Option v-for="(item, index) in durationList" :value="item" :key="index">{{ item }}</Option>
      </Select> -->
      <span>分钟</span>
      <br><br>
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
    <Modal v-model="showInterrupt" width="360">
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
  TimePicker,
  Select,
  Option,
  Slider
} from "iview";

axios.defaults.withCredentials = true;
Vue.prototype.$Modal = Modal;

export default {
  data() {
    return {
      durationList: ["0.1", "25", "35", "45", "60"],
      labelList: ["学习", "运动", "工作"],
      percent: 0,

      now: Date.parse(new Date()),

      // 设置番茄的三个参数
      newDuration: 30,
      newLabel: "学习",
      newInfo: "",

      // 自定义时长参数
      customizeDurationProps: "",
      // 自定义标签参数
      customizeLabelProps: "",

      // 点击设置番茄后弹出模态框
      showConfigModal: false,
      // 点击中断番茄后弹出模态框
      showInterrupt: false,
      // 番茄时钟完成后弹出模态框
      showFinish: false,

      min: 0,
      sec: 0,
      msec: 0,
      btnName: "设置时钟",
      clockX: 0,
      trailColor: "#fff"
    };
  },
  components: {
    Button,
    xCircle: Circle,
    Icon,
    Modal,
    Input,
    TimePicker,
    Select,
    Option,
    Slider
  },
  computed: {
    ...mapState(["clockList"]),
    strokeColor() {
      // 番茄红
      let color = "#fa565e";
      if (this.percent == 100) {
        color = "#fff";
      }
      return color;
    },
    durationNum() {
      this.msec = this.newDuration * 60 * 1000;
      return this.msec;
    },
    percentCeil() {
      // 解决显示数据与真实数据的精度问题
      return Math.ceil(this.percent);
    }
  },
  methods: {
    ...mapMutations(["updateTomato"]),
    // 时钟开启，当用户点击“中断番茄”，确认中断后执行此函数
    interruptOk() {
      this.showInterrupt = false;
      axios
        .post("http://120.78.86.45/tomato/interruptClock", {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        })
        .then(res => {
          if (res.data.isInterrupt == true) {
            this.btnName = "设置时钟";
            this.percent = 100;
            this.sec = 0;
            this.min = 0;
          }
        })
        .catch(err => {});
    },
    // 用户单击“设置时钟”，各项参数置零，弹出配置面板
    setTomato() {
      if (this.btnName == "设置时钟") {
        this.showConfigModal = true;
      } else if (this.btnName == "中断番茄") {
        this.showInterrupt = true;
      }
    },
    // 配置番茄完成后，点击确认，提交ajax请求，后台记录该番茄时钟的id
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
        .catch(err => {});

      this.percent = 0;
      this.showConfigModal = false;
      this.btnName = "中断番茄";

      let rat = 100 / this.msec * 1000;

      let time = setInterval(() => {
        this.percent += rat;
        this.msec -= 1000;

        let min = parseInt((this.msec / 1000 / 60) % 60);
        let sec = parseInt((this.msec / 1000) % 60);
        this.min = min > 9 ? min : "0" + min;
        this.sec = sec > 9 ? sec : "0" + sec;

        if (this.percent + rat > 100) {
          this.percent = 100;
          clearInterval(time);
          this.min = 0;
          this.sec = 0;
          this.showFinish = true;
          this.btnName = "设置时钟";
        }
      }, 1000);
    },
    refreshOk() {
      this.showFinish = false;
      this.newDuration = this.durationList[0];
      this.newLabel = this.labelList[0];
      this.percent = 0;
      axios
        .post("http://120.78.86.45/tomato/showTodoList")
        .then(res => {
          this.updateTomato(res.data.clockList);
        })
        .catch();
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
.modal-wrapper .ivu-modal-content {
  border-radius: 0;
}
.modal-wrapper .ivu-input-wrapper .ivu-input {
  border-radius: 0;
}
.modal-wrapper .ivu-input-wrapper .ivu-input:hover {
  border-color: #1cbe99;
}
.modal-wrapper .ivu-slider-bar {
  background: #1cbe99;
}
.modal-wrapper .ivu-slider-button {
  border: 2px solid #1cbe99;
}
.ivu-select-item-selected.ivu-select-item-focus {
  background: #1cbe99;
}
</style>
