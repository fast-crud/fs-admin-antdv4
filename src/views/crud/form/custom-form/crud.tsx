import * as api from "./api.js";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, CrudExpose, CrudOptions, DelReq, dict, EditReq, useColumns, UserPageQuery, UserPageRes, utils } from "@fast-crud/fast-crud";
import { message } from "ant-design-vue";
import { useFormWrapper } from "@fast-crud/fast-crud";

function useCustomFormWrapperDemo(crudExpose: CrudExpose) {
  let index = 0;
  // 自定义表单配置
  const { buildFormOptions } = useColumns();
  const customOptions: CrudOptions = {
    columns: {
      index: {
        title: "index",
        type: "text"
      },
      customField: {
        title: "新表单字段",
        type: "text"
      },
      groupField: {
        title: "分组字段",
        type: "text"
      }
    },
    form: {
      wrapper: {
        title: "自定义表单",
        buttons: {
          open: {
            text: "打开新对话框",
            order: -1,
            click() {
              openCustomForm();
            }
          }
        },
        onOpened() {
          utils.logger.info("fsFormWrapper", crudExpose.getFormWrapperRef());
        }
      },
      group: {
        groups: {
          testGroupName: {
            header: "分组测试",
            columns: ["groupField"]
          }
        }
      },
      doSubmit({ form }) {
        utils.logger.info("form submit:", form);
        message.info("自定义表单提交:" + JSON.stringify(form));
        message.warn("抛出异常可以阻止表单关闭");
        throw new Error("抛出异常可以阻止表单关闭");
      }
    }
  };

  const { openDialog } = useFormWrapper();
  //使用crudOptions结构来构建自定义表单配置
  //打开自定义表单
  const openCustomForm = async () => {
    const formOptions = buildFormOptions(customOptions);
    index++;
    formOptions.initialForm = { index };
    formOptions.newInstance = true; //新实例打开
    const dialogRef = await openDialog(formOptions);
    utils.logger.info("openCustomFormRef", dialogRef);
  };

  const openCustomFormByExpose = async () => {
    const formOptions = buildFormOptions(customOptions);
    index++;
    formOptions.initialForm = { index };
    formOptions.newInstance = true; //新实例打开
    const dialogRef = await crudExpose.openDialog(formOptions);
    utils.logger.info("openCustomFormByExposeRef", dialogRef);
  };

  return {
    openCustomForm,
    openCustomFormByExpose
  };
}
export default async function ({ crudExpose }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
  const { openCustomForm, openCustomFormByExpose } = useCustomFormWrapperDemo(crudExpose);
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
      actionbar: {
        buttons: {
          custom: {
            text: "打开自定义对话框",
            async click() {
              await openCustomForm();
            }
          },
          byExpose: {
            text: "byExpose.openDialog",
            async click() {
              await openCustomFormByExpose();
            }
          }
        }
      },
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      columns: {
        title: {
          title: "商品标题",
          type: "text"
        },
        code: {
          title: "商品代码",
          search: { show: true },
          type: "text"
        }
      }
    }
  };
}
