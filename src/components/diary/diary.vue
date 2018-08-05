<template>
    <div class="diary">
      <div class="header-wrapper">
        <div class="datePicker">
          <DatePicker :value="dateMain" type="month" style="width: 100px"></DatePicker>
          <Button class="close-btn" type="text" @click="showModal(index)">编辑</Button>
        </div>
      </div>
      <div class="show-wrapper" ref="showWrapper">
          <div class="content-out">
            <Card v-show="diaryList" v-for="(item, index) in diaryList" :key="index" @click.native="showModal(index)">
                <span class="label"><i class="iconfont" :class="item.weather"></i></span>
                <Button class="delButton" type="ghost" shape="circle" icon="trash-a" @click.stop="deleteDiary(index)"></Button>
                <span class="text">{{item.date}}</span><br><br>
                <span class="remarks">{{item.content}}</span>
            </Card>
          </div>
      </div>
      <Modal v-model="showModalDetail" width="360" :styles="{top: '20px'}">
          <p slot="header" style="color:#57a3f3; text-align:center">
              <Icon type="edit"></Icon>
              <span>心情日记</span>
          </p>
          <div style="text-align:center">
            <span class="text">日记时间：{{diaryEdit.date}}</span>
            <br><br>
            <span class="text">天气：</span>
            <RadioGroup v-model="diaryEdit.weather" type="button">
              <Radio v-for="(item, index) in weatherRadio" :label="item" :key="index">
                <i class="iconfont" :class="item"></i>
              </Radio>
            </RadioGroup>
            <br><br>
            <span class="text">心情：</span>
            <RadioGroup v-model="diaryEdit.mood" type="button">
              <Radio v-for="(item, index) in moodRadio" :label="item" :key="index">
                <i class="iconfont" :class="item"></i>
              </Radio>
            </RadioGroup>
            <br><br>
            <span class="text">日记内容</span>
            <Input v-model="diaryEdit.content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="记录你的点点滴滴..."></Input>
            <br><br>
          </div>
          <div slot="footer">
              <Button type="primary" size="large" long @click="changeDiary(index)">完成编辑</Button>
          </div>
      </Modal>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import store from "../../store/store";
import BScroll from "better-scroll";
import {
  Card,
  Button,
  Modal,
  Icon,
  DatePicker,
  Radio,
  RadioGroup,
  Input,
  Message
} from "iview";

Vue.prototype.$Message = Message;
export default {
  data() {
    return {
      diaryList: [],
      diaryEdit: {},
      showModalDetail: false,
      showModalEdit: false,
      index: -1,
      weatherRadio: [
        "icon-weibiaoti--4",
        "icon-weibiaoti--2",
        "icon-weibiaoti--3",
        "icon-weibiaoti--1",
        "icon-weibiaoti--"
      ],
      moodRadio: [
        "icon-cool",
        "icon-wink",
        "icon-crazy",
        "icon-sleeping",
        "icon-cry"
      ]
    };
  },
  store,
  components: {
    Card,
    Button,
    Modal,
    Icon,
    DatePicker,
    Radio,
    RadioGroup,
    Input
  },
  created() {
    axios
      .post("http://120.78.86.45/diary/showTodoList", {
        yearMonth: this.dateMain
      })
      .then(res => {
        this.diaryList = res.data.diaryList;
      })
      .catch();
    this.$nextTick(function() {
      this._initScroll();
    });
  },
  computed: {
    dateTime() {
      let dateTime = new Date();
      let str = dateTime.toJSON().substring(0, 16);
      let arr = str.split("T");
      let strr = arr.join(" ");
      return strr;
    },
    dateMain() {
      let dateTime = new Date();
      let str = dateTime.toJSON().substring(0, 7);
      return str;
    }
  },
  methods: {
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    showModal(index) {
      this.showModalDetail = true;
      if (index == -1) {
        this.diaryEdit = {
          date: this.dateTime,
          weather: "icon-weibiaoti--4",
          mood: "icon-cool",
          content: ""
        };
      } else {
        this.index = index;
        this.diaryEdit = this.diaryList[index];
      }
      this.index = -1;
    },
    changeDiary(index) {
      if (index == -1) {
        if (this.diaryEdit.content != "") {
          axios
            .post("http://120.78.86.45/diary/createDiary", {
              weather: this.diaryEdit.weather,
              mood: this.diaryEdit.mood,
              content: this.diaryEdit.content
            })
            .then(res => {
              if (res.data.isCreated) {
                this.$Message.success(res.data.message);
                this.$router.go(0);
              }
            })
            .catch();
          this.showModalDetail = false;
        } else {
          this.$Message.error("日记内容不能为空");
        }
      } else {
        axios
          .post("http://120.78.86.45/diary/editDiary", {
            id: this.diaryList[index].id,
            weather: this.diaryList[index].weather,
            mood: this.diaryList[index].mood,
            content: this.diaryList[index].content
          })
          .then(res => {
            if (res.data.isChange) {
              this.$Message.success(res.data.message);
              this.$router.go(0);
            }
          })
          .catch();
        this.showModalDetail = false;
      }
      this.index = -1;
    },
    // 删除日记
    deleteDiary(index) {
      axios
        .post("http://120.78.86.45/diary/deleteDiary", {
          id: this.diaryList[index].id
        })
        .then(res => {
          if (res.data.isDelete) {
            this.$Message.warning(res.data.message);
            this.$router.go(0);
          }
        })
        .catch();
    }
  }
};
</script>

<style>
.diary {
  position: relative;
}
/* header-wrapper */
.diary .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
}
.diary .header-wrapper .datePicker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}
.diary .header-wrapper .datePicker .ivu-input {
  background-color: #1cbe99;
  color: #fff;
  border: 1px solid #fff;
}
.diary .header-wrapper .datePicker .ivu-input:focus {
  border-color: aliceblue;
}
.diary .header-wrapper .datePicker .ivu-input-icon {
  color: #fff;
}
.diary .header-wrapper .datePicker .ivu-icon-ios-calendar-outline:before {
  content: "\F104";
}
.diary .header-wrapper .datePicker .ivu-icon-ios-close:before {
  content: "\F10D";
}
.diary .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  right: 10px;
}

/* show-wrapper */
.diary .show-wrapper {
  height: 550px;
  background: #fff;
  overflow: hidden;
}
.diary .show-wrapper .content-out {
  padding: 20px 0;
}
.ivu-modal {
  top: 20px;
}
.diary .show-wrapper .ivu-card {
  margin: 0 20px 20px;
  border-radius: 0;
}
.diary .show-wrapper .ivu-card-body {
  position: relative;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.diary .show-wrapper .ivu-card-body .label {
  position: absolute;
  top: 15px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  border-radius: 5px;
  background: rgb(97, 161, 245);
  text-align: center;
  color: #fff;
}
.diary .show-wrapper .ivu-card-body .delButton {
  position: absolute;
  top: 10px;
  right: 15px;
}
.diary .show-wrapper .ivu-card-body .delButton .ivu-icon {
  display: block;
  padding: 6px 5px;
}
.diary .show-wrapper .text {
  display: block;
  position: absolute;
  top: 15px;
  left: 70px;
}
.diary .show-wrapper .remarks {
  padding-left: 0px;
}
</style>
