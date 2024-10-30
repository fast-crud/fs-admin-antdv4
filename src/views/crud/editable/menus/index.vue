<template>
  <fs-page>
    <template #header>
      <div class="title">
        vModel+行编辑
        <span class="sub">在表格内编辑每行数据</span>
      </div>
      <div class="more"><a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/table.html#editable">文档</a></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right> </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFs } from "@fast-crud/fast-crud";

defineOptions({
  name: "EditableRowVModel"
});
const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });

// 页面打开后获取列表数据
onMounted(() => {
  // crudExpose.doRefresh();
  crudExpose.crudBinding.value.data = [];
  // crudExpose.editable.enable({});
});
</script>
