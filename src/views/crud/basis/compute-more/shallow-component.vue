<template>
  <div>modelValue : {{ modelValue }}</div>
</template>

<script setup lang="ts">
type ScProps = {
  modelValue?: string;
};
const props = defineProps<ScProps>();
</script>
