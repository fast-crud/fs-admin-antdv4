<template>
  <fs-page>
    <template #header>
      <div class="title">导出</div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/toolbar.html#export">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #toolbar-left>
        <fs-label lass="ml-5" label="导出方式">
          <a-select v-model:value="exportType">
            <a-select-option value="local">本地</a-select-option>
            <a-select-option value="server">服务端</a-select-option>
          </a-select>
        </fs-label>
        <fs-label v-if="exportType === 'local'" lass="ml-5" label="导出文件类型">
          <a-select v-model:value="fileType">
            <a-select-option value="excel">Excel</a-select-option>
            <a-select-option value="csv">CSV</a-select-option>
          </a-select>
        </fs-label>
        <fs-label v-if="exportType === 'local'" class="ml-5" label="数据来源">
          <a-select v-model:value="dataFrom">
            <a-select-option value="search">查询</a-select-option>
            <a-select-option value="local">本页数据</a-select-option>
          </a-select>
        </fs-label>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useFsRef, useFsAsync, UserPageQuery, useUi } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";

export default defineComponent({
  name: "FeatureExport",
  setup() {
    const fileType = ref("excel");
    const dataFrom = ref("search");
    const exportType = ref("local");
    const context = {
      fileType,
      dataFrom,
      exportType
    };

    const { crudBinding, crudRef, crudExpose } = useFsRef();
    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, createCrudOptions, context });
      await crudExpose.doRefresh();
    });
    const { ui } = useUi();
    watch(
      () => {
        return exportType.value;
      },
      (value) => {
        if (value === "server") {
          crudBinding.value.toolbar.export.server = async (userPageQuery: UserPageQuery) => {
            ui.message.info("请在此处请求后端导出，查询条件：" + JSON.stringify(userPageQuery));
          };
        } else {
          crudBinding.value.toolbar.export.server = null;
        }
      }
    );

    return {
      crudBinding,
      crudRef,
      ...context
    };
  }
});
</script>
