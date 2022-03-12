<template>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component
				:is="Component"
				:key="$route.name"
				v-if="$route.meta.keepAlive"></component>
		</keep-alive>
		<component
			:is="Component"
			:key="$route.name"
			v-if="!$route.meta.keepAlive"></component>
	</router-view>
</template>

<!-- <script>
import api from '@/api';
import { isLocal } from '@/utils/util';

let vm = null;

export default {
  created () {
    // 只能在企信UA中打开
    this.isQX();
    // 这里需要进行企信SDK初始化动作，继而关闭右上角菜单
    this.initQX();
    // 校验客户信息不是走的cookie，而是一个主动上送的参数p1，该参数在LS中存了一份，进来先拿到store中
    this.initUserInfo();

    vm = this;
  },
  mounted () {
    // 应用级PV统计,延迟是因为sensors有可能还没初始化好
    setTimeout(() => {
      this.$sensors && this.$sensors.appPv();
    }, 500);
  },
  methods: {
    isQX () {
      const ua = window.navigator.userAgent;
      if (ua.indexOf('MicroMessenger') === -1 || ua.indexOf('wxwork') === -1) {
        window.location.href = 'about:blank';
      }
    },
    initQX () {
      // 如果是本地开发中，不需要企信初始化了
      if (!isLocal()) {
        api.getWxConfigParams().then(this.wxConfig);
      }
    },
    wxConfig (res) {
      window.wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，企业微信的corpID
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: [ // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          'hideOptionMenu', // 隐藏菜单
          'getNetworkType' // 获取网络状态
        ]
      });
      window.wx.ready(() => {
        window.wx.hideOptionMenu();
        window.wx.getNetworkType({
          success: res => {
            vm.$store.commit('updateNetworkType', res.networkType); // 返回网络类型2g，3g，4g，wifi
          }
        });
      });
      window.wx.error(err => {
        console.warn(err);
      });
    },
    // 该方法是因为目前重构是不彻底的，导致需要跳转一些外链，以及需要考虑跳回来后信息不能丢失，所以需要依赖LS，以后尽可能都去掉
    initUserInfo () {
      // 上次的userToken，不一定能用
      // const userToken = window.localStorage.getItem('ibs-qx-current-user-token');
      // if (userToken) {
      //   this.$store.commit('updateUserToken', userToken);
      // }
      // 还有一些可能用到的信息
      const qxUserId = window.localStorage.getItem('ibs-qx-current-user-id');
      if (qxUserId) {
        this.$store.commit('updateQxUserId', qxUserId);
      }
      const userInfo = window.localStorage.getItem('user-info');
      if (userInfo) {
        this.$store.commit('updateUserInfo', JSON.parse(userInfo));
      }
      // 老系统的登录信息保存在该user-info的p1属性中，只能先从这里获取
      if (userInfo && userInfo.p1) {
        this.$store.commit('updateUserToken', userInfo.p1);
      }

      const userId = window.localStorage.getItem('ibs-qx-current-userId');
      if (userId) {
        this.$store.commit('updateUserId', userId);
      }
    }
  }
};
</script> -->

<style>
#app {
	width: 100%;
	padding: 0;
}
</style>
