<template>
    <div class="my-discuss">
        <div class="header-wrapper">
            <Button class="close-btn" type="text" @click="back">返回</Button>
        </div>
          <div class="down-wrapper" ref="downWrapper" :style="oHeight">
            <div class="content" v-if="myDiscussShow">
                <Card v-for="(item, index) in discussList" :key="index">
                  <Button class="del-btn" type="ghost" shape="circle" icon="trash-a" @click.stop="deleteDiscuss(index)"></Button>
                    <div class="up">
                        <div class="avator-name">
                            <img :src="avator" alt="" v-if="avator">
                            <span class="userInfo">{{item.userName}}</span>
                        </div>
                        <div class="discuss-info" :style="oWidth">
                            <div class="text" v-html="item.text">
                            </div>
                            <div class="footer">
                                <span class="footer-date">{{item.date}}</span>
                                <div class="footerIcon">
                                    <i class="ivu-icon ivu-icon-share"></i>
                                    <i class="ivu-icon ivu-icon-compose"></i>
                                    <i class="iconfont icon-dianzan2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="remark">
                        <i class="iconfont icon-dianzan2" :class="{'iconColor' : item.isFab}"></i>
                        <a href="">{{item.fabMsg}}</a><br>
                        <div class="remarkList" v-for="(comm, index) in item.commList">
                          <span class="remarkName">{{comm.commUserName}}: </span>
                          <span class="remarkInfo">{{comm.commText}}</span><br>
                        </div>
                        
                        <Input v-model="remarkInfo" placeholder="评论" style="width: 200px"></Input>
                        <Button type="success" @click="remarkDiscuss(index)">发送</Button>
                    </div>
                </Card>
            </div>
            <div class="noData" v-else>
                <span>暂无数据</span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import { Card, Icon, Button, Modal, Input, Message } from "iview";
Vue.prototype.$Message = Message;
export default {
  data() {
    return {
      discussList: {},
      showModalEdit: false,
      content: "",
      oHeight: {
        height: window.screen.height - 50 + "px"
      },
      oWidth: {
        width: window.screen.width - 40 + "px"
      }
    };
  },
  components: {
    BScroll,
    Card,
    Icon,
    Button,
    Modal,
    Input,
    Message
  },
  computed: {
    ...mapState(["avator"]),
    myDiscussShow() {
      if (this.discussList == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    axios
      .post("http://120.78.86.45/discuss/showUserDiscuss")
      .then(res => {
        console.log(res);
        
        this.discussList = res.data.discussMap;
      })
      .catch();
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
    editDiscuss() {
      this.showModalEdit = true;
    },
    deleteDiscuss(index) {
      axios
        .post("http://120.78.86.45/discuss/deleteDiscuss", {
          postId: this.discussList[index].id
        })
        .then(res => {
          if (res.data.isDelete) {
            this.discussList = res.data.discussMap;
            this.$Message.success(res.data.message);
          }
        });
    },
    editOk() {
      axios
        .post("http://120.78.86.45/discuss/create", {
          content: this.content
        })
        .then(res => {
          if (res.data.id) {
            this.$Message.success("发布成功");
          }
        })
        .catch();
      this.showModalEdit = false;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
/* header-wrapper */
.my-discuss .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
  height: 50px;
  padding: 10px 0;
}
.my-discuss .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  right: 10px;
}
.my-discuss .down-wrapper .del-btn {
  position: absolute;
  top: 10px;
  right: 15px;
}
.my-discuss .ivu-modal-content .ivu-btn {
  background-color: #1cbe99;
  border-color: #1cbe99;
  color: #fff;
}
.my-discuss .ivu-input-wrapper .ivu-input:hover {
  border-color: #1cbe99;
}
.my-discuss .down-wrapper {
  overflow: hidden;
}
.my-discuss .down-wrapper .content {
  padding: 20px 0;
}
.my-discuss .down-wrapper .content .ivu-card {
  margin: 0 20px;
  border-radius: 0;
}
.my-discuss .down-wrapper .content .ivu-card-bordered {
  border: none;
  border-bottom: 1px solid rgba(201, 201, 201, 0.6);
}
.my-discuss .down-wrapper .content :last-child {
  border: none;
}
.my-discuss .down-wrapper .content .ivu-card-body {
  display: flex;
  flex-direction: column;
  padding: 16px 0 4px;
}
.my-discuss .down-wrapper .content .ivu-card-body .up {
  display: flex;
  flex-direction: column;
  padding: 0 0 4px;
}
.my-discuss .down-wrapper .content :first-child .ivu-card-body {
  padding: 0 0 5px;
}
.my-discuss .iconColor {
  color: #1cbe99;
}
.my-discuss .down-wrapper .content .ivu-card-body img {
  padding: 5px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid rgba(201, 201, 201, 0.6);
}
.my-discuss .down-wrapper .content .ivu-card-body .discuss-info {
  padding: 15px 10px 0;
}
.my-discuss .down-wrapper .content .ivu-card-body .avator-name {
  display: flex;
}
.my-discuss .down-wrapper .content .ivu-card-body .userInfo {
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 15px;
  color: #1cbe99;
}
.my-discuss .down-wrapper .content .ivu-card-body .text {
  min-height: 80px;
  min-width: 250px;
  word-wrap: break-word;
  word-break: normal;
  white-space: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-discuss pre {
  margin: 0;
}
/* footer */
.my-discuss .down-wrapper .content .footer {
  display: flex;
  justify-content: space-between;
}
.my-discuss .down-wrapper .content .footer .footer-date {
  display: flex;
  align-items: center;
  font-size: 10px;
}
.my-discuss .down-wrapper .content .footer .footerIcon * {
  padding-right: 10px;
  font-size: 20px;
}
.my-discuss .down-wrapper .content .footer .footerIcon :last-child {
  padding-right: 0;
  font-weight: 500;
}

/* remark */
.my-discuss .down-wrapper .content .remark {
  border-top: 1px solid rgba(201, 201, 201, 0.2);
  width: 100%;
}
.my-discuss .down-wrapper .content .remark i {
  font-size: 14px;
}
.my-discuss .down-wrapper .content .remark a {
  font-size: 12px;
}
.my-discuss .down-wrapper .content .remark .remarkList {
  font-size: 12px;
}
.my-discuss .down-wrapper .content .remark .remarkList .remarkName {
  color: #2d8cf0;
}
.my-discuss .down-wrapper .content .remark .remarkList .remarkInfo {
}
.my-discuss .down-wrapper .content .ivu-input {
  background-color: rgb(221, 218, 218, 0.7);
}

.my-discuss .down-wrapper .noData {
  display: flex;
  justify-content: center;
}
.my-discuss .down-wrapper .noData span {
  display: block;
  position: absolute;
  font-size: 15px;
  width: 15px;
  top: 200px;
}
</style>
