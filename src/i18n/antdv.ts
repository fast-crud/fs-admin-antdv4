import { ref } from "vue";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import dayjs from "dayjs";
export const antdvLocale = ref(zhCN);

export async function setAntdvLocale(value: string) {
  console.log("locale changed:", value);
  if (value.startsWith("zh")) {
    dayjs.locale("zh-cn");
    antdvLocale.value = zhCN;
  } else {
    dayjs.locale("en");
    antdvLocale.value = enUS;
  }
}
