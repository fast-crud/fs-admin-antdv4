<template>
  <div class="sub-table">
    <div v-if="id > 0" style="height: 500px; position: relative">
      <fs-crud ref="crudRef" v-bind="crudBinding"> </fs-crud>
    </div>
    <div v-else><fs-button @click="saveMain">保存</fs-button> 保存后即可编辑子表</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from "vue";
import createCrudOptions from "./crud";
import { useFsAsync, useFsRef, useUi, utils } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "EditableSubCrudTarget",
  props: {
    /**
     * 主表id
     */
    id: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["save-main"],
  setup(props, ctx) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const parentIdRef = ref(props.id);

    const { crudRef, crudBinding, crudExpose, context } = useFsRef();

    const { ui } = useUi();

    let formItemContext = ui.formItem.injectFormItemContext();

    function emit(data: any) {
      utils.logger.info("emit:", data);
      formItemContext.onBlur();
      formItemContext.onChange();
    }

    function saveMain() {
      ctx.emit("save-main", true);
    }

    watch(
      () => {
        return props.id;
      },
      (value: any) => {
        if (value > 0 && crudBinding.value) {
          crudExpose.setSearchFormData({
            form: { parentId: value },
            mergeForm: true,
            triggerSearch: true
          });
          parentIdRef.value = value;
        }
      },
      {
        immediate: true
      }
    );

    // 页面打开后获取列表数据
    onMounted(async () => {
      await useFsAsync({ crudBinding, crudRef, crudExpose, createCrudOptions, context: { parentIdRef } });
      if (props.id > 0) {
        await crudExpose.doRefresh();
      }

      watch(
        () => {
          return props.disabled || props.readonly;
        },
        (value) => {
          if (!crudBinding.value) {
            return;
          }
          if (value) {
            crudBinding.value.table.editable.readonly = true;
            crudBinding.value.actionbar.buttons.addRow.show = false;
            crudBinding.value.rowHandle.show = false;
          } else {
            crudBinding.value.table.editable.readonly = false;
            crudBinding.value.actionbar.buttons.addRow.show = true;
            crudBinding.value.rowHandle.show = true;
          }
        },
        {
          immediate: true
        }
      );
    });

    return {
      crudBinding,
      crudRef,
      saveMain
    };
  }
});
</script>
