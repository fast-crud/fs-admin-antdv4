<template>
  <fs-page class="page-first">
    <template #header>
      <div class="title">第一个crud</div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/guide/start/first.html">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding" />

    <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
  </fs-page>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, Ref } from "vue";
import { CrudBinding, useFsAsync } from "@fast-crud/fast-crud";
import createCrudOptions, { FirstContext } from "./crud";
import { FirstRow } from "./api";
import { useTour } from "./use-tour";

// crud组件的ref
const crudRef: Ref = ref();
// crud 配置的ref
const crudBinding: Ref<CrudBinding> = ref();

const context: any = {};

const { open, current, steps, handleOpen } = useTour();

// 页面打开后获取列表数据
onMounted(async () => {
  const { crudExpose } = await useFsAsync<FirstRow, FirstContext>({ crudRef, crudBinding, createCrudOptions, context });
  await crudExpose.doRefresh();
  await nextTick();
  await nextTick();
  handleOpen(true);
});
</script>
