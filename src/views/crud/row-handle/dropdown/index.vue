<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-space v-if="crudBinding?.rowHandle?.buttons" :size="16" style="display: flex">
          <fs-label label="显示审核(render)">
            <a-switch v-model:checked="crudBinding.rowHandle.buttons.audit.show" />
          </fs-label>
          <fs-label label="审核菜单危险样式">
            <a-switch v-model:checked="crudBinding.rowHandle.buttons.audit.dropdownItem.danger" />
          </fs-label>
          <fs-label label="禁用普通菜单项">
            <a-switch v-model:checked="crudBinding.rowHandle.buttons.disabledExample.disabled" />
          </fs-label>
          <fs-label label="折叠删除按钮">
            <a-switch v-model:checked="crudBinding.rowHandle.buttons.remove.dropdown" />
          </fs-label>
        </a-space>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsRef, useFsAsync } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FeatureDropdown",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
