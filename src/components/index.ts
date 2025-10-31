import { defineAsyncComponent } from "vue";
import CustomTag from "/@/views/crud/basis/compute-more/custom-tag.vue";

const AsyncHighLight = defineAsyncComponent(() => import("./highlight/index.vue"));
export default {
  install(app: any) {
    app.component("FsHighlight", AsyncHighLight);
    app.component("FsCustomTag", CustomTag);
  }
};
