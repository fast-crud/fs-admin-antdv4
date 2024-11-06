import { CreateCrudOptionsProps, CreateCrudOptionsRet } from "@fast-crud/fast-crud";
import { ref } from "vue";

export default async function ({ crudExpose }: CreateCrudOptionsProps): Promise<CreateCrudOptionsRet> {
  let idGen = 1;
  function nextId() {
    return idGen++;
  }
  const { crudBinding } = crudExpose;
  const expandedRowKeys = ref([]);
  return {
    crudOptions: {
      //将 addRow 按钮启用
      actionbar: {
        buttons: {
          add: { show: false },
          addRow: {
            show: true
            // click: async () => {
            //   crudExpose.editable.addRow({
            //     active: true,
            //     addRowFunc: () => {
            //       const row = { id: nextId() };
            //       crudBinding.value.data.push(row);
            //       return row;
            //     }
            //   });
            // }
          }
        }
      },
      mode: {
        name: "local",
        isMergeWhenUpdate: true,
        isAppendWhenAdd: true
      },
      table: {
        expandedRowKeys: expandedRowKeys,
        "onUpdate:expandedRowKeys": (keys: any) => {
          expandedRowKeys.value = keys;
        },
        editable: {
          enabled: true,
          mode: "row",
          // activeDefault: true,
          exclusive: true, //排他式激活
          exclusiveEffect: "save" //排他式激活时，其他行的编辑状态的处理方式
        }
      },
      rowHandle: {
        width: 350,
        group: {
          editRow: {
            addChild: {
              text: "添加子菜单",
              click: async ({ row }) => {
                const newRow = { id: nextId(), parentId: row.id };
                if (!row.children) {
                  row.children = [];
                }
                crudExpose.editable.addRow({
                  active: true,
                  addRowFunc: () => {
                    expandedRowKeys.value.push(row.id);
                    row.children.push(newRow);
                    return newRow;
                  }
                });
              }
            }
          }
        }
      },
      columns: {
        id: {
          title: "ID",
          type: "number",
          form: {
            show: false
          },
          column: { width: 80, align: "center" }
        },
        title: {
          title: "标题",
          type: "text",
          form: {
            rules: [{ required: true, message: "请输入标题" }]
          }
        },
        icon: {
          title: "图标",
          type: "text",
          form: {
            rules: [{ required: true, message: "请选择图标" }]
          }
        },
        link: {
          title: "链接",
          type: "link",
          form: {
            rules: [{ required: true, message: "请输入链接" }]
          }
        }
      }
    }
  };
}
