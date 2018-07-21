<template>
  <wxc-tab-bar :tab-titles="tabTitles" :tab-styles="tabStyles" title-type="icon" @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 番茄时钟 -->
    <div class="item-container" :style="contentStyle">
      <text>
        番茄
      </text>
    </div>
    <!-- 心情日记 -->
    <div class="item-container" :style="contentStyle">
      <text>Hot</text>
    </div>

    <!-- 账单统计 -->
    <div class="item-container" :style="contentStyle">
      <text>Message</text>
    </div>

    <!-- 讨论交流 -->
    <div class="item-container" :style="contentStyle">
      <text>My</text>
    </div>
    
    <!-- 我的主页 -->
    <div class="item-container" :style="contentStyle">
      <text>My</text>
    </div>
  </wxc-tab-bar>
</template>

<style scoped>
.item-container {
  width: 750px;
  background-color: #f2f3f4;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { WxcTabBar, Utils } from "weex-ui";

// https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js
import Config from "./config";

export default {
  components: { WxcTabBar },
  data: () => ({
    tabTitles: Config.tabTitles,
    tabStyles: Config.tabStyles,
  }),
  created() {
    const tabPageHeight = Utils.env.getPageHeight();
    // If the page doesn't have a navigation bar
    // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
    const { tabStyles } = this;
    this.contentStyle = { height: tabPageHeight - tabStyles.height + "px" };
  },
  methods: {
    wxcTabBarCurrentTabSelected(e) {
      const index = e.page;
      // console.log(index);
    }
  }
};
</script>