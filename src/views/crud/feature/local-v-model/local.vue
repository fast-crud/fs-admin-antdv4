<template>
  <fs-crud ref="crudRef" v-bind="crudBinding" />
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import createCrudOptions from "./crud";
import { useFsRef, useFsAsync, utils } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "FeatureLocalModelValueInput",
  props: {
    modelValue: {
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });
      crudBinding.value.data = props.modelValue || [];
      //启用行编辑模式
      await crudExpose.editable.enable({ mode: "row" });
    });

    //通过导出modelValue, 可以导出成为一个input组件
    watch(
      () => {
        return props.modelValue;
      },
      (value = []) => {
        crudBinding.value.data = value;
      }
    );

    // 通过crudBinding.value.data 可以获取表格实时数据
    function showData() {
      utils.logger.info("data:", crudBinding.value.data);
    }

    return {
      crudBinding,
      crudRef,
      showData
    };
  }
});
</script>
<style lang="less">
.fs-crud-container.compact .el-table--border {
  border-left: 1px solid #eee;
}
</style>
