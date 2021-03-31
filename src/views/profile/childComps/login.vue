<template>
  <div class="login">
    <div class="login-left">
      <img src="~assets/img/profile/avatar.svg" alt />
      <div class="statu-box">
        <div class="login-box">
          <a href>
            <span>登录</span>
          </a>
          <span>/</span>
          <a href>
            <span>注册</span>
          </a>
        </div>
        <div class="phone-box">
          <img src="~assets/img/profile/phone.svg" alt />
          <span>暂无绑定手机号</span>
        </div>
      </div>
    </div>
    <div class="login-right">
      <img src="~assets/img/common/arrow-left.svg" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "login"
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 85px;
  background-color: var(--color-tint);
}

.login-left {
  padding-left: 12px;
  width: 70%;
  float: left;
}

.login-left > img {
  float: left;
  width: 70px;
  height: 70px;
}

.statu-box {
  width: 200px;
  height: 85px;
  padding: 15px 0px 0px 5px;
}

.login-left .login-box span{
  color: #fff;
  font-size: 16px;
  padding: 0px 2px;
}

.login-left .phone-box > img {
  position: relative;
  top: 7px;
  width: 20px;
  height: 20px;
  color: #fff;
}

.login-left .phone-box span {
  color: #fff;
  font-size: 13px;
}

.login-right {
  float: right;
  padding-top: 18px;
}

.login-right>img {
  width: 25px;
  height: 25px;
}
</style>