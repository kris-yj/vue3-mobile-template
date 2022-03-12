import { createApp } from 'vue';
import App from './app.vue';
import '@/styles/index.css';
import router from '@/router';
import store from '@/store';
import '@/utils/http';

// import { Button } from 'vant';

const app = createApp(App);

app.use(router);
app.use(store);
// app.use(Button);

app.mount('#app');

// // 全局Vue JS错误收集，接口异常不会体现在这里
// app.config.errorHandler = globalVueErrorHandler;

// // 全局兜底异常处理
// window.onerror = globalErrorHandler;

// // 埋点工具注册,使用vm.$sensors即可
// app.config.globalProperties.$sensors = sensors;

// 用于非Vue上下文内调用router
// export function getRouter () {
//   return router;
// };

// // 用于非Vue上下文内调用store
// export function getStore () {
//   return store;
// };
