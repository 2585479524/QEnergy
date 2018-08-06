<template>
<div class="circle-time">
    <div class="circle-wrapper">
        <!-- circle组件 -->
        <xCircle :percent="percent" :stroke-color="strokeColor" :trail-color="trailColor" :size="140">
            <Icon v-if="percent == 100" type="ios-checkmark-empty" size="40" style="color: #5cb85c"></Icon>
            <span v-else style="font-size:35px; color:#fff">{{ percentCeil }}%</span>
        </xCircle>

        <span class="time">剩余时间: {{ `${min}分钟 ${sec}秒` }}</span>
        <Button class="set-btn" @click="setTomato">{{setTomatoName}}</Button>
    </div>

    <Modal
        v-model="showModal"
        title="设置新的番茄时钟"
        class="modal-wrapper">
        <span class="text">时长：</span>
        <RadioGroup v-model="newDuration" type="button">
            <Radio :label="item" v-for="(item, index) in durationList" :key="index" @click.native.self="customizeDuration(index)"></Radio>
        </RadioGroup>
        <br><br>

        <span class="text">标签：</span>
        <RadioGroup v-model="newLabel" type="button">
            <Radio :label="item" v-for="(item, index) in labelList" :key="index" @click.native.self="customizeLabel(index)"></Radio>
        </RadioGroup>
        <br><br>

        <span class="text">备注：</span>
        <Input v-model="newInfo" placeholder="写点东西吧..." style="width: 233px"></Input>
        <div slot="footer">
            <Button type="primary" long @click="configerTomato" @onCancel="cancelModal">确定</Button>
        </div>
    </Modal>
    <Modal
      v-model="showCustomizeDuration"
      title="自定义时长"
      class-name="vertical-center-modal">
      <Input v-model="customizeDurationProps" style="width: 50px" @on-change="customizeDurationWarn"></Input>分钟
      <span style="color: red;" v-if="cusDurationWarn">*自定义时长已存在或不合法</span>
      <div slot="footer">
          <Button type="primary" long @click="cusDurationOk">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="showCustomizeLabel"
      title="自定义标签"
      class-name="vertical-center-modal">
      <Input v-model="customizeLabelProps" style="width: 240px" @on-change="customizeLabelWarn"></Input>
      <span style="color: red;" v-if="cusLabelWarn">*自定义标签已存在或不合法</span>
      <div slot="footer">
          <Button type="primary" long @click="cusLabelOk">确定</Button>
      </div>
    </Modal>
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
  ButtonGroup,
  Icon,
  Modal,
  Input,
  RadioGroup,
  Radio,
  TimePicker,
  Card,
  Badge
} from "iview";

