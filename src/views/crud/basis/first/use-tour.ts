import { ref, Ref } from "vue";
import { TourProps } from "ant-design-vue";

export function useTour() {
  const open = ref<boolean>(false);
  const current = ref(0);
  //帮助向导
  const steps: Ref<TourProps["steps"]> = ref([]);

  const handleOpen = (val: boolean): void => {
    open.value = val;
    steps.value = [
      {
        title: "查询",
        description: "查询数据.",
        target: () => {
          return document.querySelector(".page-first .fs-search-btn-search") as HTMLElement;
        }
      },
      {
        title: "重置",
        description: "重置查询条件.",
        target: () => {
          return document.querySelector(".page-first .fs-search-btn-reset") as HTMLElement;
        }
      },
      {
        title: "添加",
        description: "打开添加对话框",
        target: () => {
          return document.querySelector(".page-first .fs-actionbar-btn-add") as HTMLElement;
        }
      },
      {
        title: "刷新列表",
        description: "刷新列表",
        target: () => {
          return document.querySelector(".page-first .fs-toolbar-btn-refresh") as HTMLElement;
        }
      }
    ];
  };

  return {
    open,
    current,
    steps,
    handleOpen
  };
}
