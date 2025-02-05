<script setup lang="ts">
import { RouterView } from 'vue-router';

const title = ref("Portfolio's Nontachai");

useHead({
  meta: [{ content: title }],
  titleTemplate: () => {
    return "Portfolio's Nontachai";
  },
  link: [
    { rel: 'icon', href: '@/assets/images/logo/portfolio.png' }
  ]
});
</script>

<template>
  <v-locale-provider>
    <v-app>
      <LayoutFullMain />
      <v-main>
        <v-container fluid class="page-wrapper">
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
