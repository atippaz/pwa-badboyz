<template>
  <div>
    <div class="h-100">
      <div>
        <v-container class="pa-0 ma-0">
          <v-row no-gutters class="h-100">
            <v-col cols="12">
              <div style="color: #838383; margin-bottom: 12px">
                Room Name : {{ roomData?.roomName }}
              </div>
            </v-col>
            <v-col align-self="start" cols="12">
              <div>
                <div style="color: #838383; margin-bottom: 12px">
                  Team Name (ไม่ต้องใส่ก็ได้)
                </div>
                <v-text-field
                  v-model="setName"
                  placeholder="team name"
                ></v-text-field>
              </div>
              <div :class="{}">
                <div>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <div class="mb-1 text-gray-text" style="font-size: 18px">
                      กรอกรายชื่อทีม
                    </div>
                  </div>
                  <v-textarea
                    v-model="textTeam"
                    placeholder="
ตีแบดวันอาทิตย์ 18.30-20.30
1.xxx
2.xxx"
                    @change="setMember"
                  >
                  </v-textarea>
                </div>
                <div>
                  <div style="color: #838383; margin-bottom: 12px">ล็อคคู่</div>
                  <div>
                    <div v-for="(lock, indexl) in teamLocks" :key="lock.teamId">
                      <v-row class="d-flex">
                        <v-col v-for="(i, index) in teamLimit" :key="index">
                          <v-text-field
                            density="compact"
                            type="text"
                            v-model="lock.teamMember[index]"
                          />
                        </v-col>
                        <v-col>
                          <v-btn
                            class="w-100 bg-error text-white"
                            rounded="xl"
                            variant="flat"
                            @click="deleteLockTeam(indexl)"
                            >ลบ</v-btn
                          >
                        </v-col>
                      </v-row>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn
                        variant="flat"
                        @click="addLockTeam"
                        class="w-100 text-primary"
                        style="background-color: #f1f2ff"
                        rounded="xl"
                        >เพิ่มทีม</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div class="d-flex justify-end">
                    <div>
                      <v-switch
                        color="primary"
                        label="สุ่มเเบบไม่ซ้ำกัน"
                        v-model="paringSet"
                        :disabled="member.length < 2"
                      ></v-switch>
                    </div>
                  </div>
                  <div v-if="paringSet && member.length >= 2">
                    <div style="color: #838383; margin-bottom: 12px">
                      จำนวนรอบทีมมากที่สุด
                      {{ member.length <= 0 ? "" : `(${member.length - 1})` }}
                    </div>
                    <v-text-field
                      readonly
                      v-model="teamLimittParing"
                      density="compact"
                    >
                      <template v-slot:append-inner>
                        <div class="d-flex">
                          <v-icon
                            class="click-btn"
                            color="red"
                            @click="
                              () => {
                                if (teamLimittParing > 1) teamLimittParing -= 1;
                              }
                            "
                          >
                            mdi-minus
                          </v-icon>
                          <v-icon
                            class="ml-1 click-btn"
                            color="green"
                            @click="
                              () => {
                                if (teamLimittParing < member.length - 1) {
                                  teamLimittParing++;
                                }
                              }
                            "
                          >
                            mdi-plus
                          </v-icon>
                        </div>
                      </template>
                    </v-text-field>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-space-between my-2">
                <div
                  style="font-size: 12px; color: #838383"
                  class="d-flex align-center"
                >
                  <div v-if="!showAdvanceSetting">
                    ตั้งค่าเพิ่มเติมที่ปุ่มข้างๆ
                  </div>
                </div>
                <div @click="showAdvanceSetting = !showAdvanceSetting">
                  <span class="text-primary">Advance Settings</span>
                  <span>
                    <v-icon
                      color="primary"
                      :style="{
                        transform: showAdvanceSetting ? '' : 'scaleY(-1)',
                      }"
                    >
                      mdi-chevron-up
                    </v-icon>
                  </span>
                </div>
              </div>
              <div v-if="showAdvanceSetting">
                <TeamAdvanceSetting
                  v-model:court-number="courtNumber"
                  v-model:team-limit="teamLimit"
                  v-model:win-streak="winStreak"
                  @update:win-score="(e: number) => {
                    winScore = e
                  }"
                ></TeamAdvanceSetting>
              </div>
            </v-col>
            <v-col cols="12">
              <div>
                <v-btn
                  variant="flat"
                  @click="createTeam"
                  class="w-100 mt-4 text-white bg-primary"
                  rounded="xl"
                  >สร้างทีม</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12">
              <div>
                <v-btn
                  variant="flat"
                  @click="deleteAllData"
                  class="w-100 mt-4 text-white bg-error"
                  rounded="xl"
                  >ลบข้อมูลทั้งหมด</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <!-- <v-btn style="position: fixed; bottom: 80px; right: 16px; z-index: 300" @click="createTeam"
       >
        สร้างทีม
      </v-btn> -->
  </div>
