import { defineAsyncComponent } from "vue";

export default {
  install(app: any) {
    app.component(
      "AInput",
      defineAsyncComponent(() => import("ant-design-vue/es/input/Input"))
    );
    app.component(
      "AInputPassword",
      defineAsyncComponent(() => import("ant-design-vue/es/input/Password"))
    );
    app.component(
      "AButton",
      defineAsyncComponent(() => import("ant-design-vue/es/button/button"))
    );
    app.component(
      "AButtonGroup",
      defineAsyncComponent(() => import("ant-design-vue/es/button/button-group"))
    );
    app.component(
      "ARadio",
      defineAsyncComponent(() => import("ant-design-vue/es/radio/Radio"))
    );
    app.component(
      "ARadioGroup",
      defineAsyncComponent(() => import("ant-design-vue/es/radio/Group"))
    );
    app.component(
      "ATable",
      defineAsyncComponent(() => import("ant-design-vue/es/table/Table"))
    );
    app.component(
      "AModal",
      defineAsyncComponent(() => import("ant-design-vue/es/modal/Modal"))
    );
    app.component(
      "AForm",
      defineAsyncComponent(() => import("ant-design-vue/es/form/Form"))
    );
    app.component(
      "AFormItem",
      defineAsyncComponent(() => import("ant-design-vue/es/form/FormItem"))
    );
    app.component(
      "ATabs",
      defineAsyncComponent(() => import("ant-design-vue/es/tabs/src/Tabs"))
    );

    app.component(
      "ATabPane",
      defineAsyncComponent(() => import("ant-design-vue/es/tabs/src/TabPanelList/TabPane"))
    );
    app.component(
      "ATextarea",
      defineAsyncComponent(() => import("ant-design-vue/es/input/TextArea"))
    );
    app.component(
      "AInputNumber",
      defineAsyncComponent(() => import("ant-design-vue/es/input-number/index"))
    );
    app.component(
      "ASelect",
      defineAsyncComponent(() => import("ant-design-vue/es/select/index"))
    );
    app.component(
      "ADrawer",
      defineAsyncComponent(() => import("ant-design-vue/es/drawer/index"))
    );
    app.component(
      "ASwitch",
      defineAsyncComponent(() => import("ant-design-vue/es/switch/index"))
    );
    app.component(
      "AUpload",
      defineAsyncComponent(() => import("ant-design-vue/es/upload/index"))
    );
    app.component(
      "ADatePicker",
      defineAsyncComponent(() => import("ant-design-vue/es/date-picker/index"))
    );
    app.component(
      "ARangePicker",
      defineAsyncComponent(async () => {
        const { RangePicker } = await import("ant-design-vue/es/date-picker/index");
        return RangePicker;
      })
    );
    app.component(
      "ATimePicker",
      defineAsyncComponent(() => import("ant-design-vue/es/time-picker/index"))
    );
    app.component(
      "ATag",
      defineAsyncComponent(() => import("ant-design-vue/es/tag/index"))
    );
    app.component(
      "AAlert",
      defineAsyncComponent(() => import("ant-design-vue/es/alert/index"))
    );
    app.component(
      "AInputAutoComplete",
      defineAsyncComponent(() => import("ant-design-vue/es/auto-complete/index"))
    );
    app.component(
      "ACard",
      defineAsyncComponent(() => import("ant-design-vue/es/card/index"))
    );
    app.component(
      "ACascader",
      defineAsyncComponent(() => import("ant-design-vue/es/cascader/index"))
    );
    app.component(
      "ACheckbox",
      defineAsyncComponent(() => import("ant-design-vue/es/checkbox"))
    );
    app.component(
      "ACheckboxGroup",
      defineAsyncComponent(() => import("ant-design-vue/es/checkbox/Group"))
    );
    app.component(
      "ACol",
      defineAsyncComponent(() => import("ant-design-vue/es/col"))
    );
    app.component(
      "ARow",
      defineAsyncComponent(() => import("ant-design-vue/es/row"))
    );
    app.component(
      "ADropdown",
      defineAsyncComponent(() => import("ant-design-vue/es/dropdown"))
    );
    app.component(
      "AGrid",
      defineAsyncComponent(() => import("ant-design-vue/es/grid"))
    );
    app.component(
      "AImage",
      defineAsyncComponent(() => import("ant-design-vue/es/image"))
    );
    app.component(
      "APagination",
      defineAsyncComponent(() => import("ant-design-vue/es/pagination"))
    );
    app.component(
      "ATooltip",
      defineAsyncComponent(() => import("ant-design-vue/es/tooltip"))
    );
    app.component(
      "ATree",
      defineAsyncComponent(() => import("ant-design-vue/es/tree"))
    );
    app.component(
      "ATreeSelect",
      defineAsyncComponent(() => import("ant-design-vue/es/tree-select"))
    );
    app.component(
      "AToar",
      defineAsyncComponent(() => import("ant-design-vue/es/tree-select"))
    );
  }
};
