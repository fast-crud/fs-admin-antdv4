<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-alert style="margin-left: 10px" message="关于日期时间，建议前后端统一使用时间戳（long类型）进行交互，可以避免时区转化带来的问题" />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud.js";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "ComponentDate",
  setup() {
    const { crudRef, crudBinding } = useFsRef();
    // 页面打开后获取列表数据
    onMounted(async () => {
      const { crudExpose } = await useFsAsync({ crudBinding, crudRef, createCrudOptions });
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
