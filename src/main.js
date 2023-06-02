import { createApp } from 'vue';
import App from './App.vue';
import { createGtag } from 'vue-gtag';

const app = createApp(App);

const options = {
  property: {
    id: 'G-TM9FT02FW3', // 替换为您的 GA 跟踪ID
  },
  debug: true, // 可选，以启用调试模式
};

// 使用 createGtag 函数将 vue-gtag 插件添加到应用程序
app.use(createGtag, options);

app.mount('#app');