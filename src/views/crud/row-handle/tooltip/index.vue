<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-alert class="ml-1" type="warning" message="操作列按钮支持tooltip（实际上所有buttons配置都支持tooltip）" />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud.jsx";
import { message } from "ant-design-vue";
import { useFsRef, useFsAsync } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "RowHandleTooltip",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();
    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
      await crudExpose.doRefresh();
    });

    function columnsSetToggleMode() {
      crudBinding.value.toolbar.columnsFilter.mode = crudBinding.value.toolbar.columnsFilter.mode === "simple" ? "default" : "simple";
      message.info("当前列设置组件的模式为：" + crudBinding.value.toolbar.columnsFilter.mode);
    }

    return {
      crudBinding,
      crudRef,
      columnsSetToggleMode
    };
  }
});
</script>
