<template>
  <div class="footer">  
    <transition
    name="custom-classes-transition"
    enter-active-class="animated flipInY"
    enter-leave-class="animated flipOutY"
    :duration="{ enter: 500}">
      <router-view/>
    </transition>
    
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
import animate from "animate.css";
export default {};
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
  color: #1cbe99;
  text-align: center;
  font-size: 25px;
}
.tab .tab-item .text {
  text-decoration: none;
  font-size: 10px;
  color: #1cbe99;
}
#app .tab .tab-item .active {
  font-weight: 900;
}

</style>
