import * as api from "./api";
import {
  AddReq,
  CreateCrudOptionsProps,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
  UserPageRes,
  utils
} from "@fast-crud/fast-crud";
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
        async doReset() {
          utils.logger.log("reset之后可以执行其他操作");
        },
        wrapper: {
          buttons: {
            reset: {
              text: "重置",
              order: -1,
              click(context) {
                utils.logger.log("on reset", context);
                crudExpose.getFormRef().reset();
              }
            }
          }
        }
      },
      columns: {
        name: {
          title: "姓名",
          type: "text", //虽然不写也能正确显示组件，但不建议省略它
          search: { show: true },
          form: {
            component: {
              maxlength: 20
            }
          }
        }
      }
    }
  };
}
