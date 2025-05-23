import type { Router } from "vue-router";

import { DEFAULT_HOME_PATH, LOGIN_PATH } from "/@/vben/constants";
import { preferences } from "/@/vben/preferences";
import { useAccessStore } from "/@/vben/stores";
import { generateMenus, startProgress, stopProgress } from "/@/vben/utils";
import { useUserStore } from "/@/store/modules/user";
import { frameworkRoutes } from "/@/router/resolve";

/**
 * 通用守卫配置
 * @param router
 */
export function setupCommonGuard(router: Router) {
  // 记录已经加载的页面
  const loadedPaths = new Set<string>();

  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // 页面加载进度条
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // 记录页面是否加载,如果已经加载，后续的页面切换动画等效果不在重复执行

    loadedPaths.add(to.path);

    // 关闭页面加载进度条
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    if (to.matched && to.matched.length > 2) {
      to.matched.splice(1, to.matched.length - 2);
    }

    // 基本路由，这些路由不需要进入权限拦截
    const needAuth = to.matched.some((r) => {
      return r.meta?.auth || r.meta?.permission;
    });

    const accessStore = useAccessStore();
    if (needAuth) {
      if (!accessStore.accessToken) {
        // 没有访问权限，跳转登录页面
        if (to.fullPath !== LOGIN_PATH) {
          return {
            path: LOGIN_PATH,
            // 如不需要，直接删除 query
            query: to.fullPath === DEFAULT_HOME_PATH ? {} : { redirect: encodeURIComponent(to.fullPath) },
            // 携带当前跳转的页面，登录后重新跳转该页面
            replace: true
          };
        }
        return true;
      }
    }

    // 是否已经生成过动态路由
    if (!accessStore.isAccessChecked) {
      const accessibleMenus = await generateMenus(frameworkRoutes[0].children, router);
      accessStore.setAccessRoutes(frameworkRoutes);
      accessStore.setAccessMenus(accessibleMenus);
      accessStore.setIsAccessChecked(true);
    }

    // 生成菜单和路由
    // const { accessibleMenus, accessibleRoutes } = await generateAccess({
    //   roles: [],
    //   router,
    //   // 则会在菜单中显示，但是访问会被重定向到403
    //   routes: accessRoutes
    // });
    //
    // // 保存菜单信息和路由信息
    // accessStore.setAccessMenus(accessibleMenus);
    // accessStore.setAccessRoutes(accessibleRoutes);

    // const redirectPath = (from.query.redirect ?? (to.path === DEFAULT_HOME_PATH ? DEFAULT_HOME_PATH : to.fullPath)) as string;
    //
    // return {
    //   ...router.resolve(decodeURIComponent(redirectPath)),
    //   replace: true
    // };
    return true;
  });
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 通用 */
  setupCommonGuard(router);
  /** 权限访问 */
  setupAccessGuard(router);
}

export { createRouterGuard };
