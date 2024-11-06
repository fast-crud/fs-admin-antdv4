<template>
  <fs-crud ref="crudRef" v-bind="crudBinding">
    <template #actionbar-right>
      <a-alert type="warning" class="ml-1" message="左侧表格点击行可以触发这里的查询" />
    </template>
  </fs-crud>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud.js";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "AsideTable",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });

      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      setSearchFormData: crudExpose.setSearchFormData,
      doRefresh: crudExpose.doRefresh
    };
  }
});
</script>
