<template>
  <div>
    <div>年级id：{{ gradeId }},当前选中值：{{ modelValue }}</div>
    <div style="height: 400px">
      <fs-crud ref="crudRef" v-bind="crudBinding" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import createCrudOptions from "./crud";
import { useFs, useFsAsync, useFsRef, utils } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "SubTable",
  props: {
    modelValue: {},
    gradeId: {} //年级id，接收其他参数
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const context = { props, ctx };
    const { crudRef, crudBinding, crudExpose } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });

      await crudExpose.doRefresh();
    });

    //你的业务代码
    watch(
      () => {
        return props.modelValue;
      },
      (value) => {
        utils.logger.info("modelValue changed", value);
      }
    );
    return {
      crudBinding,
      crudRef
    };
  }
});
</script>
<style lang="less" scoped>
/deep/.fs-crud-container.compact .el-table--border {
  border-left: 1px solid #eee;
}
</style>
