<template>
  <fs-page>
    <template #header>
      <div class="title">可编辑</div>
      <div class="more"><a target="_blank" href="http://fast-crud.docmirror.cn/api/crud-options/table.html#editable">文档</a></div>
    </template>
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template v-if="crudBinding" #actionbar-right>
        <!--      <fs-button class="ml-1" @click="addRow">添加行</fs-button>-->
        <a-radio-group v-model:value="crudBinding.table.editable.enabled" class="ml-5">
          <a-radio-button :value="true">启用编辑</a-radio-button>
          <a-radio-button :value="false">退出编辑</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="crudBinding.table.editable.showAction" class="ml-1">
          <a-radio-button :value="true">显示操作按钮</a-radio-button>
          <a-radio-button :value="false">不显示</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="crudBinding.table.editable.activeDefault" class="ml-1">
          <a-radio-button :value="true">默认激活</a-radio-button>
          <a-radio-button :value="false">默认不激活</a-radio-button>
        </a-radio-group>
        <template v-if="crudBinding.table.editable.enabled">
          <fs-button class="ml-5" @click="save">保存</fs-button>
          <fs-button class="ml-5" @click="log">log</fs-button>
        </template>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef, utils } from "@fast-crud/fast-crud";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "EditableFree",
  setup() {
    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, context, createCrudOptions });

      await crudExpose.doRefresh();
      await crudExpose.editable.enable({ mode: "free" });
    });

    return {
      crudBinding,
      crudRef,
      active() {
        crudExpose.editable.active({});
      },
      inactive() {
        crudExpose.editable.inactive();
      },
      async save() {
        const res = await crudExpose.editable.validate();
        if (res !== true) {
          console.error("validate error:", res);
          message.error("validate error：" + JSON.stringify(res));
          return;
        }
        message.success("保存,修改行：" + JSON.stringify(crudBinding.value.data));
      },
      log() {
        utils.logger.info("table data:", crudBinding.value.data, crudExpose.getTableData());
      },
      cancel() {
        crudExpose.editable.resume();
      },
      addRow() {
        crudExpose.editable.addRow();
      },
      editCol() {
        crudExpose.editable.activeCols({ cols: ["radio"] });
      }
    };
  }
});
</script>
