<template>
  <fs-page>
    <template #header>
      <div class="title">
        子表crud
        <span class="sub"> 外键关联子表，子表有自己的crud接口 </span>
      </div>
      <div class="more"><a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/table.html#editable">文档</a></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <fs-button class="ml-5" @click="log">log</fs-button>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef, utils } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "EditableSubCrud",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      log() {
        utils.logger.info("table data:", crudBinding.value.data);
      }
    };
  }
});
</script>
