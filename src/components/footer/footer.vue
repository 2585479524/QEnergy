<template>
  <div class="footer">
    <router-view/>
    
    <div class="tab">
      <div class="tab-item" >
        <router-link to="/footer/tomato">
          <i class="iconfont icon-fanqie"></i>
          <span class="text">番茄时钟</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/footer/diary">
          <i class="iconfont icon-icon-test"></i>
          <span class="text">心情日记</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/footer/bill">
          <i class="iconfont icon-zhangdan1"></i>
          <span class="text">账单统计</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/footer/discuss">
          <i class="iconfont icon-quanzi"></i>
          <span class="text">讨论交流</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/footer/mine">
          <i class="iconfont icon-icon-test1"></i>
          <span class="text">我的主页</span>
        </router-link>
      </div>
  </div>
</div>
</template>

<script>
export default {
};
var oHeight = window.screen.height;

</script>

<style>
@import url("../../assets/iconfont.css");

.tab {
  padding: 0;
  height: 50px;
}
.tab .tab-item .iconfont {
  display: block;
  padding: 0;
  height: 30px;
  text-align: center;
  font-size: 25px;
}
.tab .tab-item .text {
  text-decoration: none;
  font-size: 10px;
  color: rgb(77, 85, 93);
}

#app .tab .tab-item .active {
  /* color: aquamarine; */
  font-weight: 700;
}
</style>