axios.defaults.withCredentials = true;
Vue.prototype.$Modal = Modal;
export default {
  data() {
    return {
      durationList: ["25分钟", "35分钟", "自定义"],
      labelList: ["学习", "运动", "工作", "自定义"],
      percent: 0,

      now: Date.parse(new Date()),
      // 设置番茄的三个参数
      newDuration: "25分钟",
      newLabel: "学习",
      newInfo: "",
      // 自定义时长参数
      customizeDurationProps: "",
      // 自定义标签参数
      customizeLabelProps: "",

      // 点击设置番茄后弹出模态框
      showModal: false,
      // 点击中断番茄后弹出模态框
      showInterrupt: false,
      // 番茄时钟完成后弹出模态框
      showFinish: false,

      // 点击自定义时长后弹出模态框
      showCustomizeDuration: false,
      // 非法自定义时长
      cusDurationWarn: false,
      // 点击自定义标签后弹出模态框
      showCustomizeLabel: false,
      // 非法自定义标签
      cusLabelWarn: false,
      // 刷新控制参数
      refreshProps: false,

      min: 0,
      sec: 0,
      msec: 0,
      setTomatoName: "设置时钟",
      clockX: 0,
      trailColor: "#fff"
    };
  },
  components: {
    Button,
    xCircle: Circle,
    ButtonGroup,
    Icon,
    Modal,
    Input,
    RadioGroup,
    Radio,
    TimePicker,
    Card,
    Badge
  },
  computed: {
    ...mapState(["clockId"]),
    strokeColor() {
      // 蓝
      let color = "#2db7f5";
      if (this.percent == 100) {
        // 绿
        color = "#5cb85c";
      }
      return color;
    },
    durationNum() {
      let str = this.newDuration;
      this.msec = Number(str.slice(0, str.length - 2)) * 60 * 1000;
      return this.msec;
    },
    percentCeil() {
      // 解决显示数据与真实数据的精度问题
      return Math.ceil(this.percent);
    }
  },
  methods: {
    cancelModal() {
      console.log(1);
    },
    // 添加自定义按钮功能
    customizeDuration(index) {
      if (index == this.durationList.length - 1) {
        this.showCustomizeDuration = true;
      }
    },
    // 自定义时长不符合规则，警告
    customizeDurationWarn() {
      if (
        this.customizeDurationProps < 1 ||
        this.customizeDurationProps == 25 ||
        this.customizeDurationProps == 35 ||
        this.customizeDurationProps > 99999
      ) {
        this.cusDurationWarn = true;
      } else {
        this.cusDurationWarn = false;
      }
    },
    // 用户自定义时长点击确定，检测是否有警告
    cusDurationOk() {
      console.log(1);
      console.log(this.customizeDurationProps);
      
      if (this.customizeDurationProps == "") {
        this.cusDurationWarn == true;
      }
      if (this.cusDurationWarn == false) {
        this.showCustomizeDuration = false;
        this.durationList[this.durationList.length - 1] =
          this.customizeDurationProps + "分钟";
      }
    },

    // 用户自定义标签OK
    customizeLabel(index) {
      if (index == this.labelList.length - 1) {
        this.showCustomizeLabel = true;
      }
    },
    // 自定义标签不符合规则，警告
    customizeLabelWarn() {
      if (
        this.customizeLabelProps == "运动" ||
        this.customizeLabelProps == "学习" ||
        this.customizeLabelProps == "工作"
      ) {
        this.cusLabelWarn = true;
      } else {
        this.cusLabelWarn = false;
      }
    },
    // 用户自定义时长OK
    cusLabelOk() {
      if (this.cusLabelWarn == false) {
        this.showCustomizeLabel = false;
        this.labelList[this.labelList.length - 1] = this.customizeLabelProps;
      }
    },
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
            this.setTomatoName = "设置时钟";
            this.percent = 100;
            this.sec = 0;
            this.min = 0;
          }
        })
        .catch(err => {});
    },
    // 用户单击“设置时钟”，各项参数置零，弹出配置面板
    setTomato() {
      if (this.setTomatoName == "设置时钟") {
        this.showModal = true;
      } else if (this.setTomatoName == "中断番茄") {
        this.showInterrupt = true;
      }
    },
    // 配置番茄完成后，点击确认，提交ajax请求，后台记录该番茄时钟的id
    configerTomato() {
      axios
        .post(
          "http://120.78.86.45/tomato/createClock",
          JSON.stringify({
            userId: 1,
            clockLabel: this.newLabel,
            clockInfo: this.newInfo,
            clockDuration: this.durationNum
          })
        )
        .then(res => {
          this.clockX = res.data.clockId;
        })
        .catch(err => {});
      this.percent = 0;
      this.showModal = false;
      this.setTomatoName = "中断番茄";
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
          this.setTomatoName = "设置时钟";
          this.showFinish = true;
        }
      }, 1000);
    },
    refreshOk() {
      (this.refreshProps = true), (this.showFinish = false);
      this.newDuration = this.durationList[0];
      this.newLabel = this.labelList[0];
      this.percent = 0;
      this.$emit("refreshProps", this.refreshProps);
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
}
.circle-time .circle-wrapper .ivu-chart-circle {
  margin: 10px 0;
}

/* 按钮 */
.circle-time .circle-wrapper .set-btn {
  margin: 10px 0;
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
.ivu-modal-content {
  border-radius: 0;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
  border-color: #1cbe99;
  color: #1cbe99;
}
.ivu-radio-group-button .ivu-radio-wrapper:first-child {
  border-radius: 0;
}
.ivu-radio-group-button .ivu-radio-wrapper:last-child {
  border-radius: 0;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked {
  border-color: #1cbe99;
  color: #1cbe99;
}
.ivu-radio-group-button .ivu-radio-focus {
  box-shadow: -1px 0 0 0 #1cbe99, 0 0 0 2px rgba(28, 190, 153, 0.2) !important;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
  border-color: #1cbe99;
  color: #1cbe99;
}
.ivu-radio-group-button .ivu-radio-wrapper:after {
  background: rgba(28, 190, 153, 0.2) !important;
}
.ivu-input-wrapper .ivu-input {
  border-radius: 0;
}
.ivu-input-wrapper .ivu-input:hover {
  border-color: #1cbe99;
}
</style>
