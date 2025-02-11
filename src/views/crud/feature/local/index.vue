<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-button @click="showData">获取表格数据，打印data</a-button>
        <a-button @click="disabledEdit">退出编辑模式</a-button>
        <a-button @click="enabledFreeEdit">自由编辑模式</a-button>
        <a-button @click="enabledRowEdit">行编辑模式</a-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef, utils } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "FeatureLocal",
  props: {
    modelValue: {}
  },
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
      //初始化本地数据示例
      crudBinding.value.data = [{ name: "test" }];
      await crudExpose.doRefresh();
    });
    // 通过crudBinding.value.data 可以获取表格实时数据
    function showData() {
      utils.logger.info("data:", crudBinding.value.data);
    }

    //启用行编辑
    function enabledRowEdit() {
      crudExpose.editable.enable({
        mode: "row"
      });
      crudBinding.value.actionbar.buttons.add.show = false;
      crudBinding.value.actionbar.buttons.addRow.show = true;
    }

    //启用自由编辑
    function enabledFreeEdit() {
      crudExpose.editable.enable({
        mode: "free"
      });
      crudBinding.value.actionbar.buttons.add.show = false;
      crudBinding.value.actionbar.buttons.addRow.show = true;
    }

    //启用关闭编辑模式
    function disabledEdit() {
      crudExpose.editable.enable({
        enabled: false
      });
      crudBinding.value.actionbar.buttons.add.show = true;
      crudBinding.value.actionbar.buttons.addRow.show = false;
    }

    return {
      crudBinding,
      crudRef,
      showData,
      enabledRowEdit,
      enabledFreeEdit,
      disabledEdit
    };
  }
});
</script>
