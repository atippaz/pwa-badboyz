<template>
    {{ a }} <v-btn @click="load">async</v-btn>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const a = ref(await getConfirmResult())
async function getConfirmResult() {
    // openLocal.value = true
    console.log('promise')

    await new Promise((resolve: Function) => setTimeout(() => resolve(), 5000))
    console.log('fi')
    return 'a'
}
async function load() {
    a.value = await getConfirmResult()
}
</script>