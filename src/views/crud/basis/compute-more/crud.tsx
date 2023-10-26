import * as api from "./api";
import { AddReq, compute, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { computed, ref } from "vue";

export default function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    form.id = row.id;
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
          type: "dict-switch",
          dict: dict({
            data: [
              { value: "radio", label: "radio" },
              { value: "select", label: "select" }
            ]
          })
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
              name: compute(({ form }) => {
                return form.switch === "radio" ? "fs-dict-radio" : "fs-dict-select";
              })
            }
          }
        }
      }
    }
  };
}
