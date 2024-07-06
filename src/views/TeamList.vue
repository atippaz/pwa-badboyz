<template>
  <div class="h-100" style="position: relative">
    <div
      class="px-4 d-flex mt-2 align-center"
      style="
        position: fixed;
        top: 50px;
        right: 0px;
        z-index: 1000;
        width: calc(100vw);
        background-color: #fafbfd;
      "
    >
      <v-text-field
        variant="underlined"
        v-model="search"
        placeholder="search room"
      ></v-text-field>
      <v-btn class="ml-4" @click="deleteAllTeam">ลบทีมทั้งหมด</v-btn>
    </div>
    <div class="mt-12 pt-2">
      <div v-if="data.length != 0">
        team
        <v-card
          v-for="i in data"
          class="my-4"
          @click="
            $router.push({
              name: 'TeamView',
              params: {
                teamId: i.teamId,
              },
            })
          "
          :key="i"
        >
          <v-card-title>{{ i.teamName }}</v-card-title>
          <v-card-text>
            <div class="d-flex" style="overflow-x: hidden">
              <div class="trunt-word">
                <span v-for="(n, nIndex) in i.allTeam" :key="nIndex">
                  ทีม {{ n.member.join(" , ") }} &emsp;
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div v-if="set.length != 0">
        set
        <v-card
          v-for="i in set"
          class="my-4"
          @click="
            $router.push({
              name: 'SetView',
              params: {
                setId: i.setId,
              },
            })
          "
          :key="i"
        >
          <v-card-title>{{ i.teamName }}</v-card-title>
          <v-card-text>
            <div class="d-flex" style="overflow-x: hidden">
              <div class="trunt-word">
                <span v-for="(n, nIndex) in i.allTeam" :key="nIndex">
                  set {{ nIndex + 1 }}
                  {{
                    n.set
                      .map((m: any, o: number) => `team ที่${o + 1}`)
                      .join(", ")
                  }}
                  &emsp;
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div
        v-if="
          !loading.loadingState.value && data.length == 0 && set.length == 0
        "
      >
        NoData
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, inject } from "vue";
import { loaderPluginSymbol } from "@/plugins/loading";
import { useRoute } from "vue-router";
import useRoomApi from "@/composables/useApi/useRoomApi";
const roomApi = useRoomApi();
const route = useRoute();
const roomId = route.params.roomId as string;
const loading = inject(loaderPluginSymbol)!;
const data = computed(() =>
  _data.value.filter(
    (e: any) => !search.value || e.teamName.includes(search.value)
  )
);
const set = computed(() =>
  _set.value.filter(
    (e: any) => !search.value || e.teamName.includes(search.value)
  )
);
const _data = ref<any>([]);
const _set = ref<any>([]);

const search = ref("");
async function fetchData() {
  const { match, set } = await roomApi.getAllMatchAndMatchSetInRoom(roomId);
  _data.value = match;
  _set.value = set;
}
async function deleteAllTeam() {
  await roomApi.deleteRoomById(roomId);
  await fetchData();
}
onMounted(async () => {
  loading.setLoadingOn();
  await fetchData();
  loading.setLoadingOff();
});
</script>

<style scoped lang="scss">
.trunt-word {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
