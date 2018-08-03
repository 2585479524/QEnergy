<template>
<div class="footer">
    <router-view/>
    
    <div class="tab">
        <div class="tab-item" >
          <router-link to="/footer/tomato">
            <img :src="imgUrl.tomato" class="icon">
          <span class="text">番茄时钟</span>
          </router-link>
        </div>
        
        <div class="tab-item">
          <router-link to="/footer/diary">
              <img :src="imgUrl.diary" class="icon">
            <span class="text">心情日记</span>
          </router-link>
        </div>
        
        <div class="tab-item">
          <router-link to="/footer/bill">
              <img :src="imgUrl.bill" class="icon">
            <span class="text">账单统计</span>
          </router-link>
        </div>
        
        <div class="tab-item">
          <router-link to="/footer/discuss">
            <img :src="imgUrl.discuss" class="icon">
          <span class="text">讨论交流</span>
          </router-link>
        </div>
        
        <div class="tab-item">
          <router-link to="/footer/mine">
              <img :src="imgUrl.mine" class="icon">
            <span class="text">我的主页</span>
          </router-link>
        </div>
      </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: {
        tomato: "http://l.rebright.top/icon_tomato.png",
        diary: "http://l.rebright.top/icon_diary.png",
        bill: "http://l.rebright.top/icon_bill.png",
        discuss: "http://l.rebright.top/icon_discuss.png",
        mine: "http://l.rebright.top/icon_mine.png"
      }
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.tab {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  background-color: #fff;
  justify-content: space-around;
}
.tab .tab-item .icon {
  display: block;
  margin: 0 auto;
  width: 25px;
  height: 25px;
  border: 0;
}
.tab .tab-item .text {
  text-decoration: none;
  font-size: 10px;
  color: rgb(77, 85, 93);
}

#app .tab .tab-item .active {
  color: aquamarine;
  font-weight: 700;
}
</style>
