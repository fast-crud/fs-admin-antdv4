import * as api from "./api";
import * as textTableApi from "../text/api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import createCrudOptionsText from "../text/crud";

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

  const crudOptionsOverride = {
    table: {
      scroll: {
        x: 2000
      }
    },
    rowHandle: {
      fixed: "right"
    }
  };
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
        single: {
          title: "单选",
          search: { show: true },
          type: "table-select",
          dict: dict({
            value: "id",
            label: "name",
            //重要，根据value懒加载数据
            getNodesByValues: async (values: any[]) => {
              return await textTableApi.GetByIds(values);
            }
          }),
          form: {
            component: {
              crossPage: true,
              valuesFormat: {
                labelFormatter: (item: any) => {
                  return `${item.id}.${item.name}`;
                }
              },
              select: {
                placeholder: "点击选择"
              },
              createCrudOptions: createCrudOptionsText,
              crudOptionsOverride
            }
          }
        },
        multi: {
          title: "多选",
          search: { show: true },
          type: "table-select",
          dict: dict({
            value: "id",
            label: "name",
            //重要，根据value懒加载数据
            getNodesByValues: async (values: any[]) => {
              return await textTableApi.GetByIds(values);
            }
          }),
          form: {
            component: {
              crossPage: true,
              multiple: true,
              valuesFormat: {
                labelFormatter: (item: any) => {
                  return `${item.id}.${item.name}`;
                }
              },
              select: {
                placeholder: "点击选择"
              },
              createCrudOptions: createCrudOptionsText,
              crudOptionsOverride: crudOptionsOverride
            }
          },
          column: {
            component: {
              labelFormatter: (item: any) => {
                return `${item.id}.${item.name}`;
              }
            }
          }
        },
        valueType: {
          title: "object类型",
          search: { show: true },
          type: "table-select",
          dict: dict({
            value: "id",
            label: "name",
            //重要，根据value懒加载数据
            getNodesByValues: async (values: any[]) => {
              return await textTableApi.GetByIds(values);
            }
          }),
          column: {
            component: {
              valueType: "object"
            }
          },
          form: {
            helper: "这里提交的值是整个对象",
            component: {
              valueType: "object",
              crossPage: true,
              valuesFormat: {
                labelFormatter: (item: any) => {
                  return `${item.id}.${item.name}`;
                }
              },
              select: {
                placeholder: "点击选择"
              },
              createCrudOptions: createCrudOptionsText,
              crudOptionsOverride
            }
          }
        },
        //值是object类型
        valueTypeMulti: {
          title: "object类型多选",
          search: { show: true },
          type: "table-select",
          dict: dict({
            value: "id",
            label: "name",
            getNodesByValues: async (values: any[]) => {
              return await textTableApi.GetByIds(values);
            }
          }),
          column: {
            component: {
              valueType: "object"
            }
          },
          form: {
            helper: "这里提交的值是对象数组",
            component: {
              valueType: "object",
              crossPage: true,
              multiple: true,
              valuesFormat: {
                labelFormatter: (item: any) => {
                  return `${item.id}.${item.name}`;
                }
              },
              select: {
                placeholder: "点击选择"
              },
              createCrudOptions: createCrudOptionsText,
              crudOptionsOverride
            }
          }
        }
      }
    }
  };
}
