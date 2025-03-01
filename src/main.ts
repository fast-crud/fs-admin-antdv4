import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "./style/common.less";
import i18n from "./i18n";
import components from "./components";
import router from "./router";
import store from "./store";
import plugin from "./plugin/";
// 正式项目请删除mock，避免影响性能
import "./mock";
import { setupVben } from "./vben";
// @ts-ignore
async function bootstrap() {
  const app = createApp(App);
  app.use(Antd);
  app.use(router);
  app.use(i18n);
  app.use(store);
  app.use(components);
  app.use(plugin, { i18n });
  await setupVben(app);
  app.mount("#app");
}

bootstrap();
