import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes, utils, useUi } from "@fast-crud/fast-crud";

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
  const { ui } = useUi();
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
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
        checkbox: {
          title: "状态",
          search: { show: true },
          type: "dict-checkbox",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          }),
          form: {
            component: {
              on: {
                selectedChange({ form, $event }) {
                  // $event就是原始的事件值，也就是选中的 option对象
                  utils.logger.info("onSelectedChange", form, $event);
                  ui.message.info(`你选择了${JSON.stringify($event)}`);
                  // 你还可以将选中的label值赋值给表单里其他字段
                  // context.form.xxxLabel = context.$event.label
                }
              }
            }
          }
        }
      }
    }
  };
}
