<template>
  <div class="h-100" style="position: relative">
    <div
      class="px-8 pt-4 d-flex align-center"
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
      />
      <v-btn class="ml-3" @click="dialog = true">Create Room</v-btn>
    </div>
    <div class="mt-14 pt-1">
      <div v-if="data.length != 0">
        <v-card
          v-for="i in data"
          class="my-4"
          @click="goToRoomView(i.roomId)"
          :key="i"
        >
          <v-card-title>{{ i.roomName }}</v-card-title>
          <v-card-text>
            {{ i.roomDescription ?? "" }} <br v-if="i.roomDescription" />
            {{ new Date(i.roomCreateOn).toDateString() }}
          </v-card-text>
        </v-card>
      </div>
      <div v-if="!loading.loadingState.value && data.length == 0">NoData</div>
    </div>
  </div>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Room</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items>
            <v-btn
              variant="text"
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items> -->
      </v-toolbar>
      <div class="pa-4">
        <div class="">
          <div style="color: #838383; margin-bottom: 12px">
            Room Name (Required)
          </div>
          <v-text-field
            v-model="roomName"
            placeholder="room name"
          ></v-text-field>
          <div style="color: #838383; margin-bottom: 12px">
            Description (optional)
          </div>
          <v-text-field
            v-model="description"
            placeholder="Description"
          ></v-text-field>
        </div>
      </div>
      <v-btn
        style="position: fixed; bottom: 10px; right: 10px; z-index: 300"
        @click="createRoom"
      >
        Create Room
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, inject, onUnmounted } from "vue";
import { loaderPluginSymbol } from "@/plugins/loading";
import { pollingPluginSymbol } from "@/plugins/pollingEvent";
import router from "@/router";
import { useRoomApi } from "@/composables/useApi";
const roomApi = useRoomApi();
const dialog = ref(false);
const roomName = ref("");
const description = ref("");
const loading = inject(loaderPluginSymbol)!;
const polling = inject(pollingPluginSymbol)!;
const data = computed(() =>
  _data.value.filter(
    (e: any) => !search.value || e.roomName.includes(search.value)
  )
);
const _data = ref<any>([]);
function goToRoomView(roomId: string) {
  router.push({
    name: "Room",
    params: {
      roomId: roomId,
    },
  });
  localStorage.setItem("redirectWithButtonClick", JSON.stringify(false));
}
async function createRoom() {
  const payload = { roomName: roomName.value, description: description.value };
  const data = await roomApi.createRoom(payload);
  if (!data) return;
  router.push({ name: "Room", params: { roomId: data.id } });
}
const search = ref("");
async function fetchData() {
  _data.value = await roomApi.getAllRoom();
}
onMounted(async () => {
  loading.setLoadingOn();
  await fetchData();
  //   polling.startConection(fetchData)
  loading.setLoadingOff();
});
onUnmounted(() => {
  polling.endConnection();
});
</script>
<style scoped lang="scss">
.trunt-word {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
