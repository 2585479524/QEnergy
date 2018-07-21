<template>
  <div id="app">
    
    <router-view/>


    <div class="tab">
      <div class="tab-item" >
        <router-link to="/tomato">
        <div class="icon"> 
          <img :src="imgUrl.tomato" alt="">
        </div>
        <span>番茄时钟</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/diary">
          <div class="icon"> 
            <img :src="imgUrl.diary" alt="">
          </div>
          <span>心情日记</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/bill">
          <div class="icon"> 
            <img :src="imgUrl.bill" alt="">
          </div>
          <span>账单统计</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/discuss">
        <div class="icon"> 
          <img :src="imgUrl.discuss" alt="">
        </div>
        <span>讨论交流</span>
        </router-link>
      </div>
      
      <div class="tab-item">
        <router-link to="/mine">
          <div class="icon"> 
            <img :src="imgUrl.mine" alt="">
          </div>
          <span>我的主页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgUrl: {
        "tomato": "http://l.rebright.top/icon_tomato.png",
        "diary": "http://l.rebright.top/icon_diary.png",
        "bill": "http://l.rebright.top/icon_bill.png",
        "discuss": "http://l.rebright.top/icon_discuss.png",
        "mine": "http://l.rebright.top/icon_mine.png",
      }
    }
  }
}
</script>

<style>
#app .tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
#app .tab .tab-item {
  flex: 1;
  text-align: center;
}
#app .tab .tab-item .icon {
  padding-left: 10px;
  width: 50px;
  height: 50px;
}
#app .tab .tab-item a {
  /* 技巧，点击a标签，用block可以使其自动充满整个盒子 */
  display: block;
  text-decoration: none;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
#app .tab .tab-item .active {
  font-weight: 700
}
</style>
