<template>
    <div class="discuss">
        <div class="header-wrapper">
            <Button class="close-btn" type="text" @click="editDiscuss">发布</Button>
            <Modal v-model="showModalEdit" width="360" :styles="{top: '20px'}">
                <p slot="header" style="color:#1cbe99; text-align:center">
                    <Icon type="edit"></Icon>
                    <span>发布交流</span>
                </p>
                <div style="text-align:center">
                    <Input v-model="content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="分享你的生活..."></Input>
                </div>
                <div slot="footer">
                    <Button size="large" long @click="editOk">发布</Button>
                </div>
            </Modal>
        </div>
        <div class="down-wrapper" ref="downWrapper" :style="oHeight">
            <div class="content" v-if="discussShow">
                <Card v-for="(item, index) in discussList" :key="index">
                    <div class="left">
                        <img :src="avator" alt="" v-if="avator">
                    </div>

                    <div class="right" :style="oWidth">
                        <span class="userInfo">{{item.userName}}</span>
                        <div class="text" v-html="item.text">
                        </div>
                        <div class="footer">
                            <span class="footer-date">{{item.date}}</span>
                            <div class="footerIcon">
                              <i class="ivu-icon ivu-icon-share"></i>
                              <i class="ivu-icon ivu-icon-compose"></i>
                              <i class="iconfont icon-dianzan2" :style="iconColor" @click="thumbDiscuss(index)"></i>
                            </div>
                        </div>
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
        height: window.screen.height - 100 + "px"
      },
      oWidth: {
        width: window.screen.width - 80 + "px",
      },
      iconColor: {
        color: "#495060"
      }
    };
  },
  computed: {
    ...mapState(["avator"]),
    replaceContent() {
      let str = this.content;
      // 限制最多2次换行
      str = str.replace(/((\s|&nbsp;)*\r?\n){3,}/g, "\r\n\r\n");
      // 清除开头换行
      str = str.replace(/^((\s|&nbsp;)*\r?\n)+/g, "");
      // 清除结尾换行
      str = str.replace(/((\s|&nbsp;)*\r?\n)+$/g, "");
      return str;
    },
    discussShow() {
      if (this.discussList == "") {
        return false;
      } else {
        return true;
      }
    }
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
      .post("http://120.78.86.45/discuss/showDiscussList")
      .then(res => {
        if (res.status === 200) {
          this.discussList = res.data.discussList;
        }
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
      this.content = "";
      this.showModalEdit = true;
    },
    editOk() {
      if (this.replaceContent != "") {
        axios
          .post("http://120.78.86.45/discuss/create", {
            content: this.replaceContent
          })
          .then(res => {
            if (res.status === 200) {
              this.discussList = res.data.discussList;
              this.$Message.success("发布成功");
            }
          })
          .catch();
        this.showModalEdit = false;
      } else {
        this.$Message.error("内容不能为空");
      }
    },
    thumbDiscuss(index) {
      axios
        .post("http://120.78.86.45/discuss/like", {
          postId: this.discussList[index].id
        })
        .then(res => {
          console.log(res);

          if (res.data.isChange) {
            this.discussList[index].fabCount = res.data.like;
            this.iconColor.color = "#1cbe99";
          } else {
            this.iconColor.color = "#495060";
          }
        })
        .catch();
    }
  }
};
</script>

<style>
.discuss .header-wrapper {
  background: #1cbe99;
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
  height: 50px;
  padding: 10px 0;
}
.discuss .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  left: 82%;
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
.discuss .down-wrapper .ivu-card {
  margin: 0 20px;
  border-radius: 0;
}
.discuss .down-wrapper .content .ivu-card-bordered {
  border: none;
  border-bottom: 1px solid rgba(201, 201, 201, 0.568);
}
.discuss .down-wrapper .content :last-child {
  border: none;
}
.discuss .down-wrapper .content .ivu-card-body {
  display: flex;
  padding: 16px 0 4px;
}
.discuss .down-wrapper .content :first-child .ivu-card-body {
  padding: 0 0 5px;
}
.discuss .down-wrapper .content .ivu-card-body .left img {
  padding: 5px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid rgba(201, 201, 201, 0.568);
}
.discuss .down-wrapper .content .ivu-card-body .right {
  padding: 5px 10px 0;
}
.discuss .down-wrapper .content .ivu-card-body .userInfo {
  font-size: 15px;
  color: #1cbe99;
}
.discuss .down-wrapper .content .ivu-card-body .text {
  min-height: 120px;
  min-width: 250px;
  padding-top: 10px;
  word-wrap: break-word;
  word-break: normal;
  white-space: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
pre {
  margin: 0;
}
.discuss .down-wrapper .content .footer {
  display: flex;
  justify-content: space-between;
}
.discuss .down-wrapper .content .footer .footer-date {
  display: flex;
  align-items: center;
  font-size: 10px;
}
.discuss .down-wrapper .content .footer .footerIcon * {
  padding-right: 10px;
  font-size: 20px;
}
.discuss .down-wrapper .content .footer .footerIcon :last-child {
  padding-right: 0;
  font-weight: 500;
}
.discuss .down-wrapper .noData {
  display: flex;
  justify-content: center;
}
.discuss .down-wrapper .noData span {
  display: block;
  position: absolute;
  font-size: 15px;
  width: 15px;
  top: 200px;
}
</style>
