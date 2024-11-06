<template>
  <fs-page>
    <template #header>
      <div class="title">表单Grid布局</div>
    </template>
    <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsRef, useFsAsync } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FormLayoutGrid",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef,crudExpose, context, createCrudOptions });
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
<style lang="less">
// grid模式下， labelWidth 需要靠样式控制
.page-layout {
  .ant-form-item-label {
    width: 110px !important;
  }
}
</style>
