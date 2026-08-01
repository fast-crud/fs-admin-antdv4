import mockUtil from "/src/mock/base";

const markdown = `# fast-crud Markdown

## Markdown editor

Edit the source on the left and see the rendered preview on the right.

> mavonEditor works with the fast-crud \`editor-markdown\` field type.

\`\`\`ts
const column = {
  type: "editor-markdown"
};
\`\`\``;

const options: any = {
  name: "ComponentMarkdown",
  idGenerator: 0
};

options.list = [
  {
    title: "Markdown 编辑器",
    split: markdown
  }
];

export default mockUtil.buildMock(options);
