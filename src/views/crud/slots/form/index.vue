<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-alert class="ml-1" type="info" message=" ← 在表单的各个位置都可以插入自定义内容" />
      </template>

      <template #form-header-left>
        <a-tag color="red">form-header-left插槽</a-tag>
      </template>
      <template #form-header-right>
        <a-tag color="red">form-header-right插槽</a-tag>
      </template>
      <template #form-header-action-left>
        <a-tag color="red">form-header-action-left插槽</a-tag>
      </template>
      <template #form-header-action-right>
        <a-tag color="red">form-header-action-right插槽</a-tag>
      </template>
      <template #form-body-top>
        <a-alert type="warning" message="form-body-top 插槽" />
      </template>
      <template #form-body-bottom>
        <a-alert type="warning" message="form-body-bottom 插槽" />
      </template>

      <template #form-body-left>
        <a-alert type="warning" message="form-body-left 插槽" />
      </template>
      <template #form-body-right>
        <a-alert type="warning" message="form-body-right 插槽" />
      </template>

      <template #form-footer-left>
        <a-button type="danger">form-footer-left 插槽</a-button>
      </template>
      <template #form-footer-right>
        <a-button type="danger">form-footer-right 插槽</a-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "SlotsForm",
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
