<template>
    <div class="mine">
        <div class="header-wrapper">
            <Avatar icon="person"></Avatar>
            <span class="userName">{{userName}}</span>
        </div>
        <div class="down-wrapper" ref="downWrapper" :style="oHeight">
            <div class="content-out">
                <div class="content">
                    <Card class="historyCard" v-for="(item, index) in mineContent" :key="index" @click.native="showAna(item)">
                        <span>{{item}}</span>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import { Card, Icon, Avatar } from "iview";
import {mapState, mapMutations} from 'vuex';
export default {
  data() {
    return {
      mineContent: {
        myTomato: "我的番茄",
        myDiary: "日记回收站",
        myBill: "账单汇总",
        myDiscuss: "我的讨论",
        about: "关于",
        exitApp: "退出"
      },
      oHeight: {
        height: window.screen.height - 200 + "px"
      }
    };
  },
  components: {
    BScroll,
    Card,
    Icon,
    Avatar
  },
  computed: {
    ...mapState(['userName'])
  },
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
    },
    showAna(name) {
      let url = "";
      if (name == "我的番茄") {
        url = "/myTomato";
      } else if (name == "日记回收站") {
        url = "/myDiary";
      } else if (name == "账单汇总") {
        url = "/myBill";
      } else if (name == "我的讨论") {
        url = "/myDiscuss";
      } else if (name == "退出") {
        window.localStorage.clear();
        url = "/";
      }
      this.$router.push(url);
    }
  }
};
</script>

<style>
/* header-wrapper */
.mine .header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
  background: #1cbe99;
}
.mine .header-wrapper .ivu-avatar {
  font-size: 40px;
  line-height: 70px;
  margin: 30px 10px 10px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
}
.mine .header-wrapper .userName {
  font-size: 20px;
  color: #fff;
}
/* 统计列表 */
.mine .down-wrapper {
  overflow: hidden;
}
.mine .down-wrapper .content-out {
  padding: 20px 0;
}
.mine .down-wrapper .ivu-card {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 0 20px 20px;
  border-radius: 0;
  background: #1cbe99;
  border-color: #1cbe99;
  font-size: 15px;
  color: #fff;
}
.mine .down-wrapper .historyCard .ivu-card-body {
  padding: 0;
}
</style>
