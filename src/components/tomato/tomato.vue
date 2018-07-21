<template>
    <div class="tomato">
        <div class="picture">
            <xCircle :percent="percent" :stroke-color="color">
                <Icon v-if="percent == 100" type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
                <span v-else style="font-size:24px">{{ percent }}%</span>
            </xCircle>
            <ButtonGroup size="large">
                <Button icon="ios-plus-empty" @click="add"></Button>
                <Button icon="ios-minus-empty" @click="minus"></Button>
            </ButtonGroup>
        </div>
        <br>
        <span>剩余时间</span>
        <br>
        <i-button type="primary">完成</i-button>
        <hr>
        <div class="list">
            <ul>
                <li v-for="(item, index) in tomatoTodo">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
    
    
</template>

<script>
import { Button, Circle, ButtonGroup, Icon } from "iview";

export default {
  data() {
    return {
      tomatoTodo: [
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd",
        "asdasddasdasasdasdasd"
      ],
      percent: 0
    };
  },
  components: {
    Button,
    xCircle: Circle,
    ButtonGroup,
    Icon
  },
  computed: {
    color() {
      let color = "#2db7f5";
      if (this.percent == 100) {
        color = "#5cb85c";
      }
      return color;
    }
  },
  methods: {
    add() {
      if (this.percent >= 100) {
        return false;
      }
      this.percent += 10;
    },
    minus() {
      if (this.percent <= 0) {
        return false;
      }
      this.percent -= 10;
    }
  }
};
</script>

<style>
.tomato .picture img {
  display: block;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: aquamarine;
  border: 1px solid #aaa;
}
</style>