</template>
<script setup lang="ts">
import { useTeamStore } from "@/store/team";
import { useCourtStore } from "@/store/court";
import TeamAdvanceSetting from "@/components/page/randomTeam/AdvanceSetting.vue";
import router from "@/router";
import type { TeamMember } from "@/store/team";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, inject, watch } from "vue";
import { loaderPluginSymbol } from "@/plugins/loading";
import { useRoute } from "vue-router";
const paringSet = ref<boolean>(false);
const showAdvanceSetting = ref(false);
const setName = ref("");
const teamLimittParing = ref<number>(1);
const { setTeamLimit, addTeamMember, resetTeam, addNewTeam, setTeam } =
  useTeamStore();
const { setCourtNumber, setWinScore, setWinStreak } = useCourtStore();
const { teamMember, teamState } = storeToRefs(useTeamStore());
const openSat = computed(() => saturdayMember.value.length != 0);
const openSun = computed(() => sundayMember.value.length != 0);
interface TeamLock {
  teamId: number;
  teamMember: string[];
}
const teamLockList = computed(() => teamLocks.value);
const teamLocks = ref<TeamLock[]>([]);
const textTwoDay = ref("");
const courtNumber = ref(
  isNaN(parseInt(localStorage.getItem("courtNumber") ?? ""))
    ? 1
    : parseInt(localStorage.getItem("courtNumber")!)
);
const winStreak = ref(
  isNaN(parseInt(localStorage.getItem("winStreak") ?? ""))
    ? 2
    : parseInt(localStorage.getItem("winStreak")!)
);
const teamLimit = ref(
  isNaN(parseInt(localStorage.getItem("teamLimit") ?? ""))
    ? 2
    : parseInt(localStorage.getItem("teamLimit")!)
);
const winScore = ref(
  isNaN(parseInt(localStorage.getItem("winScore") ?? ""))
    ? 15
    : parseInt(localStorage.getItem("winScore")!)
);
teamLocks.value =
  localStorage.getItem("teamLock") != null
    ? JSON.parse(localStorage.getItem("teamLock")!)
    : [];
const openCopyDay = ref(false);
const textTeam = ref(localStorage.getItem("textTeam") ?? "");
const member = ref<string[]>([]);
const saturdayMember = ref("");
const sundayMember = ref("");
const loading = inject(loaderPluginSymbol)!;
const roomData = ref();
const route = useRoute();
const roomId = route.params.roomId;
localStorage.setItem("roomId", roomId.toString());
watch(
  () => textTwoDay.value,
  (newValue) => {
    openCopyDay.value = false;
  }
);
onMounted(async () => {
  loading.setLoadingOn();
  roomData.value = await fetch(
    `https://bad-boy-service.vercel.app/room/${roomId}`
  ).then((e) => e.json());
  //   polling.startConection(fetchData)
  loading.setLoadingOff();
});
function addLockTeam() {
  const newTeamLock: TeamLock = {
    teamId: teamLocks.value.length + 1,
    teamMember: [],
  };
  for (let index = 0; index < teamLimit.value; index++) {
    newTeamLock.teamMember.push("");
  }
  teamLocks.value.push(newTeamLock);
}
function deleteLockTeam(teamlockIndex: number) {
  teamLocks.value.splice(teamlockIndex, 1);
}
function deleteAllData() {
  courtNumber.value = 1;
  localStorage.setItem("courtNumber", courtNumber.value.toString());
  winStreak.value = 2;
  localStorage.setItem("winStreak", winStreak.value.toString());
  teamLimit.value = 2;
  localStorage.setItem("teamLimit", teamLimit.value.toString());
  winScore.value = 15;
  localStorage.setItem("winScore", winScore.value.toString());
  localStorage.removeItem("teamLock");
  localStorage.removeItem("textTeam");
  textTeam.value = "";
  teamLocks.value = [];
}
function getFormat() {
  navigator.clipboard.writeText(`ตีแบดวันเสาร์ xx.xx-xx.xx
1.xxx
2.xxxx
--------

ตีแบดวันอาทิตย์ xx.xx-xx.xx
1.xxx
2.xxxx
`);
}

function SplitTeam(): string[] | null {
  try {
    const text = textTeam.value.split("\n");
    let pattern = [/ตีเเบด/, /ตีแบด/, /วันอาทิตย์/, /วันเสาร์/];
    if (text.length < 1) return null;

    if (pattern.some((x) => x.test(text[0]))) {
      text.splice(0, 1);
    }
    return text.map((x) => {
      const patternInner = /(\d+\.)+/g;
      const test = x.match(patternInner);
      return test ? x.replace(patternInner, "") : x;
    });
  } catch (ex) {
    return null;
  }
}

