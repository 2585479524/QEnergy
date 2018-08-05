<template>
  <div class="bill-edit">
      <div class="header-wrapper">
          <Select v-model="showSwitch" style="width:60px">
              <Option v-for="item in cityList" :value="item" :key="item" small>
                {{item}}
              </Option>
          </Select>
          <Button class="close-btn" type="text" @click="closeEdit">取消</Button>
      </div>

      <div class="show-wrapper" ref="showWrapper">
          <div class="content-out">
              <div class="content" v-for="(icons, index) in showIcon">
                  <div class="content-in" v-for="(icon, index) in icons">
                      <div class="iconGroup" @click="showCalculator({btnType: 0,icon: icon,billType: showSwitch})">
                          <div class="iconShowCode">
                              <i class="iconfont" :class="icon.iconCode"></i>
                          </div>
                          <span class="text">{{icon.iconName}}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <calculator class="cal-show" v-show="calShow"></calculator>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import store from "../../store/store";
import calculator from "../calculator/calculator";
import BScroll from "better-scroll";
import { Button, Icon, Select, Option, Input } from "iview";
export default {
  data() {
    return {
      cityList: ["支出", "收入"],
      showSwitch: "支出",
      money: 0,
      payIcon: [
        [
          {
            iconName: "餐饮",
            iconCode: "icon-icon-"
          },
          {
            iconName: "购物",
            iconCode: "icon-gouwu"
          },
          {
            iconName: "通信",
            iconCode: "icon-tongxun"
          },
          {
            iconName: "交通",
            iconCode: "icon-jiaotong"
          }
        ],
        [
          {
            iconName: "书籍",
            iconCode: "icon-iconset0116"
          },
          {
            iconName: "旅行",
            iconCode: "icon-lvxing"
          },
          {
            iconName: "学习",
            iconCode: "icon-xuexi"
          },
          {
            iconName: "住房",
            iconCode: "icon-zhufang"
          }
        ],

        [
          {
            iconName: "医疗",
            iconCode: "icon-yiliao"
          },
          {
            iconName: "水果",
            iconCode: "icon-shuiguo"
          },
          {
            iconName: "运动",
            iconCode: "icon-yundong"
          },
          {
            iconName: "居家",
            iconCode: "icon-jujia"
          }
        ],
        [
          {
            iconName: "宠物",
            iconCode: "icon-chongwu"
          },
          {
            iconName: "日常",
            iconCode: "icon-riyongpin"
          },
          {
            iconName: "办公",
            iconCode: "icon-bangong"
          },
          {
            iconName: "烟酒",
            iconCode: "icon-jiushuihongjiuhongjiubei"
          }
        ],
        [
          {
            iconName: "社交",
            iconCode: "icon-shejiao"
          },
          {
            iconName: "娱乐",
            iconCode: "icon-yule"
          },
          {
            iconName: "捐赠",
            iconCode: "icon-juanzeng"
          },
          {
            iconName: "修理",
            iconCode: "icon-weixiu"
          }
        ],
        [
          {
            iconName: "家人",
            iconCode: "icon-shouye"
          },
          {
            iconName: "美容",
            iconCode: "icon-meirong-heicopy"
          },
          {
            iconName: "长辈",
            iconCode: "icon-changbei"
          },
          {
            iconName: "快递",
            iconCode: "icon-kuaidi"
          }
        ],
        [
          {
            iconName: "孩子",
            iconCode: "icon-haizi"
          },
          {
            iconName: "礼物",
            iconCode: "icon-liwu"
          },
          {
            iconName: "服饰",
            iconCode: "icon-yifu"
          },
          {
            iconName: "科技",
            iconCode: "icon-shouji"
          }
        ]
      ],
      incomeIcon: [
        [
          {
            iconName: "工资",
            iconCode: "icon-gongzi"
          },
          {
            iconName: "兼职",
            iconCode: "icon-jianzhi"
          },
          {
            iconName: "彩票",
            iconCode: "icon-caipiao"
          },
          {
            iconName: "理财",
            iconCode: "icon-licaishouyi"
          }
        ]
      ]
    };
  },
  store,
  components: {
    Button,
    Icon,
    Select,
    Option,
    Input,
    calculator
  },
  computed: {
    ...mapState(["calShow"]),
    showIcon() {
      if (this.showSwitch == "支出") {
        return this.payIcon;
      } else if (this.showSwitch == "收入") {
        return this.incomeIcon;
      }
    }
  },
  created() {
    this.$nextTick(function() {
      this._initScroll();
      this.showCalculator({ btnType: 1 });
    });
  },
  store,
  methods: {
    ...mapMutations(["showCalculator"]),
    _initScroll() {
      this.showScroll = new BScroll(this.$refs.showWrapper, {
        probeType: 3,
        click: true
      });
    },
    closeEdit() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
/* @import url("//at.alicdn.com/t/font_765377_wa7cj0ab72l.css"); */
@import url("../../assets/iconfont.css");

.bill-edit {
  position: relative;
}
.bill-edit .header-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #1cbe99;
  border-bottom: 1px solid rgba(28, 190, 153, 0.1);
}
/* select按钮 */
.bill-edit .header-wrapper .ivu-select {
  color: #fff;
}
.bill-edit .header-wrapper .ivu-select-selection {
  border: 1px solid #fff;
}
.bill-edit .header-wrapper div {
  border-radius: 4px;
  background: #1cbe99;
}
.bill-edit .header-wrapper .ivu-select-item-selected,
.ivu-select-item-selected:hover {
  background: #1cbe99;
}
.bill-edit .header-wrapper .ivu-select-dropdown {
  border-radius: 0;
  background: #fff;
}
.bill-edit .header-wrapper .ivu-select-arrow {
  color: #fff;
}
.bill-edit .header-wrapper .close-btn {
  position: absolute;
  right: 10px;
}

/* show-wrapper */
.bill-edit .show-wrapper {
  height: 585px;
  overflow: hidden;
}
.bill-edit .show-wrapper .content-out {
  padding: 20px 0;
}
.bill-edit .show-wrapper .content-out .content {
  display: flex;
  justify-content: space-around;
}
.bill-edit .show-wrapper .content-out .content .iconGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
}
.bill-edit .show-wrapper .content-out .content .iconGroup .iconShowCode {
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 35px;
  background: #78cfa6;
}
.bill-edit .show-wrapper .content-out .content .iconGroup i {
  font-size: 30px;
  color: #fff;
}
.bill-edit .show-wrapper .content-out .content .iconGroup .text {
  text-align: center;
}
.cal-show {
  position: absolute;
  bottom: 0px;
}
</style>
