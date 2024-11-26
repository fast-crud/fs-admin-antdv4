<template>
  <fs-crud ref="crudRef" v-bind="crudBinding">
    <a-row v-if="crudBinding.data" gutter="10" style="height: 100%; width: 100%; overflow: auto">
      <a-col v-for="(item, index) of crudBinding.data" :key="item.id" :span="6" style="margin-bottom: 10px">
        <a-card :title="item.title">
          {{ item.content }}
          <template #extra> 操作 </template>
          <template #actions>
            <fs-icon icon="ion:eye-outline" @click="openView({ index: index, row: item })"></fs-icon>
            <fs-icon icon="ion:create-outline" @click="openEdit({ index: index, row: item })"></fs-icon>
            <fs-icon icon="ion:trash-outline" @click="doRemove({ index: index, row: item })"></fs-icon>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </fs-crud>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud.js";

const { crudRef, crudBinding, crudExpose, context } = useFsRef();

// 页面打开后获取列表数据
onMounted(async () => {
  await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });

  await crudExpose.doRefresh();
});

function openView(opts: any) {
  crudExpose.openView(opts);
}
function openEdit(opts: any) {
  crudExpose.openEdit(opts);
}
function doRemove(opts: any) {
  crudExpose.doRemove(opts);
}
</script>
