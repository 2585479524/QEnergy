<template>
    <div class="about">
        <div class="header-wrapper">
            <Button class="close-btn" type="text" @click="closePage">取消</Button>
        </div>
        <div class="content-wrapper">
            <img class="pic" src="../../assets/img/teamlogo.png" alt="">
            <div class="text">
                <img class="school-logo" src="../../assets/img/schoollogo.png" alt="">
                <span class="team-name">QE 项目组</span>
                <span>前端：白晨琪、周宣锐</span>
                <span>后端：董悦、李广源、蒋润泽</span>
                <span>版权所有</span>
            </div>
            
        </div>
    </div>
</template>

<script>
import { Button } from "iview";
export default {
  components: {
    Button
  },
  methods: {
    closePage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.about .header-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 55px;
  background: #1cbe99;
  border-bottom: 1px solid rgba(28, 190, 153, 0.1);
}
.about .header-wrapper .close-btn {
  position: absolute;
  color: #fff;
  left: 82%;
}
.about .content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about .content-wrapper .pic {
  margin-top: 100px;
  height: 90px;
  width: 80px;
}
.about .content-wrapper .text {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}
.about .content-wrapper .text .school-logo {
  margin: 20px;
  height: 30px;
  width: 110px;
}.about .content-wrapper .text .team-name {
    font-size: 20px;
}
.about .content-wrapper .text span {
  padding: 10px;
}
.about .text {
  background-image: -webkit-linear-gradient(
    left,
    blue,
    #66ffff 10%,
    #cc00ff 20%,
    #cc00cc 30%,
    #ccccff 40%,
    #00ffff 50%,
    #ccccff 60%,
    #cc00cc 70%,
    #cc00ff 80%,
    #66ffff 90%,
    blue 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
  font-size: 35px;
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
