<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
    <advanced-in-drawer-class-time ref="drawerClassTimeRef" />
  </fs-page>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import AdvancedInDrawerClassTime from "./drawer-class-time/index.vue";
//保留子组件的ref引用
const drawerClassTimeRef = ref();

const { crudRef, crudBinding, crudExpose } = useFsRef();
const context = {
  drawerClassTimeRef
};
defineOptions({
  name: "AdvancedInDrawer"
});

// 页面打开后获取列表数据
onMounted(async () => {
  await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });

  await crudExpose.doRefresh();
});
</script>
