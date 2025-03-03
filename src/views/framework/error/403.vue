<template>
  <a-result status="403" title="403" sub-title="Sorry,  拒绝访问 .">
    <template #extra>
      <a-button type="primary" @click="toHome">返回首页（ Back Home ） </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Exception403",
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
