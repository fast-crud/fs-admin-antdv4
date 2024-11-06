<template>
  <fs-page>
    <template #header>
      <div class="title">自定义表单</div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/use.html#useformwrapper">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsRef, useFsAsync } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud.js";

export default defineComponent({
  name: "FormCustomForm",
  setup(props, ctx) {
    // 页面打开后获取列表数据
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

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
