import LayoutBasic from "/@/layout/layout-basic.vue";

import type { RouteRecordRaw } from "vue-router";

import { mergeRouteModules } from "/@/vben/utils";

const dynamicRouteFiles = import.meta.glob("./modules/**/*.ts", {
  eager: true
});

/** 动态路由 */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

export const frameworkResource = [
  {
    title: "框架",
    name: "root",
    path: "/",
    redirect: "/index",
    component: LayoutBasic,
    meta: {
      icon: "ion:accessibility",
      hideInBreadcrumb: true
    },
    children: [
      {
        title: "首页",
        name: "index",
        path: "/index",
        component: "/framework/home/index.vue",
        meta: {
          fixedAside: true,
          showOnHeader: false,
          icon: "ion:home-outline",
          auth: true
        }
      },
      ...dynamicRoutes
    ]
  }
];
console.assert(frameworkResource.length === 1, "frameworkResource数组长度只能为1，你只能配置framework路由的子路由");
