<template>
<div class="diary">
    <div class="show-wrapper" ref="showWrapper">
        <div class="content-out">
            <div class="content">
                <!-- 对组件添加事件要加.native -->
                <Card v-show="diaryDetail" class="historyCard" v-for="(item, index) in diaryDetail" :key="index" @click.native="showDetail(index)">
                    <span class="label">{{item.weather}}</span>
                    <!-- 防止点击事件继续传播 -->
                    <Button class="delButton" type="ghost" shape="circle" icon="trash-a" @click.stop="delDiary(index)"></Button>
                    <div class="text">
                        <span>{{item.date}}</span>
                    </div>
                    <br><br>
                    <span class="remarks">{{item.content}}</span>
                    
                    <Modal v-model="showModalDetail" width="360":styles="{top: '20px'}">
                        <p slot="header" style="color:#57a3f3; text-align:center">
                            <Icon type="edit"></Icon>
                            <span>心情日记</span>
                        </p>
                        <div style="text-align:center">
                            <span class="text">日记时间：</span>
                            <DatePicker format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px" v-model="axy" @on-change="selectDate"></DatePicker>
                            <br><br>
                            <span class="text">天气：</span>
                            <RadioGroup v-model="item.weather" type="button">
                                <Radio label="晴"></Radio>
                                <Radio label="阴"></Radio>
                                <Radio label="雨"></Radio>
                                <Radio label="雪"></Radio>
                            </RadioGroup>
                            <br><br>
                            <span class="text">心情：</span>
                            <RadioGroup v-model="item.mood" type="button">
                                <Radio label="愉快"></Radio>
                                <Radio label="失落"></Radio>
                                <Radio label="悲伤"></Radio>
                                <Radio label="高兴"></Radio>
                            </RadioGroup>
                            <br><br>
                            <span class="text">日记内容</span>
                            <Input :value="item.content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="Enter something..."></Input>
                            <br><br>
                        </div>
                        <div slot="footer">
                            <Button type="primary" size="large" long>完成编辑</Button>
                        </div>
                    </Modal>
                </Card>
            </div>
        </div>
    </div>

    <Button class="addBtn" type="primary" shape="circle" icon="ios-plus-empty" @click="edit"></Button>

    <Modal v-model="showModalEdit" width="360":styles="{top: '20px'}">
        <p slot="header" style="color:#57a3f3; text-align:center">
            <Icon type="edit"></Icon>
            <span>心情日记</span>
        </p>
        <div style="text-align:center">
            <span class="text">日记时间：</span>
            <DatePicker format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px" v-model="axy" @on-change="selectDate"></DatePicker>
            <br><br>
            <span class="text">天气：</span>
            <RadioGroup v-model="diaryEdit.weather" type="button">
                <Radio label="晴"></Radio>
                <Radio label="阴"></Radio>
                <Radio label="雨"></Radio>
                <Radio label="雪"></Radio>
            </RadioGroup>
            <br><br>
            <span class="text">心情：</span>
            <RadioGroup v-model="diaryEdit.mood" type="button">
                <Radio label="愉快"></Radio>
                <Radio label="失落"></Radio>
                <Radio label="悲伤"></Radio>
                <Radio label="高兴"></Radio>
            </RadioGroup>
            <br><br>
            <span class="text">日记内容</span>
            <Input :value="diaryEdit.content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="Enter something..."></Input>
            <br><br>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long>完成编辑</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import Vue from "vue";
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
      diaryDetail: [
        {
          date: "2018年5月30日 18:30",
          weather: "晴",
          mood: "愉快",
          content: "asdasddasdasdasasdasddasxfvxdfxcvzxdfdfzdffsdsdfdas"
        },
        {
          date: "2018年5月31日 19:30",
          weather: "阴",
          mood: "高兴",
          content: "asdasddasdaasdasddasasdfsdsdfdas"
        },
        {
          date: "2018年6月1日 20:30",
          weather: "晴",
          mood: "愉快",
          content: "asdasdddfzdffsdsdfdas"
        }
      ],
      diaryEdit: {
        date: "",
        weather: "",
        mood: "",
        content: ""
      },
      showModalDetail: false,
      showModalEdit: false,
      weatherLable: "晴",
      moodLable: "愉快",
      axy: ""
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
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    showDetail(index) {
      //   let date = new Date();
      //   let time = date.getHours() + ":" + date.getMinutes();

      this.axy = this.diaryDetail[index].date;
      console.log(this.axy);

      this.showModalDetail = true;
    },
    selectDate(date) {
      this.axy = date;
      console.log(this.axy);
    },
    edit() {
      this.axy = "";
      this.showModalEdit = true;
    },
    delDiary(index) {
      this.$Message.warning({
        content: "已删除该日记",
        duration: 0.5
      });
      console.log(this.diaryDetail[index]);
      if (index > -1) {
        this.diaryDetail.splice(index, 1);
      }
    }
  }
};
</script>

<style>
.diary {
  position: relative;
}
.diary .show-wrapper {
  height: 570px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.diary .show-wrapper .content-out {
  padding: 20px 0 60px;
}
.ivu-modal {
  top: 20px;
}
.diary .addBtn {
    display: block;
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: 30px;
  right: 30px;
}
.diary .addBtn .ivu-icon {
  font-size: 50px;
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
