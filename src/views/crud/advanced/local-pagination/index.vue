<template>
  <fs-page>
    <template #header>
      <div class="title">本地分页</div>
    </template>
    <fs-crud v-if="crudBinding" ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-alert type="warning" class="ml-1" message="先从后台获取全部数据，然后本地分页展示" />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useCrud, useExpose, useFs, useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { GetList } from "./api";

/**
 * 本示例演示如何本地分页
 * 主要就是将pageRequest修改为从本地获取数据就行了
 */
export default defineComponent({
  name: "AdvanceLocalPagination",
  setup() {
    const { crudRef, crudBinding, crudExpose } = useFsRef();
    const localDataRef = ref();
    const context = { localDataRef };
    // 页面打开后获取列表数据
    onMounted(async () => {
      //先加载后台数据
      const ret = await GetList({ page: { offset: 0, limit: 99999999 }, query: {}, sort: {} });
      localDataRef.value = ret.records;

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
