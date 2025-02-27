<script lang="ts" setup>
import type { DropdownMenuProps } from "../../../shadcn-ui";

import { ChevronDown } from "../../../icons";
import { VbenDropdownMenu } from "../../../shadcn-ui";

defineProps<DropdownMenuProps>();
</script>

<template>
  <VbenDropdownMenu :menus="menus" :modal="false">
    <div class="flex-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-2 text-lg font-semibold">
      <ChevronDown class="size-4" />
    </div>
  </VbenDropdownMenu>
</template>
