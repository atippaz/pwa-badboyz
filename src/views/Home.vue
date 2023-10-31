<template>
  <HelloWorld />
  <v-btn @click="router.push({ name: 'Test' })">Go Tets</v-btn>
  sadas
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router';
</script>
