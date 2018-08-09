<template>
    <div class="my-diary">
      <div class="header-wrapper">
            <Button class="close-btn" type="text" @click="back">返回</Button>
        </div>
        
        <div class="show-wrapper" ref="showWrapper">
            <div class="content-out">
                <div class="content">
                    <Card v-show="diaryList" v-for="(item, index) in diaryList" :key="index" @click.native="showModal(index)">
                      <span class="label" :class="`color-${item.weather}`"><i class="iconfont" :class="item.weather"></i></span>
                      <Button class="re-del-btn" type="ghost" shape="circle" icon="arrow-return-left" @click.stop="reDeleteDiary(index)"></Button>
                      <Button class="del-btn" type="ghost" shape="circle" icon="trash-a" @click.stop="deleteDiary(index)"></Button>
                      <span class="text">{{item.date}}</span><br><br>
                      <span class="remarks">
                        <pre v-html="item.content"></pre>
                      </span>
                    </Card>
                </div>
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
      showModalEdit: false,
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
    };
  },
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
    this.$nextTick(function() {
      this._initGet();
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
    }
  },
  methods: {
    _initGet() {
      axios
        .post("http://120.78.86.45/diary/showRecycle")
        .then(res => {
          this.diaryList = res.data.diaryList;
        })
        .catch();
    },
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    // 显示日记详情
    showDetail(index) {
      this.showModalDetail = true;
      this.diaryEdit = this.diaryList[index];
    },
    // 关闭日记详情
    closeDetail() {
      this._initGet();
      this.showModalDetail = false;
    },
    // 恢复删除的日记
    reDeleteDiary(index) {
      axios
        .post("http://120.78.86.45/diary/regainDiary", {
          id: this.diaryList[index].id
        })
        .then(res => {
          if (res.data.isRegain) {
            this.$Message.success(res.data.message);
          }
        })
        .catch();

      this._initGet();
    },
    // 彻底删除日记
    deleteDiary(index) {
      axios
        .post("http://120.78.86.45/diary/deleteInchDiary", {
          id: this.diaryList[index].id
        })
        .then(res => {
          if (res.data.isDelete) {
            this.$Message.warning(res.data.message);
          }
        })
        .catch();
      this._initGet();
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.my-diary {
  position: relative;
}
.my-diary .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
  height: 50px;
  padding: 10px 0;
}
.my-diary .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  right: 10px;
}

.my-diary .show-wrapper {
  height: 635px;
  overflow: hidden;
}
.my-diary .show-wrapper .content-out {
  padding: 20px 0;
}
.ivu-modal {
  top: 20px;
}
.my-diary .addBtn {
  display: block;
  position: absolute;
  bottom: 10px;
  right: 30px;
  background: #26b9bb;
}
.my-diary .addBtn .ivu-icon {
  font-size: 30px;
  font-weight: 700;
}
.my-diary .show-wrapper .ivu-card {
  margin: 0 20px 20px;
}
.my-diary .show-wrapper .ivu-card-body {
  position: relative;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-diary .show-wrapper .ivu-card-body .label {
  position: absolute;
  top: 15px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  border-radius: 5px;
  background: rgb(231, 58, 130);
  text-align: center;
  color: #fff;
}
.my-diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--4 {
  background: rgb(97, 161, 245);
}
.my-diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--2 {
  background: rgb(144, 245, 97);
}
.my-diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--3 {
  background: rgb(245, 156, 97);
}
.my-diary .show-wrapper .ivu-card-body .color-icon-weibiaoti--1 {
  background: rgb(245, 107, 97);
}
.my-diary .show-wrapper .ivu-card-body .color-icon-weibiaoti-- {
  background: rgb(245, 97, 225);
}
.my-diary .show-wrapper .ivu-card-body .re-del-btn {
  position: absolute;
  top: 10px;
  right: 55px;
}
.my-diary .show-wrapper .ivu-card-body .del-btn {
  position: absolute;
  top: 10px;
  right: 15px;
}
.my-diary .show-wrapper .ivu-card-body .del-btn .ivu-icon {
  display: block;
  padding: 6px 5px;
}
.my-diary .show-wrapper .text {
  position: absolute;
  top: 15px;
  left: 70px;
}
.my-diary .show-wrapper .remarks {
  padding-left: 0px;
}
</style>
