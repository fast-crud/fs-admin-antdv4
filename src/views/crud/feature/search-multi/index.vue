<template>
  <fs-page class="PageFeatureSearchMulti">
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FeatureSearchMulti",
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
<style lang="less">
.PageFeatureSearchMulti {
  .fs-search {
    .fs-search-multi-line-buttons {
      position: absolute;
      bottom: -38px;
      right: 210px;
    }
    .ant-form-item-label:before {
      border-bottom: 1px solid #eee;
      content: "";
      position: absolute;
      bottom: 1px;
      left: 2px;
      right: 8px;
    }
  }
}
</style>
