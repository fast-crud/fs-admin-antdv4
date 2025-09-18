<template>
  <a-input :placeholder="randomRef"> </a-input>
</template>

<script setup lang="ts">
import { ref } from "vue";
console.log("custom-component 初始化");
const randomRef = ref(Math.random());
</script>
