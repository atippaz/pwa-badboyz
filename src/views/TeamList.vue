<template>
  <div class="h-100" style="position: relative">
      <div class="px-4 d-flex mt-2 align-center" style="
              position: fixed;
              top: 50px;
              right: 0px;
              z-index: 1000;
              width: calc(100vw);
              background-color: #fafbfd;
          ">
          <v-text-field variant="underlined" v-model="search" placeholder="search room"></v-text-field>
          <v-btn class="ml-4"  @click="deleteAllTeam">ลบทีมทั้งหมด</v-btn>
      </div>
      <div class="mt-12 pt-2">
          <div v-if="data.length != 0">
              <v-card v-for="i in data" class="my-4" @click="
                  $router.push({
                      name: 'TeamView',
                      params: {
                          teamId: i.teamId,
                      },
                  })
                  " :key="i">
                  <v-card-title>{{ i.teamName }}</v-card-title>
                  <v-card-text>
                      <div class="d-flex" style="overflow-x: hidden">
                          <div class="trunt-word">
                              <span v-for="(n, nIndex) in i.allTeam" :key="nIndex">
                                  ทีม {{ n.member.join(' , ') }} &emsp;
                              </span>
                          </div>
                      </div>
                  </v-card-text>
              </v-card>
          </div>
          <div v-if="!loading.loadingState.value && data.length == 0">
              NoData
          </div>
      </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, inject, onUnmounted } from 'vue'
import { loaderPluginSymbol } from '@/plugins/loading'
import { pollingPluginSymbol } from '@/plugins/pollingEvent'
import { useRoute } from 'vue-router';
import { json } from 'stream/consumers';
const route = useRoute()
const roomId = route.params.roomId
const loading = inject(loaderPluginSymbol)!
const polling = inject(pollingPluginSymbol)!
const data = computed(() =>
  _data.value.filter(
      (e: any) => !search.value || e.roomName.includes(search.value)
  )
)
const _data = ref<any>([])
const search = ref('')
async function fetchData() {
  _data.value = await fetch(`https://bad-boy-service.vercel.app/team/?roomId=${roomId}`).then(
      (e) => e.json()
  )
}
async function deleteAllTeam(){
  _data.value = await fetch(`https://bad-boy-service.vercel.app/deleteRoom/${roomId}`).then(
      (e) => e.json()
  )
  fetchData()
}
onMounted(async () => {
  loading.setLoadingOn()
  await fetchData()
  // polling.startConection(fetchData)
  loading.setLoadingOff()
})
onUnmounted(() => {
  polling.endConnection()
})
</script>
<style scoped lang="scss">
.trunt-word {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>