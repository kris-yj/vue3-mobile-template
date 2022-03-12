import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			loginInfo: {
				clientId: '',
				code: null,
				wechatUserId: null,
			},
			userToken: '',
			qxUserId: '',
			userInfo: {
				p1: '', // 同userToken
				deptName: '',
				jobNum: '',
				headImg: '',
				gender: null,
				passwd: '',
				deptId: null,
				userName: '',
				userId: null,
				simulate: false,
				groupName: '',
				rank: '',
				head: null,
			},
			networkType: '',
		};
	},
	mutations: {
		// updateUserInfo (state, userInfo) {
		//   state.userInfo = userInfo;
		//   state.userToken = userInfo.p1;
		// },
		// updateUserToken (state, userToken) {
		//   state.userToken = userToken;
		// },
		// updateQxUserId (state, qxUserId) {
		//   state.qxUserId = qxUserId;
		// },
		// updateUserId (state, userId) {
		//   state.userInfo.userId = userId;
		// },
		// updateNetworkType (state, networkType) {
		//   state.networkType = networkType;
		// }
	},
	actions: {},
	getters: {},
});

export default store;
