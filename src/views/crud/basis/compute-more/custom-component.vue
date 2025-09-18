<template>
  <div>random:{{ randomRef }} <a-input v-bind="attrs"></a-input></div>
</template>

<script setup lang="ts">
import { ref, useAttrs } from "vue";

console.log("custom-component 初始化");
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});
const attrs = useAttrs();
const randomRef = ref(Math.random());
</script>
