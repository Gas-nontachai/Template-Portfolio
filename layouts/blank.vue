<script setup lang="ts">
import { RouterView } from "vue-router";

const title = ref("GGas");

useHead({
  meta: [{ content: title }],
  titleTemplate: () => {
    return "GGas login";
  },
});
</script>
<template>
  <v-app>
    <RouterView />
  </v-app>
</template>
