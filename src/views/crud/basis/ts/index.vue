<template>
  <fs-page class="page-first">
    <template #header>
      <div class="title">Ts定义测试</div>
      <div class="more"></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef, utils } from "@fast-crud/fast-crud";
import createCrudOptions, { TsTestContext } from "./crud";
import { TsTestRow } from "./api";

//此处为组件定义
export default defineComponent({
  name: "FsCrudTsTest",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      const { crudExpose } = await useFsAsync<TsTestRow, TsTestContext>({ crudRef, crudBinding, createCrudOptions, context });
      utils.logger.info("test", context.test);
      await crudExpose.doRefresh();
    });
    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
