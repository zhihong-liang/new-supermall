<template>
  <div id="morefunction">
    <ul>
      <li>
        <div class="img-box">
          <img src="~assets/img/profile/message.svg" alt />
        </div>
        <p>我的消息</p>
      </li>
      <li>
        <div class="img-box">
          <img src="~assets/img/profile/shopping.svg" alt />
        </div>
        <p>积分商场</p>
      </li>
      <li class="exception">
        <div class="img-box">
          <img src="~assets/img/profile/vip.svg" alt />
        </div>
        <p>会员卡</p>
      </li>
      <li>
        <div class="img-box">
          <img src="~assets/img/profile/cart.svg" alt />
        </div>
        <p>我的购物车</p>
      </li>
      <li>
        <div class="img-box">
          <img src="~assets/img/profile/pointer.svg" alt />
        </div>
        <p>下载购物APP</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "MoreFunction"
};
</script>
<style scoped>
.morefunction {
  width: 100%;
}

ul > li {
  height: 45px;
  line-height: 35px;
}

ul > li > p {
  width: calc(100vw - 45px);
  line-height: 45px;
  float: left;
  height: 45px;
  font-size: 15px;
  border-bottom: 1px solid #e6e6e6;
}

.img-box {
  float: left;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
}

.img-box>img {
   width: 25px;
  height: 25px;
  position: relative;
  top: 5px;
}

.exception {
  height: 55px;
  border-bottom: 10px solid #e6e6e6;
}
</style>