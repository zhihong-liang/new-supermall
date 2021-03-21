<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-buttom class="button"
                    :is-checked="isSelectAll"
                    @click.native="AllselectClick">
      </check-buttom>
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算：{{checkLength}}
    </div>
  </div>
</template>
<script>
import CheckButtom from "components/content/checkButton/CheckButton";

import { mapGetters } from 'vuex'

// @click.native="selectAll"

export default {
  name: "ShopcartBottomBar",
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
    isSelectAll() {
      if(this.cartList.length === 0)  return false;

      // 1.使用 filter
      // return !this.cartList.filter(() => {return !this.cartList.checked}).length

      // 2.使用 find
      return !this.cartList.find(item => {return item.checked === false})

      // 3.普通遍历
      // for(let item of this.cartList) {
      //   if(item.checked === false) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    AllselectClick() {
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(this.cartList.find(item => {return item.checked === true})){
        this.$toast.show('现在前去结账~')
      } else {
        this.$toast.show('请选择商品')
      }
    }
    // selectAll() {
    //   for(let i in this.cartList) {
    //     this.cartList[i].checked = true;
    //   }
    //   this.ischecked = true
    // }
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