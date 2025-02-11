import { message } from "ant-design-vue";
import { CreateCrudOptionsProps, CreateCrudOptionsRet, dict, utils } from "@fast-crud/fast-crud";
import * as textTableApi from "/@/views/crud/component/text/api";
import createCrudOptionsText from "/@/views/crud/component/text/crud";

export default function ({}: CreateCrudOptionsProps): CreateCrudOptionsRet {
  return {
    crudOptions: {
      form: {
        wrapper: {
          onClosed(e) {
            utils.logger.info("onClosed", e);
          },
          onOpened(e) {
            utils.logger.log("onOpened", e);
          }
        },
        doSubmit({ form }: any) {
          //覆盖提交方法
          utils.logger.log("form submit:", form);
          message.info("自定义表单提交:" + JSON.stringify(form));
          //模拟后端返回错误
          return { error: true };
        },
        afterSubmit(ctx: any) {
          utils.logger.log("form after submit:", ctx);
          if (ctx.res.error === true) {
            message.warn("模拟后端返回错误，不关闭对话框");
            return false;
          }
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        helper: {
          // position: "label" // helper的展示位置全局配置
          // tooltip:{}
        }
      },
      columns: {
        name: {
          title: "最简单",
          type: "text",
          form: {
            helper: "最简单的helper"
          }
        },
        date: {
          title: "日期",
          type: "date"
        },
        slot: {
          title: "插槽"
        },
        age: {
          title: "jsx",
          type: "text",
          form: {
            helper: {
              render() {
                return <div style={"color:blue"}>jsx自定义render</div>;
              }
            }
          }
        },
        status: {
          title: "显示在label",
          type: "text",
          form: {
            rules: [{ required: true, message: "此项必填" }],
            helper: {
              position: "label",
              tooltip: {
                placement: "topLeft"
              },
              text: "在label通过tooltip方式显示的helper"
              // render() {
              //   return <div style={"color:red"}>在label通过tooltip方式显示的helper</div>;
              // }
            }
          }
        },
        tableSelect: {
          title: "表格选择",
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
            value: 1,
            component: {
              crossPage: true,
              createCrudOptions: createCrudOptionsText
            }
          }
        }
      }
    }
  };
}
