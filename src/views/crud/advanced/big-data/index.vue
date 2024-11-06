<template>
  <fs-page>
    <template #header>
      <div class="title">大量数据</div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud.js";

export default defineComponent({
  name: "AdvancedBigData",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();
    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudRef, crudBinding, crudExpose, context, createCrudOptions });
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
