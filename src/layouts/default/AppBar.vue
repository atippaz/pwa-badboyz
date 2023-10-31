<template>
  <v-app-bar density="default" class="rounded-b-lg elevation-4">
    <template v-slot:prepend>
      <!-- <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon> -->
    </template>

    <v-app-bar-title class="font-weight-bold d-flex justify-center pa-0 ma-0">
      <span class="font-weight-bold text-primary"> BadBoy </span>
    </v-app-bar-title>
  </v-app-bar>
  <!-- <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list :items="items"></v-list>
  </v-navigation-drawer> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>