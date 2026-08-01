import * as api from "./api";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";
import { request } from "/src/api/service";
import { notification } from "ant-design-vue";

const uploadAction = "http://www.docmirror.cn:7070/api/upload/form/upload";

function uploadMarkdownImage(position: number, file: File, editor: any) {
  const data = new FormData();
  data.append("file", file);

  request({
    url: uploadAction,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    timeout: 60000,
    data
  })
    .then((path) => {
      editor.$img2Url(position, "http://www.docmirror.cn:7070" + path);
    })
    .catch(() => {
      notification.error({ message: "图片上传失败" });
    });
}

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
        wrapper: {
          width: "90%"
        }
      },
      columns: {
        id: {
          title: "ID",
          type: "number",
          column: { width: 80 },
          form: { show: false }
        },
        title: {
          title: "标题",
          type: "text",
          column: { width: 240 },
          form: { col: { span: 24 } }
        },
        split: {
          title: "左右双栏",
          type: "editor-markdown",
          column: { show: false },
          form: {
            helper: "左侧编辑 Markdown 源码，右侧实时预览，支持上传图片",
            col: { span: 24 },
            component: {
              subfield: true,
              onImgAdd: uploadMarkdownImage
            }
          }
        }
      }
    }
  };
}
