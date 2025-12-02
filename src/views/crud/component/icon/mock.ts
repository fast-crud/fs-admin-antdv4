import mockUtil from "/src/mock/base";
const options: any = {
  name: "ComponentIcon",
  idGenerator: 0
};
const list = [
  {
    icon: "ri:24-hours-fill:green",
    svg: "svg:icon-compass",
    http: "http:images/logo/logo.svg"
  },
  {
    icon: "ion:add-circle-outline:blue",
    svg: "svg:icon-left-circle",
    http: "https://certd.docmirror.cn/static/logo/logo.svg"
  },
  {
    icon: "ion:american-football-sharp",
    svg: "svg:icon-Dollar"
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
