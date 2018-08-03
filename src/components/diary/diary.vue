<template>
    <div class="diary">
        <div class="show-wrapper" ref="showWrapper">
            <div class="content-out">
                <div class="content">
                    <!-- 对组件添加事件要加.native -->
                    <Card v-show="diaryList" v-for="(item, index) in diaryList" :key="index" @click.native="showDetail(index)">
                        <span class="label">{{item.weather}}</span>
                        <!-- 防止点击事件继续传播 -->
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
                <Button type="primary" size="large" long @click="reEditDiary(index)">完成编辑</Button>
            </div>
        </Modal>
        <Button class="addBtn" type="primary" shape="circle" icon="ios-plus-empty" @click="showEditNew"></Button>

        <Modal v-model="showModalEdit" width="360" :styles="{top: '20px'}">
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
                <Input v-model="diaryEdit.content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="Enter something..."></Input>
                <br>
                <br>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="editNewDiary">完成编辑</Button>
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
      showModalEdit: false,
      weatherLable: "晴",
      moodLable: "愉快"
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
        .post("http://120.78.86.45/diary/showTodoList")
        .then(res => {
          console.log(res);

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
    showDetail(index) {
      console.log(index);

      this.showModalDetail = true;
      this.diaryEdit = this.diaryList[index];
      console.log(this.diaryEdit);
    },
    showEditNew() {
      this.showModalEdit = true;
      this.diaryEdit = {
        date: this.dateTime,
        weather: "",
        mood: "",
        content: ""
      };
    },
    // 重新编辑
    reEditDiary(index) {
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
          }
        })
        .catch();
      this._initGet();
      this.showModalDetail;
    },
    // 提交新的日记
    editNewDiary() {
      console.log(this.diaryEdit);

      axios
        .post("http://120.78.86.45/diary/createDiary", {
          weather: this.diaryEdit.weather,
          mood: this.diaryEdit.mood,
          content: this.diaryEdit.content
        })
        .then(res => {
          if (res.data.isCreated) {
            this.$Message.success(res.data.message);
          }
        })
        .catch();
      this._initGet();
      this.showModalEdit = false;
    },
    // 删除日记
    deleteDiary(index) {
      console.log(index);

      axios
        .post("http://120.78.86.45/diary/deleteDiary", {
          id: this.diaryList[index].id
        })
        .then(res => {
          if (res.data.isDelete) {
            this.$Message.warning(res.data.message);
          }
        })
        .catch();
      this._initGet();
    }
  }
};
</script>

<style>
.diary {
  position: relative;
}
.diary .show-wrapper {
  height: 613px;
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
