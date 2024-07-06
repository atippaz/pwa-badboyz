<template>
  <div class="h-100">
    <div class="d-flex justify-space-between">
      <div>
        <h1>ห้อง : {{ roomName }}</h1>
      </div>
      <v-btn @click="deleteTeam"> ลบห้อง</v-btn>
    </div>
    <v-carousel hide-delimiters :model-value="set ? 0 : null" class="h-100">
      <v-carousel-item v-for="(item, i) in set">
        <div>
          <div class="mb-2" style="font-size: 20px; font-weight: bold">
            ทีมปัจจุบัน
          </div>
          <div>
            <CardVersus
              v-for="(team, index) in item.courtTeam"
              class="mb-4"
              :set-name="`เซ็ตที่ ${i + 1}`"
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
                v-for="team in item.nextTeam"
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
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import CardVersus from "@/components/page/teamListView/CardTeamVersus.vue";
import useMatchSetApi from "@/composables/useApi/useMatchSetApi";
import { onMounted, ref, inject } from "vue";
import { useRoute } from "vue-router";
import { loaderPluginSymbol } from "@/plugins/loading";
import router from "@/router";

const route = useRoute();
const matchSetApi = useMatchSetApi();
const loading = inject(loaderPluginSymbol)!;

const setId = route.params.setId as string;

const set = ref<any>([]);
const roomName = ref();
const courtNumber = ref(0);
const teamLimit = ref(0);

async function deleteTeam() {
  await matchSetApi.deleteSetById(setId as string);
  router.push({ name: "TeamList" });
}

function setTeam(_team: any) {
  _team.allTeam.forEach((team: any) => {
    const needTeam = courtNumber.value * 2;
    const courtTeam = [];
    console.log(team);
    for (let index = 0; index < needTeam; index += 1) {
      if (index % 2 !== 0) {
        courtTeam.push({
          teamA: team.set[index - 1],
          teamB: team.set[index],
        });
      }
    }
    const nextTeam: any = [];
    team.set.forEach((e: any, index: number) => {
      if (index >= needTeam) {
        nextTeam.push(e);
      }
    });
    set.value.push({ courtTeam: courtTeam, nextTeam: nextTeam });
  });
}
onMounted(async () => {
  try {
    loading.setLoadingOn();

    // if (!setId) throw new Error("");
    const data = await matchSetApi.getSetById(setId);
    console.log(data);
    // if (!data) throw new Error("");

    roomName.value = data.teamName;
    courtNumber.value = data.courtNumber;
    teamLimit.value = data.teamLimit;
    setTeam(data);
    loading.setLoadingOff();

    // if (!court.value) {
    // } else {
    //     pageState.setCreateRoomTeam()
    // }
  } catch (e) {
    console.log(e);
    alert("เกิดข้อผิดพลาด");
    // router.push({ name: "Room", params: { roomId: roomId } });
    loading.setLoadingOff();
  }
});
</script>
<style scoped lang="scss">
.trunt-word {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
