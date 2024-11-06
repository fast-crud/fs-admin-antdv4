<template>
  <fs-page>
    <template #header>
      <div class="title">CrudOptions从后台加载</div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/use.html#usefsasync">文档</a>
      </div>
    </template>
    <fs-crud v-if="crudBinding" ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { CrudBinding, useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "AdvancedFromBackend",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 初始化crud配置
    // 页面打开后获取列表数据
    onMounted(async () => {
      //异步初始化fs，createCrudOptions为异步方法
      await useFsAsync({ crudRef, crudBinding, crudExpose, context, createCrudOptions });
      // 刷新数据
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
