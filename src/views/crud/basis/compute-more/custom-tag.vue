<template>
  <a-tag :color="color">
    {{ color }}
  </a-tag>
</template>

<script setup lang="ts">
console.log("custom-tag 初始化");

const props = defineProps({
  color: {
    type: String,
    default: "red"
  }
});
</script>
