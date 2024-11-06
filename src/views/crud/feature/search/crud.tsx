import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, TabsFilterOption, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { computed, ref } from "vue";
import { message } from "ant-design-vue";

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

  const statusRef = dict({
    url: "/mock/dicts/OpenStatusEnum?single"
  });
  const formLayoutRef = ref("inline");
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      search: {
        validate: true,
        initialForm: {
          //查询默认值
          radio: "1"
        },
        options: {
          layout: formLayoutRef
        },
        formItem: {
          labelCol: {
            //固定label宽度
            span: null,
            style: {
              width: "100px"
            }
          }
        },
        container: {
          action: {
            col: {
              span: 6
            }
          }
        },
        buttons: {
          custom: {
            text: "label上置",
            show: true,
            order: 3,
            class: "fs-test",
            icon: {
              icon: "ant-design:search",
              style: {
                "font-size": "16px"
              }
            },
            click() {
              formLayoutRef.value = formLayoutRef.value === "vertical" ? "inline" : "vertical";
            }
          }
        }
      },
      tabs: {
        name: "radio",
        show: true,
        type: "card",
        options: computed(() => {
          return statusRef.data as TabsFilterOption[];
        })
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
        radio: {
          title: "状态",
          search: {
            show: true,
            rules: [
              {
                required: true,
                message: "请选择状态"
              }
            ]
          },
          type: "dict-radio",
          dict: statusRef
        },
        text: {
          title: "默认值",
          type: "text",
          search: {
            show: true,
            value: "2"
          }
        },
        customRender: {
          title: "自定义render",
          search: {
            show: true
          },
          type: "text",
          form: {
            component: {
              vModel: "checked",
              render({ attrs }) {
                return <a-switch {...attrs} />;
              },
              title: "自定义render，可以继承component的属性,可以触发search的自动查询"
            }
          }
        },
        customRender2: {
          title: "自定义render2",
          search: {
            show: true
          },
          type: "text",
          form: {
            component: {
              render({ form }) {
                //注意此处的v-model写法
                return <a-switch v-model={[form.customRender2, "checked"]} title={"render配置在component之下，注意vModel的写法,不能触发search的自动查询"} />;
              }
            }
          }
        },
        customRender3: {
          title: "自定义render3",
          search: {
            show: true
          },
          type: "text",
          form: {
            render({ form }) {
              //注意此处的v-model写法
              return <a-switch v-model={[form.customRender3, "checked"]} title={"render配置在form之下，注意vModel的写法,不能触发search的自动查询"} />;
            }
          }
        }
      }
    }
  };
}
