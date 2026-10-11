import preferences from "./vben/preferences";
import ui from "./vben/ui";
import vben from "./vben";
//注意： @符号是保留字符，需要用{'@'}替换
export default {
  app: { crud: { i18n: { name: "name", city: "city", status: "status" } } },
  fs: {
    rowHandle: {
      title: "Operation"
    }
  },
  ...vben
};
