import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";

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

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      form: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        helper: {
          // position: "label" // helper的展示位置全局配置
          // tooltip:{}
        },
        group: {
          groups: {
            profile: {
              header: "profile",
              columns: ["profile.name", "profile.age", "profile.status"]
            }
          }
        }
      },
      columns: {
        username: {
          title: "用户名",
          type: "text"
        },
        "profile.name": {
          title: "profile.name",
          type: "text",
          search: { show: true },
          form: {
            key: ["profile", "name"],
            rules: [{ required: true, message: "姓名必填" }]
          }
        },
        "profile.age": {
          title: "profile.age",
          type: "number",
          form: {
            key: ["profile", "age"]
          }
        },
        "profile.status": {
          title: "profile.status",
          type: "dict-select",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          }),
          form: {
            key: ["profile", "status"]
          }
        },
        "profile.count": {
          title: "不提交的字段",
          type: "text",
          form: {
            submit: false,
            key: ["profile", "count"]
          }
        }
      }
    }
  };
}
