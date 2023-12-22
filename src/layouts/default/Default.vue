<template>
  <v-app>
    <default-bar />
    <div class="mx-4 mt-10 mb-10 h-100">
      <default-view class="h-100" />
    </div>
    <v-bottom-navigation :elevation="6" grow :active="true">
      <!-- <v-btn @click="$router.back()">
              <v-icon>mdi-arrow-left</v-icon>
              Back
          </v-btn> -->

      <v-btn @click="goPage('HomePage')">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>
      
      <v-btn @click="goPage('RoomListPage')">
        <v-icon>mdi-list-box-outline</v-icon>
        RoomList
      </v-btn>
      <v-btn @click="goPage('TestPage')">
        <v-icon>mdi-cog-outline</v-icon>
        Test
      </v-btn>
      <v-btn @click="goPage('HomePageOld')">
        <v-icon>mdi-home</v-icon>
        old v.
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts" setup>
import router from '@/router'
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import { pageStatePluginSymbol } from '@/plugins/pageState'
import { inject } from 'vue'
const pageState = inject(pageStatePluginSymbol)!
function goPage(name: string) {
  // if (pageState.isCreateTeam.value) {
  //     if (!confirm('ต้องการเปลี่ยนหน้าหรือไม่')) return
  // }
  pageState.resetCreateRoomTeam()
  router.push({ name: name })
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
}</style>