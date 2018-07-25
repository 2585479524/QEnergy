<template>
    <div class="tomato">
        <div class="up-wrapper">
            <!-- circle组件 -->
            <xCircle :percent="percent" :stroke-color="color" :size="170">
                <Icon v-if="percent == 100" type="ios-checkmark-empty" size="60" style="color: #5cb85c"></Icon>
                <span v-else style="font-size:40px">{{ percentCeil }}%</span>
            </xCircle>

            <span class="time">剩余时间:{{ `${min}分钟 ${sec}秒` }}</span>
            <Button class="setTomato" type="primary" @click="setTomato">{{setTomatoName}}</Button>
        </div>
        
        <Modal
            v-model="showModal"
            title="设置新的番茄"
            class="modal-wrapper">
            <span class="text">请选择时间：</span>
            <TimePicker format="HH:mm" :steps="[1, 10]" placeholder="Select time" style="width: 112px" v-model="duration"></TimePicker>
            <br><br>
            <span class="text">请选择番茄标签：</span>
            <RadioGroup v-model="tomatoLable" type="button">
                <Radio label="学习"></Radio>
                <Radio label="阅读"></Radio>
                <Radio label="吃饭"></Radio>
                <Radio label="购物"></Radio>
            </RadioGroup>
            <br><br>
            <span class="text">请输入备注：</span>
            <Input v-model="value" placeholder="备注" style="width: 240px"></Input>
            <div slot="footer">
                <Button type="primary" long :loading="modal_loading" @click="countdown">确定</Button>
            </div>
        </Modal>

        <div class="down-wrapper" ref="downWrapper">
            <div class="marginx">
                <div class="content">
                <Card class="historyCard" v-for="(item, index) in 10" :key="index">
                    <span class="count">学习</span>
                    <div class="text">
                        <span>开始时间：18:30</span><br>
                        <span>番茄时长：25:00</span>
                    </div>
                    <br><br>
                    <span class="remarks">备注：asdasddasdasdasasdasddasxfvxdfxcvzxdfdfzdffsdsdfdas</span>
                </Card>
            </div>
            </div>
            
        </div>
    </div>
    
    
</template>

<script>
import BScroll from "better-scroll";
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

export default {
  data() {
    return {
      tomatoTodo: [],
      percent: 0,
      duration: "",
      now: Date.parse(new Date()),
      showModal: false,
      tomatoLable: "学习",
      modal_loading: false,
      min: 0,
      sec: 0,
      value: "",
      msec: 0,
      setTomatoName: "设置时钟"
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
    Badge,
    BScroll
  },
  computed: {
    color() {
      // 蓝
      let color = "#2db7f5";
      if (this.percent == 100) {
        // 绿
        color = "#5cb85c";
      }
      return color;
    },
    durationNum() {
      let arr = this.duration.split(":");
      this.msec = (Number(arr[0]) * 60 + Number(arr[1])) * 1000;
      console.log(this.msec);

      return this.msec;
    },
    percentCeil() {
      // 解决显示数据与真实数据的精度问题
      return Math.ceil(this.percent);
    }
  },
  created() {
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
    },
    setTomato() {
      if (this.setTomatoName == "设置时钟") {
        this.duration = "";
        this.percent = 0;
        this.showModal = true;
      } else if (this.setTomatoName == "提前完成") {
        this.setTomatoName = "设置时钟";
        this.percent = 100;
        this.sec = 0;
        this.min = 0;
      }
    },
    countdown() {
      let time;
      this.percent = 0;
      this.showModal = false;
      this.setTomatoName = "提前完成";
      //   不可省略
      console.log(this.durationNum);
      console.log(this.msec);

      let rat = 100 / this.msec * 1000;
      clearInterval(time);

      time = setInterval(() => {
        this.percent += rat;
        this.msec -= 1000;

        let min = parseInt((this.msec / 1000 / 60) % 60);
        let sec = parseInt((this.msec / 1000) % 60);
        this.min = min > 9 ? min : "0" + min;
        this.sec = sec > 9 ? sec : "0" + sec;

        if (this.percent + rat > 100) {
          this.percent = 100;
          this.min = 0;
          this.sec = 0;
          this.setTomatoName = "设置时钟";
          clearInterval(time);
        }
      }, 1000);
    }
  }
};
</script>

<style>
.tomato .up-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
}

.tomato .up-wrapper .setTomato {
  margin: 10px 0;
}
.tomato .up-wrapper .time {
  font-size: 20px;
}
.tomato .down-wrapper {
  height: 320px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.ivu-modal-footer {
  border: none;
}
.modal-wrapper .text {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.marginx {
  padding: 20px 0 60px;
}
.ivu-card {
  margin: 0 20px 20px;
}
.ivu-card-body {
  position: relative;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tomato .down-wrapper .count {
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
