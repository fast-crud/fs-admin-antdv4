import { createRouter, createWebHashHistory } from "vue-router";
// 进度条
import "nprogress/nprogress.css";
import { routes } from "./resolve";
import { createRouterGuard } from "/@/router/guard";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
//
// /**
//  * 路由拦截
//  */
// router.beforeEach(async (to, from, next) => {
//   // 进度条
//   NProgress.start();
//   // 修复三级以上路由页面无法缓存的问题
//   if (to.matched && to.matched.length > 2) {
//     to.matched.splice(1, to.matched.length - 2);
//   }
//   // 验证当前路由所有的匹配中是否需要有登录验证的
//   if (
//     to.matched.some((r) => {
//       return r.meta?.auth || r.meta?.permission;
//     })
//   ) {
//     const userStore = useUserStore();
//     // 这里暂时将cookie里是否存有token作为验证是否登录的条件
//     // 请根据自身业务需要修改
//     const token = userStore.getToken;
//     if (token) {
//       next();
//     } else {
//       // 没有登录的时候跳转到登录界面
//       // 携带上登陆成功之后需要跳转的页面完整路径
//       next({
//         name: "login",
//         query: {
//           redirect: to.fullPath
//         }
//       });
//       // https://github.com/d2-projects/d2-admin/issues/138
//       NProgress.done();
//     }
//   } else {
//     // 不需要身份校验 直接通过
//     next();
//   }
// });
//
// router.afterEach((to: any) => {
//   // 进度条
//   NProgress.done();
//   // 多页控制 打开新的页面
//   const pageStore = usePageStore();
//   // for (const item of to.matched) {
//   //   pageStore.keepAlivePush(item.name);
//   // }
//   pageStore.open(to);
//   // 更改标题
//   site.title(to.meta.title);
//
//   //修改左侧边栏
//   const matched = to.matched;
//   if (matched.length > 0) {
//     const resourceStore = useResourceStore();
//     resourceStore.setAsideMenuByCurrentRoute(matched);
//   }
// });

createRouterGuard(router);
export default router;
