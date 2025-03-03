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
import { util } from "/@/utils";
import { initPreferences } from "/@/vben/preferences";
// @ts-ignore
async function bootstrap() {
  const app = createApp(App);
  app.use(Antd);
  await setupVben(app);
  app.use(router);
  app.use(i18n);
  // app.use(store);
  app.use(components);
  app.use(plugin, { i18n });

  const envMode = util.env.MODE;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${envMode}`;

  // app偏好设置初始化
  await initPreferences({
    namespace,
    overrides: {
      app: {
        name: import.meta.env.VITE_APP_TITLE
      }
    }
  });

  app.mount("#app");
}

bootstrap();
