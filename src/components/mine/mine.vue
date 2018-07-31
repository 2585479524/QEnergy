<template>
    <div class="mine">
        <div class="avatar">
            <div class="avatar-in">
                <Avatar icon="person"></Avatar>
                <span class="userName">用户名</span>
            </div>
        </div>
        <div class="down-wrapper" ref="downWrapper">
            <div class="content-out">
                <div class="content">
                    <Card class="historyCard" v-for="(item, index) in mineContent" :key="index" @click.native.self="showAna(item)">
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
export default {
  data() {
    return {
      mineContent: {
        myTomato: "我的番茄",
        myDiary: "日记时光轴",
        myBill: "账单汇总",
        myDiscuss: "我的讨论",
        about: "关于",
        exitApp: "退出"
      }
    };
  },
  components: {
    BScroll,
    Card,
    Icon,
    Avatar
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
    },
    showAna(name) {
      console.log(this.$router);
      let url = "";
      if (name == "我的番茄") {
        url = "/myTomato";
      } else if (name == "日记时光轴") {
        url = "/myDiary";
      } else if (name == "账单汇总") {
        url = "/myBill";
      } else if (name == "我的讨论") {
        url = "/myDiscuss";
      } else if (name == "退出") {
        window.localStorage.clear();
        url = "/";
      }
      console.log(this.$router);

      this.$router.push(url);
    }
  }
};
</script>

<style>
.mine .avatar {
  display: flex;
  height: 150px;
  justify-content: center;
}
.mine .avatar .avatar-in {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.mine .avatar .ivu-avatar {
  font-size: 40px;
  line-height: 70px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
}
.mine .down-wrapper {
  height: 420px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.mine .down-wrapper .content-out {
  padding: 20px 0 60px;
}
.mine .down-wrapper .ivu-card {
  margin: 0 20px 20px;
  display: flex;
  font-size: 15px;
  padding: 10px;
  justify-content: center;
}
.mine .down-wrapper .historyCard .ivu-card-body {
  padding: 0;
}
</style>
