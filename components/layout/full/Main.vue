<script setup>
import { LayoutFullVerticalHeaderLanguageSwitcher } from "#components";
import { ref } from "vue";

const navbar_items = ref([
  { text: "Home", href: "#home-page", icon: "mdi-home" },
  { text: "About", href: "#about-page", icon: "mdi-information" },
  { text: "Contact", href: "#contact-page", icon: "mdi-contact-mail" },
]);
</script>

<template>
  <v-app-bar elevation="4" density="comfortable" class="custom-app-bar">
    <v-container>
      <v-row align="center" justify="space-between">
        <v-row align="center">
          <v-btn v-for="(item, index) in navbar_items" :key="index" :prepend-icon="item.icon" :to="item.href"
            variant="text">
            {{ item.text }}
          </v-btn>
        </v-row>
        <!-- Language Switcher -->
        <LayoutFullVerticalHeaderLanguageSwitcher />
      </v-row>
    </v-container>
  </v-app-bar>
</template>