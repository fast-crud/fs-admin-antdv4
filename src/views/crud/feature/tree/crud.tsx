import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes, utils } from "@fast-crud/fast-crud";
import { ref } from "vue";
import dayjs from "dayjs";

export default async function ({ crudExpose, context }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
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

  const selectedRowKeys = ref([]);
  context.selectedRowKeys = selectedRowKeys;
  const onSelectChange = (changed: any) => {
    utils.logger.info("selection", changed);
    selectedRowKeys.value = changed;
  };
  return {
    selectedRowKeys, //返回给index.vue去使用
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      table: {
        rowSelection: { selectedRowKeys: selectedRowKeys, onChange: onSelectChange }
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          column: {
            width: 100
          },
          form: {
            show: false
          }
        },
        time: {
          title: "时间",
          type: "datetime",
          column: {
            width: 180
          },
          valueBuilder({ row, key, value }) {
            if (value) {
              row[key] = dayjs(value);
            }
          }
        },
        data: {
          title: "data",
          type: "text",
          column: {
            width: 180
          }
        },
        province: {
          title: "地区",
          type: "dict-select",
          search: { show: true },
          form: {
            component: { filterable: true, multiple: true }
          },
          dict: dict({
            data: [
              { value: "sz", label: "深圳" },
              { value: "gz", label: "广州" },
              { value: "wh", label: "武汉" },
              { value: "sh", label: "上海" }
            ]
          }),
          column: {
            width: 300
          }
        },
        amount: {
          title: "金额(元)",
          type: "number",
          key: "amount"
        },
        radio: {
          title: "状态",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        }
      }
    }
  };
}
