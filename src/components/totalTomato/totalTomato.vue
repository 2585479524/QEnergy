<template>
<div class="total-tomato">
    <span class="title">{{name}}</span>
    <div class="showDate">
        <div class="left">
            <span class="name">番茄个数</span>
            <span class="count">{{count}}</span>
        </div>
        <div class="right">
            <span class="name">累计时长</span>
            <span class="count">{{duration}}<span class="pi">分钟</span></span>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
  props: ['name', 'count', 'duration'],
};
</script>

<style>
.total-tomato {
    margin: 10px 20px;
}
.total-tomato .showDate {
  display: flex;
  font-size: 15px;
  height: 80px;
  justify-content: space-around;
  border-radius: 5px;
  background: rgba(87, 231, 183, 0.3);
}

.total-tomato .title {
  display: block;
  padding: 3px 0;
  font-size: 14px;
}
.total-tomato .showDate .left,
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.total-tomato .showDate .name {
  text-align: center;
  font-size: 13px;
}
.total-tomato .showDate .count {
  display: block;
  position: relative;
  font-size: 25px;
  text-align: center;
}
.total-tomato .showDate .pi {
  font-size: 10px;
  padding: 3px;
}
</style>
