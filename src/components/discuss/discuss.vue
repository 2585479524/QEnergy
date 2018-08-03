<template>
    <div class="discuss">
      <div class="header">
        <Button class="closeBtn" type="text" @click="editDiscuss">发布</Button>
        <Modal v-model="showModalEdit" width="360" :styles="{top: '20px'}">
            <p slot="header" style="color:#57a3f3; text-align:center">
                <Icon type="edit"></Icon>
                <span>发布讨论</span>
            </p>
            <div style="text-align:center">
                <Input v-model="content" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="分享你的生活..."></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="editOk">发布</Button>
            </div>
        </Modal>
      </div>
        <div class="down-wrapper" ref="downWrapper">
            <div class="content-out">
                <div class="content">
                    <Card class="historyCard" v-for="(item, index) in discussList" :key="index">
                        <div class="user">
                            <Icon type="ionic"></Icon>
                            <div class="userInfo">
                                <span class="userName">{{item.userName}}</span>
                                <span class="info">{{item.date}}</span>
                            </div>
                        </div>
                        <div class="text">
                            {{item.text}}
                        </div>
                        <div class="footer">
                            <div class="footerIcon">
                              <Icon type="share"></Icon>
                              转发(0)
                            </div>
                            <div class="footerIcon">
                              <Icon type="compose"></Icon>
                              评论(0)
                            </div>
                            <div class="footerIcon" @click="thumbDiscuss(index)">
                              <Icon type="thumbsup"></Icon>
                              点赞({{item.fabCount}})
                            </div>
                        </div>
                    </Card>
                </div>
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
      content: ""
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
      .post("http://120.78.86.45/discuss/showDiscussList")
      .then(res => {
        console.log(res);
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
    editOk() {
      axios
        .post("http://120.78.86.45/discuss/create", {
          content: this.content
        })
        .then(res => {
          console.log(res);
          
          if (res.data.id) {
            this.$Message.success("发布成功");
          }
        })
        .catch();
      this.showModalEdit = false;
    },
    thumbDiscuss(index) {
      console.log(this.discussList[index].fabCount);
      
      axios.post("http://120.78.86.45/discuss/like", {
        postId: this.discussList[index].id,
      }).then(res => {
        console.log(res);
        
        if (res.data.isChange) {
          this.discussList[index].fabCount = res.data.like;
        }
      }).catch()
    }
  }
};
</script>

<style>
.discuss .header {
  display: flex;
  justify-content: flex-end;
}
.discuss .down-wrapper {
  height: 585px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.discuss .down-wrapper .content-out {
  padding: 20px 0 60px;
}
.discuss .down-wrapper .ivu-card {
  margin: 0 20px 20px;
}
.discuss .down-wrapper .historyCard .ivu-card-body {
  padding: 0;
}
.discuss .down-wrapper .content-out .user {
  display: flex;
  padding: 10px 10px 0;
}
.discuss .down-wrapper .content-out .user i {
  font-size: 40px;
  margin-right: 10px;
}
.discuss .down-wrapper .content-out .userInfo {
  display: flex;
  flex-direction: column;
}
.discuss .down-wrapper .content-out .userInfo .info {
  font-size: 12px;
}
.discuss .down-wrapper .content-out .text {
  height: 80px;
  padding: 0 10px;
}
.discuss .down-wrapper .content-out .footer {
  display: flex;
  bottom: 10px;
  justify-content: space-around;
}
.discuss .down-wrapper .content-out .footer .footerIcon {
  display: inline-block;
  width: 33.3%;
  height: 24px;
  line-height: 24px;
  border-right: 1px solid #fff;
  background: rgb(4, 209, 148);
  text-align: center;
  color: #fff;
}
.discuss .down-wrapper .content-out .footer :last-child {
  border: none;
}
</style>
