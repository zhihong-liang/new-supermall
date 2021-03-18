<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-buttom class="button"
                    @click.native="selectAll"
                    :isChecked="ischecked"></check-buttom>
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate">
      去计算：{{checkLength}}
    </div>
  </div>
</template>
<script>
import CheckButtom from "components/content/checkButton/CheckButton";

import { mapGetters } from 'vuex'

export default {
  name: "ShopcartBottomBar",
  data() {
    return {
      ischecked: false
    }
  },
  components: {
    CheckButtom,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
  },
  methods: {
    selectAll() {
      for(let i in this.cartList) {
        this.cartList[i].checked = true;
      }
      this.ischecked = true
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: relative;

  background-color: #eee;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
}

.button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0px 5px;
}
.price {
  margin-left: 10px;
}

.calculate {
  margin-left: auto;
  background-color: orange;
  color: #fff;
  padding: 0px 5px;
}
</style>