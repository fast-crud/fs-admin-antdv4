<template>
  <fs-page>
    <template #header>
      <div class="title">
        分发时复制Dict
        <span class="sub">如果你想要表格里同一个字段的dict和form表单同一个字段的dict不一样，就需要分发时复制</span>
      </div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/guide/advance/dict.html">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #actionbar-right>
        <a-alert class="ml-1" type="warning" message="如果你想要表格里同一个字段的dict和form表单同一个字段的dict不一样，就需要分发时复制；----点击switch看效果----↓↓↓↓↓↓" />
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "DictCloneable",
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
