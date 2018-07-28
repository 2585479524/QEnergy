<template>
    <div class="bill-edit">
         <div class="switch">
             <Select v-model="showSwitch" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value" small>{{ item.label }}</Option>
            </Select>
            <Button class="closeBtn" type="text" @click="closeEdit">取消</Button>
         </div>

         <div class="show-wrapper" ref="showWrapper">
            <div class="content-out">
                <div class="content" v-for="(icons, index) in showIcon">
                    <div class="content-in" v-for="(icon, index) in icons">
                        <div class="iconGroup" @click="showCalculator(0)">
                            <div class="iconShowCode">
                                <i class="iconfont" :class="icon.iconCode"></i>
                            </div>
                            <span class="text">{{icon.iconName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <calculator class="calShow" v-show="calShow"></calculator>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import store from "../../store/store"
import calculator from "../calculator/calculator"
import BScroll from "better-scroll"
import { Button, Icon, Select, Option, Input, } from "iview"
export default {
  data() {
    return {
      cityList: [
        {
          value: "支出",
          label: "支出"
        },
        {
          value: "收入",
          label: "收入"
        }
      ],
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
            iconCode: "icon-gouwu1"
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
            iconCode: "icon-lvhangxiang-"
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
      ...mapState([
          "calShow"
      ]),
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
      this.showCalculator(1);
    });
  },
store,
  methods: {
      ...mapMutations([
          "showCalculator"
      ]),
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
@import url("//at.alicdn.com/t/font_765377_wa7cj0ab72l.css");
.bill-edit {
  position: relative;
}
.bill-edit .switch {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.bill-edit .switch .closeBtn {
  position: absolute;
  right: 10px;
}
.bill-edit .show-wrapper {
  height: 570px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.bill-edit .show-wrapper .content-out {
  padding: 20px 0 60px;
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
}.bill-edit .show-wrapper .content-out .content .iconGroup .iconShowCode {
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 35px;
    background: #4574db;
}
.bill-edit .show-wrapper .content-out .content .iconGroup i {
    font-size: 30px;
}
.bill-edit .show-wrapper .content-out .content .iconGroup .text{
    text-align: center;
}
.bill-edit .show-wrapper .content-out .content .option {
  width: 50px;
  height: 50px;
  margin: 20px 0;
  font-size: 30px;
}
.calShow {
  position: absolute;
  bottom: 0;
}
</style>
