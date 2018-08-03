<template>
    <div class="diary">
        <div class="header">
            <Button class="closeBtn" type="text" @click="back">返回</Button>
        </div>
        <div class="show-wrapper" ref="showWrapper">
            <div class="content-out">
                <div class="content">
                    <!-- 对组件添加事件要加.native -->
                    <Card v-show="diaryList" v-for="(item, index) in diaryList" :key="index" @click.native="showDetail(index)">
                        <span class="label">{{item.weather}}</span>
                        <!-- 防止点击事件继续传播 -->
                        <Button class="reDelButton" type="ghost" shape="circle" icon="arrow-return-left" @click.stop="reDeleteDiary(index)"></Button>
                        <Button class="delButton" type="ghost" shape="circle" icon="trash-a" @click.stop="deleteDiary(index)"></Button>
                        <div class="text">
                            <span>{{item.date}}</span>
                        </div>
                        <br>
                        <br>
                        <span class="remarks">{{item.content}}</span>
                    </Card>
                </div>
            </div>
        </div>
        <Modal v-model="showModalDetail" width="360" :styles="{top: '20px'}">
            <p slot="header" style="color:#57a3f3; text-align:center">
                <Icon type="edit"></Icon>
                <span>心情日记</span>
            </p>
            <div style="text-align:center">
                <span class="text">日记时间：{{diaryEdit.date}}</span>
                <br>
                <br>
                <span class="text">天气：</span>
                <RadioGroup v-model="diaryEdit.weather" type="button">
                    <Radio label="晴"></Radio>
                    <Radio label="阴"></Radio>
                    <Radio label="雨"></Radio>
                    <Radio label="雪"></Radio>
                </RadioGroup>
                <br>
                <br>
                <span class="text">心情：</span>
                <RadioGroup v-model="diaryEdit.mood" type="button">
                    <Radio label="愉快"></Radio>
                    <Radio label="失落"></Radio>
                    <Radio label="悲伤"></Radio>
                    <Radio label="高兴"></Radio>
                </RadioGroup>
                <br>
                <br>
                <span class="text">日记内容</span>
                <Input :value="diaryEdit.content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="Enter something..."></Input>
                <br>
                <br>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="closeDetail">关闭</Button>
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
      showModalDetail: false,
      showModalEdit: false
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
            console.log(res);
            
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
.diary {
  position: relative;
}
.diary .header {
  display: flex;
  justify-content: flex-end;
}
.diary .show-wrapper {
  height: 635px;
  overflow: hidden;
  background: linear-gradient(to bottom, #1cbe99, #26b9bb);
}
.diary .show-wrapper .content-out {
  padding: 20px 0;
}
.ivu-modal {
  top: 20px;
}
.diary .addBtn {
  display: block;
  position: absolute;
  bottom: 10px;
  right: 30px;
  background: #26b9bb;
}
.diary .addBtn .ivu-icon {
  font-size: 30px;
  font-weight: 700;
}
.diary .show-wrapper .ivu-card {
  margin: 0 20px 20px;
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
  background: rgb(231, 58, 130);
  text-align: center;
  color: #fff;
}
.diary .show-wrapper .ivu-card-body .reDelButton {
  position: absolute;
  top: 10px;
  right: 55px;
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
  position: absolute;
  top: 15px;
  left: 70px;
}
.diary .show-wrapper .remarks {
  padding-left: 0px;
}
</style>
