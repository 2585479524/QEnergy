<template>
    <div class="discuss">
        <div class="down-wrapper" ref="downWrapper">
            <div class="content-out">
                <div class="content">
                    <Card class="historyCard" v-for="(item, index) in 5" :key="index">
                        <div class="user">
                            <Icon type="ionic"></Icon>
                            <div class="userInfo">
                                <span class="userName">用户名</span>
                                <span class="info">我是用户</span>
                            </div>
                        </div>
                        <div class="text">
                            adsjklasdlkhnjasd
                        </div>
                        <div class="footer">
                            <div class="footerIcon">
                              <Icon type="share"></Icon>
                              转发20
                            </div>
                            <div class="footerIcon">
                              <Icon type="compose"></Icon>
                              评论5
                            </div>
                            <div class="footerIcon">
                              <Icon type="thumbsup"></Icon>
                              点赞70
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import { Card, Icon } from "iview";
export default {
  data() {
    return {};
  },
  components: {
    BScroll,
    Card,
    Icon
  },
  computed: {},
  created() {
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
    }
  }
};
</script>

<style>
.discuss .down-wrapper {
  height: 570px;
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
