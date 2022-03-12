import { createRouter, createWebHashHistory } from 'vue-router';

// import sensors from '@/util/sensors';

const routes = [
	{
		path: '/',
		redirect: {
			name: 'user',
		},
	},
	{
		path: '/user',
		name: 'user',
		component: () => import('@/pages/user/user.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

// 性能监控起始时机
// router.beforeEach(to => {
//   sensors.beforeEnterPage(to.name);
//   return true;
// });

export default router;
