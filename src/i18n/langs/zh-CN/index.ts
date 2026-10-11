import vben from "./vben";
// @ts-ignore
//注意： @符号是保留字符，需要用{'@'}替换
export default {
  app: {
    crud: { i18n: { name: "姓名", city: "城市", status: "状态" } },
    login: {
      logoutTip: "确认",
      logoutMessage: "确定要注销登录吗？"
    }
  },
  fs: {
    rowHandle: {
      title: "操作列"
    }
  },
  ...vben
};
