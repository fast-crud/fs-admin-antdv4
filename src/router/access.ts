import type { ComponentRecordType, GenerateMenuAndRoutesOptions } from "/@/vben/types";

import { generateAccessible } from "/@/vben/access";
import { preferences } from "/@/vben/preferences";

import { BasicLayout, IFrameView } from "/@/vben/layouts";

const forbiddenComponent = () => import("#/views/_core/fallback/forbidden.vue");

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob("../views/**/*.vue");

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView
  } as any;

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    // fetchMenuListAsync: async () => {
    //   message.loading({
    //     content: `${$t("common.loadingMenu")}...`,
    //     duration: 1.5
    //   });
    //   return await getAllMenusApi();
    // },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap
  });
}

export { generateAccess };
