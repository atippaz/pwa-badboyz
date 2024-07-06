<template>
  <div class="h-100">
    <div class="d-flex justify-space-between">
      <div>
        <h1>ห้อง : {{ roomName }}</h1>
      </div>
      <v-btn @click="deleteTeam"> ลบห้อง</v-btn>
    </div>
    <div class="mb-2" style="font-size: 20px; font-weight: bold">
      ทีมปัจจุบัน
    </div>
    <div>
      <CardVersus
        v-for="(team, index) in courtTeam"
        class="mb-4"
        :court-number="index + 1"
        :team-a="{ score: 0 }"
        :team-b="{ score: 0 }"
        :key="index"
      >
        <template #teamA>
          team
          {{ team.teamA.order }}
          <div
            v-for="member in team.teamA.member"
            class="trunt-word"
            :key="member"
          >
            {{ member }}
          </div>
        </template>
        <template #teamB>
          team
          {{ team.teamB.order }}
          <div
            v-for="member in team.teamB.member"
            class="trunt-word"
            :key="member"
          >
            {{ member }}
          </div>
        </template>
      </CardVersus>
    </div>
    <div>
      <div class="mb-2" style="font-size: 20px; font-weight: bold">
        ทีมต่อไป
      </div>
      <div>
        <v-card
          v-for="team in nextTeam"
          class="mb-2"
          elevation="0"
          style="border-radius: 8px; border: 1px solid rgb(203, 203, 203)"
          :key="team"
        >
          <template v-slot:text>
            team {{ team.order }} : {{ team.member.join(" , ") }}
          </template>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardVersus from "@/components/page/teamListView/CardTeamVersus.vue";
import useMatchApi from "@/composables/useApi/useMatchApi";
import { loaderPluginSymbol } from "@/plugins/loading";
import { onMounted, ref, inject } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
const route = useRoute();
const matchApi = useMatchApi();
const loading = inject(loaderPluginSymbol)!;

const roomId = route.params.roomId;
const teamId = route.params.teamId as string;

const nextTeam = ref<any>([]);
const courtTeam = ref<any>([]);
const roomName = ref();
const courtNumber = ref(0);
const teamLimit = ref(0);
async function deleteTeam() {
  await matchApi.deleteTeamById(teamId);
  router.push({ name: "TeamList" });
}

function setTeam(team: any) {
  const needTeam = courtNumber.value * 2;

  for (let index = 0; index < needTeam; index += 1) {
    if (index % 2 !== 0) {
      courtTeam.value.push({
        teamA: team.allTeam[index - 1],
        teamB: team.allTeam[index],
      });
    }
  }
  team.allTeam.forEach((e: any, index: number) => {
    if (index >= needTeam) {
      nextTeam.value.push(e);
    }
  });
}
onMounted(async () => {
  loading.setLoadingOn();
  try {
    if (!teamId) throw new Error("");
    const data = await matchApi.getMatchById(teamId);
    if (!data) throw new Error("");
    roomName.value = data.teamName;
    courtNumber.value = data.courtNumber;
    teamLimit.value = data.teamLimit;
    setTeam(data);
  } catch (e) {
    console.log(e);
    alert("เกิดข้อผิดพลาด");
    router.push({ name: "Room", params: { roomId: roomId } });
  }
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
