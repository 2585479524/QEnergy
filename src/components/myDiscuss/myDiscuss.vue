<template>
    <div class="discuss">
        <div class="header-wrapper">
            <Button class="close-btn" type="text" @click="back">返回</Button>
        </div>

        <div class="down-wrapper" ref="downWrapper" :style="oHeight">
            <div class="content">
              <Card v-for="(item, index) in discussList" :key="index">
                  <Button class="delButton" type="ghost" shape="circle" icon="trash-a" @click.stop="deleteDiary(index)"></Button>
                  <div class="user">
                      <Icon type="ionic"></Icon>
                      <div class="userInfo">
                          <span class="userName">{{item.userName}}</span>
                          <span class="info">{{item.date}}</span>
                      </div>
                  </div>
                  <div class="text" >
                    <pre v-html="item.text"></pre>
                  </div>
                  <div class="footer">
                    <div class="footerIcon">
                        <Icon type="share"></Icon>
                        <span v-if="item.zhuan">{{item.zhuan}}</span>
                        <span v-else>转发</span>
                    </div>
                    <div class="footerIcon">
                        <Icon type="compose"></Icon>
                        <span v-if="item.ping">{{item.ping}}</span>
                        <span v-else>评论</span>
                    </div>
                    <div class="footerIcon" @click="thumbDiscuss(index)">
                        <Icon type="thumbsup"></Icon>
                        <span v-if="item.fabCount">{{item.fabCount}}</span>
                        <span v-else>赞</span>
                    </div>
                  </div>
              </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import axios from "axios";
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
  created() {
    axios
      .post("http://120.78.86.45/discuss/showUserDiscuss")
      .then(res => {
        this.discussList = res.data.discussList;
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
    deleteDiary(index) {
      axios
        .post("http://120.78.86.45/discuss/deleteDiscuss", {
          postId: this.discussList[index].id
        })
        .then(res => {
          if (res.data.isDelete) {
            this.discussList = res.data.discussList;
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
    thumbDiscuss(index) {
      axios
        .post("http://120.78.86.45/discuss/like", {
          postId: this.discussList[index].id
        })
        .then(res => {
          if (res.data.isChange) {
            this.discussList[index].fabCount = res.data.like;
          }
        })
        .catch();
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
/* header-wrapper */
.discuss .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
  height: 50px;
  padding: 10px 0;
}
.discuss .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  right: 10px;
}

.ivu-modal-content .ivu-btn {
  background-color: #1cbe99;
  border-color: #1cbe99;
  color: #fff;
}
.ivu-input-wrapper .ivu-input:hover {
  border-color: #1cbe99;
}
.discuss .down-wrapper {
  overflow: hidden;
}
.discuss .down-wrapper .content {
  padding: 20px 0;
}
.discuss .down-wrapper .delButton {
  position: absolute;
  top: 10px;
  right: 15px;
}
.discuss .down-wrapper .ivu-card {
  background-color: #f7f3f3;
  margin: 0 20px 20px;
}
.discuss .down-wrapper .ivu-card-body {
  padding: 0;
}
.discuss .down-wrapper .content .user {
  display: flex;
  padding: 10px 10px 0;
}
.discuss .down-wrapper .content .user i {
  font-size: 40px;
  margin-right: 10px;
}
.discuss .down-wrapper .content .userInfo {
  display: flex;
  flex-direction: column;
}
.discuss .down-wrapper .content .userInfo .info {
  font-size: 12px;
}
.discuss .down-wrapper .content .text {
  height: 80px;
  padding: 0 10px;
}
.discuss .down-wrapper .content .footer {
  display: flex;
  bottom: 10px;
  justify-content: space-around;
}
.discuss .down-wrapper .content .footer .footerIcon {
  display: inline-block;
  width: 33.3%;
  height: 25px;
  line-height: 24px;
  border-right: 1px solid #fff;
  background: #1cbe99;
  text-align: center;
  color: #fff;
}
.discuss .down-wrapper .content .footer :last-child {
  border: none;
}
</style>