function generateMember() {
  return textTeam.value.split("\n").length > 0
    ? textTeam.value.trim().split("\n")
    : [];
}
function shufferMember(member: string[]) {
  for (let i = member.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [member[i], member[j]] = [member[j], member[i]];
  }
  return member;
}
function shufferTeam(team: TeamMember[]) {
  const allTeam: string[][] = [];
  team.forEach((e) => {
    allTeam.push(e.member);
  });
  console.log("suffer");
  const result = allTeam.slice().sort(() => Math.random() - 0.5);
  console.log(result);

  return result;
}
watch(
  () => teamLimit.value,
  (value) => {
    const removeItem: TeamLock[] = [];
    teamLocks.value.forEach((e: TeamLock, index) => {
      removeItem.push({
        teamId: e.teamId,
        teamMember: e.teamMember.slice(0, value),
      });
    });
    teamLocks.value = removeItem;
  }
);
function resetTextTeam() {
  localStorage.removeItem("textTeam");
  localStorage.removeItem("courtNumber");
  localStorage.removeItem("winScore");
  localStorage.removeItem("winStreak");
  localStorage.removeItem("teamLimit");
  localStorage.removeItem("newbiesUser");
  textTeam.value = "";
  courtNumber.value = 1;
  winScore.value = 15;
  winStreak.value = 2;
  teamLimit.value = 2;
}
function setMember() {
  const team = SplitTeam();
  if (!team) {
    member.value = [];
    return;
  }
  member.value = team;
}
async function createTeam() {
  if (textTeam.value.trim() === "") {
    alert("ใส่ชื่อผู้เล่นด้วย");
    return;
  }
  if (teamLocks.value.some((e) => e.teamMember.some((x) => x.trim() === ""))) {
    alert("ใส่ชื่อผู้เล่นทีมล็อคไม่ครบ");
    return;
  }
  const team = SplitTeam();
  if (!team) return;
  member.value = team;
  if (member.value.length < 1) {
    alert("ใส่ชื่อผู้เล่นด้วย");
    return;
  }
  const splitTeam = Math.ceil(member.value.length / teamLimit.value);
  if (
    splitTeam +
      (teamLocks.value
        .map((subArray) => subArray.teamMember.length)
        .reduce((total, current) => total + current, 0) ?? 0) <
    courtNumber.value * 2
  ) {
    alert(
      `ใส่จำนวนคนไม่พอ ขั้นต่ำ ${courtNumber.value * 2 * teamLimit.value} คน`
    );
    return;
  }
  // showAdvanceSetting.value = false
  // isActive.value = false
  localStorage.setItem("textTeam", textTeam.value);
  localStorage.setItem("courtNumber", courtNumber.value.toString());
  localStorage.setItem("winScore", winScore.value.toString());
  localStorage.setItem("winStreak", winStreak.value.toString());
  localStorage.setItem("teamLimit", teamLimit.value.toString());
  localStorage.setItem("teamLock", JSON.stringify(teamLocks.value));
  setCourtNumber(courtNumber.value);
  resetTeam();
  setTeamLimit(teamLimit.value);
  setWinScore(winScore.value);
  setWinStreak(winStreak.value);

  member.value = shufferMember(member.value);
  member.value.forEach((player) => {
    addTeamMember(player);
  });
  teamLocks.value.forEach((e) => {
    addNewTeam(e.teamMember);
  });
  console.log(teamLocks.value);

  const _team = teamState.value;
  const sufferTeam = shufferTeam(_team);
  setTeam(sufferTeam);

  const payload = {
    setName: setName.value,
    members: member.value,
    teamLimit: teamLimit.value,
    winScore: winScore.value,
    winStreak: winStreak.value,
    courtNumber: courtNumber.value,
    roomId: roomId,
    teamLock: teamLocks.value,
  };
  const data = await fetch(`https://bad-boy-service.vercel.app/team`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data type must match "Content-Type" header
  }).then((e) => e.json());
  if (!data) return;
  console.log(data);

  router.push({ name: "TeamView", params: { teamId: data.id } });
}
</script>
<style scoped lang="scss">
textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 1px solid #c0c0c0;
  border-radius: 12px;
  background-color: #f1f2ff;
  font-size: 16px;
  resize: none;
}

textarea:focus {
  outline: none !important;
  border: 1px solid #7378db;
  box-shadow: 0 0 10px #eeeeee;
}

::v-deep(.v-container) {
  max-width: 100% !important;
}
::v-deep(.v-input__details) {
  display: none;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.swipe {
  position: fixed;
  z-index: 120;
  top: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  z-index: 100;
}

.swipe-word {
  color: #d1d4ff;
  font-size: 30px;
  font-weight: bold;
}
</style>
