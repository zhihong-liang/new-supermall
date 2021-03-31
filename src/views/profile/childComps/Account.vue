<template>
  <div id="account">
    <div class="accountItem">
      <h4>0.00</h4>
      <span>元</span>
      <h5 class="go-bottom">我的余额</h5>
    </div>
    <div class="accountItem">
      <h4>0</h4>
      <span>个</span>
      <h5 class="go-bottom">我的优惠</h5>
    </div>
    <div class="accountItem">
      <h4>0</h4>
      <span>分</span>
      <h5 class="go-bottom">我的积分</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "Account"
};
</script>
<style scoped>
#account {
  width: 100%;
  display: flex;
}

.accountItem {
  flex: 1;
  text-align: center;
  border-right: 1px solid #e6e6e6;
  border-bottom: 10px solid #e6e6e6;
}

.accountItem > h4 {
  display: inline;
  font-size: 25px;
  font-weight: bolder;
  color: orange;
  line-height: 70px;
}

.accountItem >h5 {
  position: relative;
  top: -13px;
}
</style>