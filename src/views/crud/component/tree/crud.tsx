import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
export default function ({ crudExpose }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }: EditReq) => {
    if(form.id==null){
      form.id = row.id;
    };
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }: DelReq) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }: AddReq) => {
    return await api.AddObj(form);
  };

  const lazyloadDictRef = dict({
    data: [
      {
        id: "0",
        label: "Root",
        value: "0"
      }
    ]
  });
  const genTreeNode = (parentId: number, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      label: isLeaf ? "Tree Node" : "Expand to load",
      isLeaf
    };
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
        tree: {
          title: "树形选择",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData?single"
          })
        },
        multiple: {
          title: "多选",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/cascaderData?single"
          }),
          form: {
            component: {
              "tree-checkable": true
            },
            rules: [{ required: true, message: "请选择" }]
          }
        },
        fieldReplace: {
          title: "修改options的value字段名",
          search: { show: false },
          type: "dict-tree",
          dict: dict({
            isTree: true,
            url: "/mock/dicts/littlePca",
            value: "code",
            label: "name"
          }),
          form: {
            component: {
              fieldNames: { label: "name", key: "code", value: "code" }
            }
          }
        },
        lazy: {
          title: "懒加载",
          search: { show: false },
          type: "dict-tree",
          dict: lazyloadDictRef,
          form: {
            component: {
              "tree-data-simple-mode": true,
              loadData: (treeNode: any) => {
                return new Promise((resolve: (value?: unknown) => void) => {
                  const { id } = treeNode.dataRef;
                  setTimeout(() => {
                    lazyloadDictRef.data = lazyloadDictRef.data.concat([genTreeNode(id, false), genTreeNode(id, true)]);
                    resolve();
                  }, 300);
                });
              }
            }
          }
        }
      }
    }
  };
}
