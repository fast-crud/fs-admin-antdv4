<template>
  <fs-page>
    <template #header>
      <div class="title">
        Tabs快捷查询
        <span class="sub">表格顶部显示tabs，点击tabs快捷查询</span>
      </div>
      <div class="more">
        <a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/tabs.html">文档</a>
      </div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useFsRef, useFsAsync } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "FeatureTabs",
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
      getSearchFormData() {
        const form = crudExpose.getSearchFormData();
        message.info(`searchForm:${JSON.stringify(form)}`);
      },
      setSearchFormData() {
        crudExpose.setSearchFormData({ form: { radio: "1" }, mergeForm: true });
      },
      clearSearchForm() {
        crudExpose.setSearchFormData({ form: { radio: null }, mergeForm: false });
      }
    };
  }
});
</script>
