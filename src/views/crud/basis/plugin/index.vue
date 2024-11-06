<template>
  <fs-page>
    <template #header>
      <div class="title">
        CrudOptionsPlugin
        <span class="sub">用于合并CrudOptions，做一些可配置化的公共参数；此处演示使用rowSelectionPlugin生成行选择配置,支持跨页选择</span>
      </div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/settings.html#plugins">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #pagination-left>
        <a-tooltip title="批量删除">
          <fs-button icon="DeleteOutlined" @click="context.handleBatchDelete"></fs-button>
        </a-tooltip>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import { message, Modal } from "ant-design-vue";
import { BatchDelete } from "./api";

export default defineComponent({
  name: "BasisPlugin",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();
    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef,crudExpose, context, createCrudOptions });

      context.handleBatchDelete = () => {
        const { selectedRowKeys } = context;
        if (selectedRowKeys.value?.length > 0) {
          Modal.confirm({
            title: "确认",
            content: `确定要批量删除这${selectedRowKeys.value.length}条记录吗`,
            async onOk() {
              await BatchDelete(selectedRowKeys.value);
              message.info("删除成功");
              await crudExpose.doRefresh();
              selectedRowKeys.value = [];
            }
          });
        } else {
          message.error("请先勾选记录");
        }
      };

      await crudExpose.doRefresh();
    });

    return {
      crudBinding,
      crudRef,
      context
    };
  }
});
</script>
