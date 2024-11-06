<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import createCrudOptions from "./crud.js";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "ComponentRadio",
  setup() {
    const { crudRef, crudBinding } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      const { crudExpose } = await useFsAsync({ crudBinding, crudRef, createCrudOptions });
      await crudExpose.doRefresh();
    });

    const value = ref(null);
    return {
      crudBinding,
      crudRef,
      value
    };
  }
});
</script>
