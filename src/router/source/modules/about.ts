import { IFrameView } from "/@/vben/layouts";

export const aboutResource = [
  {
    title: "关于",
    name: "about",
    path: "/about",
    redirect: "/about/doc",
    meta: {
      icon: "lucide:copyright",
      order: 9999
    },
    children: [
      {
        title: "文档",
        name: "document",
        path: "/about/doc",
        component: IFrameView,
        meta: {
          icon: "lucide:book-open-text",
          link: "http://fast-crud.docmirror.cn/",
          title: "文档"
        }
      },
      {
        name: "Github",
        path: "/about/github",
        component: IFrameView,
        meta: {
          icon: "mdi:github",
          link: "https://github.com/fast-crud/fast-crud",
          title: "Github"
        }
      },
      {
        name: "Gitee",
        path: "/about/gitee",
        component: IFrameView,
        meta: {
          icon: "ion:logo-octocat",
          link: "https://gitee.com/fast-crud/fast-crud",
          title: "Gite"
        }
      },
      {
        title: "其他Demo",
        name: "demo",
        path: "/about/demo",
        meta: {
          icon: "ion:git-branch-outline"
        },
        children: [
          {
            title: "Element版",
            path: "/about/demo/element",
            component: IFrameView,
            meta: {
              link: "http://fast-crud.docmirror.cn/element/",
              title: "Element版"
            }
          },
          {
            title: "Naive版",
            path: "/about/demo/naive",
            component: IFrameView,
            meta: {
              link: "http://fast-crud.docmirror.cn/naive/",
              title: "Naive版"
            }
          },
          {
            title: "VbenAdmin",
            path: "/about/demo/vben",
            meta: {
              link: "http://fast-crud.docmirror.cn/vben/",
              title: "VbenAdmin"
            }
          }
        ]
      }
    ]
  }
];

export default aboutResource;
