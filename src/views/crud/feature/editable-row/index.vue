<template>
  <fs-page>
    <template #header>
      <div class="title">
        行编辑模式
        <span class="sub">暂不支持树形结构</span>
      </div>
      <div class="more"><a target="_blank" href="http://fast-crud.docmirror.cn/api/expose.html">文档</a></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "FeatureEditableRow",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
      await crudExpose.doRefresh();
      await crudExpose.editable.enable({ mode: "row" });
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
