<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsAsync,useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FormInner",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();
await useFsAsync({ crudBinding, crudRef, crudExpose, context,createCrudOptions });
    // 页面打开后获取列表数据
    onMounted(async () => {
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
