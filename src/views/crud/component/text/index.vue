<template>
  <fs-page>
    <template #header>
      <div class="title">
        文本类型
        <span class="sub">
          <span>type='text'</span>
          <fs-copyable :inline="true" model-value="文本复制组件测试" style="width: 200px; margin-left: 100px" :button="{ showOnHover: false, show: true, text: '点我复制' }" />
        </span>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "ComponentText",
  setup() {
    const { crudRef, crudBinding } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      const { crudExpose } = await useFsAsync({ crudBinding, crudRef, createCrudOptions });
      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
