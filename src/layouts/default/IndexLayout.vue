<template>
  <v-app>
    <default-bar />
    <div class="mx-4 mt-10 mb-10 h-100">
      <default-view class="h-100" />
    </div>
    <v-bottom-navigation
      :elevation="6"
      grow
      :active="true"
      :model-value="route.name"
      @update:model-value="(e) => goPage(e)"
    >
      <!-- <v-btn @click="$router.back()">
              <v-icon>mdi-arrow-left</v-icon>
              Back
          </v-btn> -->

      <!-- <v-btn @click="goPage('HomePage')">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn> -->

      <v-btn value="Rooms">
        <v-icon>mdi-list-box-outline</v-icon>
        RoomList
      </v-btn>
      <!-- <v-btn @click="goPage('TestPage')">
        <v-icon>mdi-cog-outline</v-icon>
        Test
      </v-btn> -->
      <v-btn value="Spending">
        <v-icon>mdi-home</v-icon>
        คิดเงินค่าคอร์ท
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts" setup>
import router from "@/router";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import { pageStatePluginSymbol } from "@/plugins/pageState";
import { inject } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const localStorageRedirect = localStorage.getItem("redirectWithButtonClick");
const redirectWithButtonClick =
  localStorageRedirect != null ? JSON.parse(localStorageRedirect) : false;
console.log(redirectWithButtonClick);

(async () => {
  console.log("a");

  if (!redirectWithButtonClick) {
    const roomId = localStorage.getItem("roomId");
    console.log(roomId);

    if (roomId != null) {
      localStorage.setItem("redirectWithButtonClick", JSON.stringify(false));
      router.push({ name: "Room", params: { roomId: roomId } });
    } else {
      const response = await fetch(
        `https://bad-boy-service.vercel.app/getRoomId`
      ).then((e) => e.json());
      console.log(response);
      if (response.length != 0) {
        router.push({ name: "Room", params: { roomId: response[0] } });
      }
    }
  }
})();
const pageState = inject(pageStatePluginSymbol)!;
function goPage(name: string) {
  // if (pageState.isCreateTeam.value) {
  //     if (!confirm('ต้องการเปลี่ยนหน้าหรือไม่')) return
  // }

  pageState.resetCreateRoomTeam();
  router.push({ name: name });
}
</script>
<style scoped lang="scss">
.v-dialog {
  position: absolute;
  bottom: 0;
  right: 0;
}

.v-overlay__content {
  margin: 0px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: auto;
}

.my-custom-dialog {
  align-self: flex-end;
}
</style>
