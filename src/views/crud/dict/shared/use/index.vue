<template>
  <fs-page>
    <template #header>
      <div class="title">
        共享字典的使用
        <span class="sub">在管理共享字典页面添加字典后，使用时会自动增加字典选项</span>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud.js";

export default defineComponent({
  name: "DictSharedUse",
  setup() {
    // crud组件的ref
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      const { crudExpose } = await useFsAsync({ crudBinding, crudRef, createCrudOptions, context });

      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
