import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, EditReq, ScopeContext, UserPageQuery, UserPageRes, utils } from "@fast-crud/fast-crud";
import { SearchOutlined } from "@ant-design/icons-vue";

export default function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
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
      columns: {
        id: {
          title: "ID",
          type: "number",
          form: { show: false }
        },
        name: {
          title: "姓名",
          type: "text", //虽然不写也能正确显示组件，但不建议省略它
          search: { show: true },
          form: {
            component: {
              maxlength: 20
            }
          },
          column: {
            formatter(scope) {
              utils.logger.info("formatter scope", scope);
              return scope.value;
            }
          }
        },
        classId: {
          title: "班级id",
          type: "number", //虽然不写也能正确显示组件，但不建议省略它
          search: { show: true }
        },
        trim: {
          title: "trim空格",
          type: "text", //虽然不写也能正确显示组件，但不建议省略它
          search: { show: true },
          form: {
            component: {
              vModel: {
                name: "value",
                trim: true
              },
              maxlength: 20
            },
            helper: "自动移除两端空格"
          }
        },
        number: {
          title: "转换为number",
          type: "text", //虽然不写也能正确显示组件，但不建议省略它
          search: { show: true },
          form: {
            component: {
              vModel: {
                name: "value",
                number: true
              },
              maxlength: 20
            },
            helper: "自动转为number"
          }
        },
        transform: {
          title: "自定义transform",
          type: "text", //虽然不写也能正确显示组件，但不建议省略它
          search: { show: true },
          form: {
            component: {
              vModel: {
                name: "value",
                transform: (value) => {
                  if (!value) {
                    return undefined;
                  }
                  return value;
                }
              },
              maxlength: 20,
              helper: "自定义transform方法，此处演示空字符串转为undefined"
            }
          }
        },
        long: {
          title: "演示Text很长时如何很好的展示",
          type: "text",
          column: {
            ellipsis: true,
            showTitle: true
          }
        },
        search: {
          title: "搜索",
          type: "text",
          form: {
            component: {
              addonAfter: "后置",
              suffix: "suffix",
              children: {
                addonBefore() {
                  return <SearchOutlined />;
                }
              }
            }
          }
        },
        password: {
          title: "密码",
          type: "password",
          column: {
            //一般密码不显示在列里面
            show: false
          }
        },
        // copy: {
        //   title: "剪贴板",
        //   type: "text",
        //   column: {
        //     cellRender({ value, row }) {
        //       const content = (
        //         <div>
        //           {value}
        //           <a-tag style={{ cursor: "pointer" }}>复制</a-tag>
        //         </div>
        //       );
        //       const clipboard = resolveDirective("clipboard");
        //       return withDirectives(content, [[clipboard, value]]);
        //     }
        //   }
        // },
        copy: {
          title: "剪贴板",
          type: ["text", "copyable"]
        },
        intro: {
          title: "简介",
          type: "textarea",
          form: {
            component: { showWordLimit: true, maxlength: 200 }
          },
          column: {
            ellipsis: true,
            showTitle: true
          }
        },
        render: {
          title: "复杂输入(render)",
          type: "text",
          form: {
            title: "复杂输入",
            component: {
              render(context: ScopeContext) {
                utils.logger.info("context scope", context);
                return (
                  <a-input-group compact>
                    <a-input placeholder={"render1 input"} style={{ width: "50%" }} v-model={[context.form.render, "value"]} />
                    <a-input placeholder={"render2 input"} style={{ width: "50%" }} v-model={[context.form.render2, "value"]} />
                  </a-input-group>
                );
              }
            }
          }
        },
        render2: {
          title: "我的值是由复杂输入列输入的",
          type: "text",
          column: {
            width: 300
          },
          form: {
            show: false
          }
        }
      }
    }
  };
}
