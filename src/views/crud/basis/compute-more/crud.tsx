import * as api from "./api";
import { AddReq, compute, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { computed, ref, shallowRef } from "vue";
import ShallowComponent from "/@/views/crud/basis/compute-more/shallow-component.vue";
import CustomComponent from "/@/views/crud/basis/compute-more/custom-component.vue";

export default async function ({ crudExpose }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    if (form.id == null) {
      form.id = row.id;
    }
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
    return await api.AddObj(form);
  };

  //普通的ref引用，可以动态切换配置
  const defValueRef = ref("我是动态的默认值");
  return {
    output: {
      defValueRef
    },
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        scroll: {
          x: 1500
        }
      },
      form: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      editForm: {
        wrapper: {
          title: computed(() => {
            return `edit-title`;
          })
        }
      },
      addForm: {
        wrapper: {
          title: computed(() => {
            return `add-title`;
          })
        }
      },
      rowHandle: {
        fixed: "right",
        align: "center"
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          column: {
            width: 50
          },
          form: {
            show: false
          }
        },
        defValue: {
          title: "默认值",
          type: "text",
          search: { show: true, value: null },
          form: {
            // form.value不支持asyncCompute/Compute, 因为上下文动态计算要先有上下文，上下文需要先有form数据
            value: defValueRef
          }
        },
        switch: {
          title: "切换动态组件",
          type: "dict-radio",
          dict: dict({
            data: [
              { value: "radio", label: "radio" },
              { value: "select", label: "select" },
              { value: "shallow", label: "shallowComponent" }
            ]
          }),
          form: {
            order: compute(({ form }) => {
              return -1;
            })
          }
        },
        componentName: {
          title: "动态组件",
          type: "dict-select",
          search: { show: true, value: null },
          dict: dict({
            data: [
              { value: "1", label: "开启" },
              { value: "2", label: "关闭" }
            ]
          }),
          form: {
            component: {
              value: "2",
              vModel: "value",
              name: compute(({ form }) => {
                return form.switch === "select" ? "fs-dict-select" : form.switch === "radio" ? "fs-dict-radio" : ShallowComponent;
              })
            }
          }
        },
        custom: {
          title: "自定义组件",
          type: "text",
          form: {
            component: {
              name: CustomComponent,
              vModel: "value"
            }
          }
        },
        test: {
          title: "测试",
          type: "text",
          form: {
            title: computed(({ form }) => {
              return `title:${form.switch}`;
            }),
            component: {
              name: "a-input",
              vModel: "value",
              props: {
                placeholder: compute(({ form }) => {
                  return `placeholder:${form.switch}`;
                })
              }
            },
            helper: compute(({ form }) => {
              return `helper:${form.switch}`;
            }),
            rules: [
              {
                required: true,
                message: compute(({ form }) => {
                  return `message:${form.switch}`;
                })
              }
            ]
          }
        }
      }
    }
  };
}
