<template>
    <div class="diary">
      <div class="header-wrapper">
        <div class="date-picker">
          <DatePicker :value="dateMain" :editable="false" placeholder="选择日期" type="month" style="width: 100px" @on-change="selsectData"></DatePicker>
          <Button class="close-btn" type="text" @click="showModal(dex)">编辑</Button>
        </div>
      </div>
      <div class="show-wrapper" ref="showWrapper" :style="oHeight">
          <div class="content" v-if="diaryShow">
            <Card v-show="diaryList" v-for="(item, index) in diaryList" :key="index" @click.native="showModal(index)">
                <span class="label" :class="`color-${item.weather}`"><i class="iconfont" :class="item.weather"></i></span>
                <Button class="del-btn" type="ghost" shape="circle" icon="trash-a" @click.stop="deleteDiary(index)"></Button>
                <span class="text">{{item.date}}</span>
                <br><br>
                <span class="remarks" v-html="item.content">
                </span>
            </Card>
          </div>
          <div class="noData" v-else>
            <span>暂无数据</span>
          </div>
      </div>

      <Modal class="detailModal" v-model="showDetailModal" width="360" :styles="{top: '30px'}">
          <p slot="header" style="color:#1cbe99; text-align:center">
              <Icon type="edit"></Icon>
              <span>心情日记</span>
          </p>
          <div style="text-align:center">
            <span class="textDate">{{diaryEdit.date}}</span>
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
            <br>
          </div>
          <div slot="footer">
              <Button type="primary" size="large" long @click="changeDiary">完成编辑</Button>
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
      showDetailModal: false,
      dex: -1,
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
      ],
      oHeight: {
        height: window.screen.height - 105 + "px"
      }
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
      Date.prototype.toJSON = function() {
        return this.toLocaleString();
      };
      let dateTime = new Date();
      let str = dateTime.toJSON().substring(0, 17);
      let arr = str.split("/");
      let strr = arr.join("-");
      return strr;
    },
    dateMain() {
      Date.prototype.toJSON = function() {
        return this.toLocaleString();
      };
      let dateTime = new Date();
      let month = dateTime.toJSON().substring(5, 7);
      let x = 0;
      if (month >= 10) {
        x = 7;
      }else {
        x = 6;
      }
      let str = dateTime.toJSON().substring(0, x);
      let arr = str.split("/");
      let strr = arr.join("-");
      return strr;
    },
    diaryShow() {
      if (this.diaryList == "") {
        return false;
      } else {
        return true;
      }
    },
    contentToHtml() {
      return this.HTMLDecode(this.diaryEdit.content);
    }
  },
  methods: {
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    HTMLDecode(text) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    },
    replaceContent(content) {
      let str = content;
      // 限制最多2次换行
      str = str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, "\r\n\r\n");
      // 清除开头换行
      str = str.replace(/^((\s|&nbsp;)*\r?\n)+/g, "");
      // 清除结尾换行
      str = str.replace(/((\s|&nbsp;)*\r?\n)+$/g, "");
      return str;
    },
    // 按月查找日记
    selsectData(time) {
      if (time != "") {
        axios
          .post("http://120.78.86.45/diary/showTodoList", {
            yearMonth: time
          })
          .then(res => {
            this.diaryList = res.data.diaryList;
          })
          .catch();
      }
    },
    // 弹出编辑面板，需要判断是初次编辑还是二次编辑
    showModal(index) {
      this.showDetailModal = true;
      if (index == -1) {
        this.diaryEdit = {
          date: this.dateTime,
          weather: "icon-weibiaoti--4",
          mood: "icon-cool",
          content: ""
        };
      } else {
        this.diaryEdit = this.diaryList[index];
        this.dex = index;
      }
    },
    // 二次编辑提交
    changeDiary() {
      if (this.dex == -1) {
        if (this.replaceContent(this.diaryEdit.content) != "") {
          axios
            .post("http://120.78.86.45/diary/createDiary", {
              yearMonth: this.dateMain,
              weather: this.diaryEdit.weather,
              mood: this.diaryEdit.mood,
              content: this.replaceContent(this.diaryEdit.content)
            })
            .then(res => {
              if (res.data.isCreated) {
                this.$Message.success(res.data.message);
                this.diaryList = res.data.diaryList;
              }
            })
            .catch();
          this.showDetailModal = false;
        } else {
          this.$Message.error("日记内容不能为空");
        }
      } else {
        axios
          .post("http://120.78.86.45/diary/editDiary", {
            id: this.diaryList[this.dex].id,
            yearMonth: this.dateMain,
            weather: this.diaryList[this.dex].weather,
            mood: this.diaryList[this.dex].mood,
            content: this.replaceContent(this.diaryList[this.dex].content)
          })
          .then(res => {
            if (res.data.isChange) {
              this.$Message.success(res.data.message);
              this.diaryList = res.data.diaryList;
            }
          })
          .catch();
        this.showDetailModal = false;
      }
      this.dex = -1;
    },
    // 删除日记
    deleteDiary(index) {
      axios
        .post("http://120.78.86.45/diary/deleteDiary", {
          id: this.diaryList[index].id,
          yearMonth: this.dateMain
        })
        .then(res => {
          if (res.data.isDelete) {
            this.$Message.warning(res.data.message);
            this.diaryList = res.data.diaryList;
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
.diary .header-wrapper .date-picker {
  display: flex;
  justify-content: center;
  height: 55px;
  padding: 10px 0;
}
.diary .header-wrapper .date-picker .ivu-input {
  background-color: #1cbe99;
  color: #fff;
  border: 1px solid #fff;
}
pre {
  margin: 0;
}
.diary .header-wrapper .date-picker .ivu-input:focus {
  border-color: aliceblue;
}
.diary .header-wrapper .date-picker .ivu-input-icon {
  color: #fff;
}
.diary .header-wrapper .date-picker .ivu-icon-ios-calendar-outline:before {
  content: "\F104";
}
.diary .header-wrapper .date-picker .ivu-icon-ios-close:before {
  content: "\F10D";
}
.diary .header-wrapper .close-btn {
  position: absolute;
  left: 82%;
  color: #fff;
}

/* show-wrapper */
.diary .show-wrapper {
  background: #fff;
  overflow: hidden;
}
.diary .show-wrapper .content {
  padding: 20px 0;
}
.ivu-modal {
  top: 20px;
}
.diary .show-wrapper .ivu-card {
  margin: 0 20px 20px;
}
.diary .show-wrapper .ivu-card-body {
  position: relative;
  height: 100px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(231, 229, 229);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.diary .show-wrapper .noData {
  display: flex;
  justify-content: center;
}
.diary .show-wrapper .noData span {
  display: block;
  position: absolute;
  font-size: 15px;
  width: 15px;
  top: 200px;
}
.diary .show-wrapper .ivu-card-body .label {
  position: absolute;
  top: 15px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
}
.diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--4 {
  background: rgb(97, 161, 245);
}
.diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--2 {
  background: rgb(144, 245, 97);
}
.diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--3 {
  background: rgb(245, 156, 97);
}
.diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--1 {
  background: rgb(245, 107, 97);
}
.diary .show-wrapper .ivu-card-body .color-icon-weibiaoti-- {
  background: rgb(245, 97, 225);
}
.diary .show-wrapper .ivu-card-body .del-btn {
  position: absolute;
  top: 10px;
  right: 15px;
}
.diary .show-wrapper .ivu-card-body .del-btn .ivu-icon {
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
  display: block;
  padding-left: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* detailModal  修改原生组件css */
.detailModal .ivu-radio-group-button .ivu-radio-wrapper:first-child {
  border-radius: 0;
}
.detailModal .ivu-radio-group-button .ivu-radio-wrapper:last-child {
  border-radius: 0;
}
.detailModal .ivu-radio-group-button .ivu-radio-wrapper-checked {
  border-color: #1cbe99;
  color: #1cbe99;
}
.detailModal .ivu-radio-group-button .ivu-radio-focus {
  box-shadow: -1px 0 0 0 #1cbe99, 0 0 0 2px rgba(28, 190, 153, 0.2) !important;
}
.detailModal .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
  border-color: #1cbe99;
  color: #1cbe99;
}
.detailModal .ivu-radio-group-button .ivu-radio-wrapper:after {
  background: rgba(28, 190, 153, 0.2);
}
.detailModal .ivu-input-wrapper .ivu-input:hover {
  border-color: #1cbe99;
}
.detailModal .ivu-btn-primary {
  background-color: #1cbe99;
  border-color: #1cbe99;
}
</style>