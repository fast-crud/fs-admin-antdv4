<template>
  <fs-page>
    <template #header>
      <div class="title">
        <span>自定义header</span>
        <span class="sub">通过配置a-table的headerCell插槽实现</span>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import createCrudOptions from "./crud.js";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

defineOptions({
  name: "FeatureHeader"
});
const { crudRef, crudBinding, crudExpose, context } = useFsRef();
onMounted(async () => {
  await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
  await crudExpose.doRefresh();
});
</script>
