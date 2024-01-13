<template>
  <v-app>
    <default-bar />
    <div class="mx-4 mt-10 mb-10 h-100">
      <default-view class="h-100" />
    </div>
    <v-bottom-navigation :elevation="6" :model-value="route.name" @update:model-value="(e)=>goPage(e)" grow :active="true">
      <!-- <v-btn @click="$router.back()">
              <v-icon>mdi-arrow-left</v-icon>
              Back
          </v-btn> -->

      <v-btn value="Rooms" >
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn value="Room">
        <v-icon>mdi-plus-circle-outline</v-icon>
        Create Team
      </v-btn>
      <!-- <v-btn @click="goPage('RoomListPage')">
        <v-icon>mdi-list-box-outline</v-icon>
        RoomList
      </v-btn> -->
      <v-btn value="TeamList">
        <v-icon>mdi-list-box-outline</v-icon>
        View Team
      </v-btn>
      <!-- <v-btn @click="goPage('HomePageOld')">
        <v-icon>mdi-home</v-icon>
        old v.
      </v-btn> -->
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts" setup>
import router from '@/router'
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import { pageStatePluginSymbol } from '@/plugins/pageState'
import { inject } from 'vue'
import { useRoute } from 'vue-router'
const pageState = inject(pageStatePluginSymbol)!
const route = useRoute()

const roomId = route.params.roomId

function goPage(name: string) {
  // if (pageState.isCreateTeam.value) {
  //     if (!confirm('ต้องการเปลี่ยนหน้าหรือไม่')) return
  // }
  pageState.resetCreateRoomTeam()
if(name == 'Rooms'){
  localStorage.setItem('redirectWithButtonClick',JSON.stringify(true))
}
  router.push({ name: name ,params:{roomId:roomId}})
  
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