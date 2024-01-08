<template>
    <div>
        <div class="d-flex" v-for="i in _data" :key="i">
        <div v-for="j in i.allTeam" :key="j">
        {{ j.member }}
    </div>
    <br>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref } from 'vue';

const _data = ref()
onMounted(async() => {
    await fetchData()
})
async function fetchData() {
  _data.value = await fetch(`https://bad-boy-service.vercel.app/team/?roomId=${'659bbdf2e21783acc96e76ab'}`).then(
      (e) => e.json()
  )
}
</script>