<script lang="ts" setup>
import { VbenSpinner } from "../../../shadcn-ui";

import { useContentSpinner } from "./use-content-spinner";

defineOptions({ name: "LayoutContentSpinner" });

const { spinning } = useContentSpinner();
</script>
<template>
  <VbenSpinner :spinning="spinning" />
</template>
