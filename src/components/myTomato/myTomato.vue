<template>
<div class="my-tomato">
    <div class="down-wrapper" ref="downWrapper">
        <div class="content-out">
            <div class="content">
                <span>累计数据</span>
                <div class="showDate">
                    <div class="left">
                        番茄个数
                    </div>
                    <div class="right">
                        累计时长
                    </div>
                </div>
                
                <span>当日数据</span>
                <div class="showDate">
                    <div class="left">
                        番茄个数
                    </div>
                    <div class="right">
                        累计时长
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import { Card } from "iview";
export default {
  components: {
    Card
  }
};
</script>

<style>
.my-tomato .down-wrapper {
  height: 260px;
  overflow: hidden;
  background: linear-gradient(to bottom, #e2e2e2, #c0c0c0);
}
.my-tomato .down-wrapper .content-out {
  padding: 20px 0 60px;
}
.my-tomato .down-wrapper .content-out .content {
  background: #fff;
  margin: 0 20px 20px;
}
.my-tomato .down-wrapper .showDate {
  display: flex;
  font-size: 15px;
  height: 100px;
  justify-content: space-around;
}
.my-tomato .down-wrapper .showDate div {
  background: #acd;
  width: 50%;
  border: 1px solid #ddc;
}
.my-tomato .down-wrapper .historyCard .showDate-body {
  padding: 0;
}
</style>
