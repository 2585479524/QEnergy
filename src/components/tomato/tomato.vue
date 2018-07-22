<template>
    <div class="tomato">
        <div class="up">
            <!-- circle组件 -->
            <xCircle :percent="percent" :stroke-color="color" :size="200">
                <Icon v-if="percent == 100" type="ios-checkmark-empty" size="60" style="color: #5cb85c"></Icon>
                <span v-else style="font-size:50px">{{ percentCeil }}%</span>
            </xCircle>

            <span class="time">剩余时间:{{ `${min}分钟 ${sec}秒` }}</span>
            
            <Button type="primary" @click="showModal = true">完成</Button>

        </div>
        
        <Modal
            v-model="showModal"
            title="设置新的番茄">
            请选择时间：
            <TimePicker format="HH:mm" :steps="[1, 10]" placeholder="Select time" style="width: 112px" v-model="duration"></TimePicker>
            <br>
            请选择番茄标签：
            <RadioGroup v-model="tomatoLable" type="button">
                <Radio label="学习"></Radio>
                <Radio label="阅读"></Radio>
                <Radio label="吃饭"></Radio>
                <Radio label="购物"></Radio>
            </RadioGroup>
            
            请输入备注：
            <Input v-model="value" placeholder="备注" style="width: 300px"></Input>
            <div slot="footer">
                <Button type="primary" long :loading="modal_loading" @click="countdown">确定</Button>
            </div>
        </Modal>
        
        
        <div class="list">
            <ul>
                <li v-for="(item, index) in tomatoTodo">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
    
    
</template>

<script>
import {
  Button,
  Circle,
  ButtonGroup,
  Icon,
  Modal,
  Input,
  RadioGroup,
  Radio,
  TimePicker
} from "iview";

export default {
  data() {
    return {
      tomatoTodo: [
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd"
      ],
      percent: 0,
      duration: "",
      now: Date.parse(new Date()),
      showModal: false,
      tomatoLable: "学习",
      modal_loading: false,
      xxx: "",
      min: 0,
      sec: 0,
      value: "",
      msec: 0
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
    TimePicker
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
  methods: {
    countdown() {
      this.percent = 0;
      this.showModal = false;
    //   不可省略
      console.log(this.durationNum);
      console.log(this.msec);

      let rat = 100 / this.msec * 1000;
      let time = setInterval(() => {
        this.percent += rat;
        this.msec -= 1000;
        let min = parseInt((this.msec / 1000 / 60) % 60);
        let sec = parseInt((this.msec / 1000) % 60);
        this.min = min > 9 ? min : "0" + min;
        this.sec = sec > 9 ? sec : "0" + sec;

        if (this.percent + rat >= 100) {
          this.percent = 100;
          clearInterval(time);
        }
      }, 1000);
    }
  }
};
</script>

<style>
.tomato .up {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}
.tomato .up .time {
  font-size: 24px;
}
</style>
