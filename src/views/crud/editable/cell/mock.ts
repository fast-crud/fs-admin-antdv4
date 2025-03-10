// @ts-ignore
import mockUtil from "/src/mock/base";
const options: any = {
  name: "EditableCell",
  idGenerator: 0
};
const list = [
  {
    radio: "1",
    children: [
      {
        radio: "2"
      }
    ],
    slot: "1"
  },
  {
    radio: "2"
  },
  {
    radio: "0"
  }
];
options.list = list;
const mock = mockUtil.buildMock(options);
export default mock;
