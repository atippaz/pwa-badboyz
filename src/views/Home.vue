<template>
<div>
  <div class="h-100">
        <div>
          
          <v-container class="pa-0 ma-0">
          <v-row no-gutters class="h-100">
            <v-col align-self="start" cols="12">
              <div>
                <div style="color: #838383; margin-bottom: 12px">
                  Room Name
                </div>
                <v-text-field v-model="roomName" placeholder="room name"></v-text-field>
              </div>
              <div :class="{}">
                <div>
                  <div class="d-flex justify-space-between align-center mb-2">
            <div class="mb-1 text-gray-text" style="font-size: 18px">
              กรอกรายชื่อทีม
            </div>
            
          </div>
          <v-textarea v-model="textTeam" placeholder="
ตีแบดวันอาทิตย์ 18.30-20.30
1.xxx
2.xxx">
          </v-textarea>
                </div>
                <div>
                  <div style="
                                          color: #838383;
                                          margin-bottom: 12px;
                                      ">
                    ล็อคคู่
                  </div>
                  <div>
                    <div v-for="(lock, indexl) in teamLocks" :key="lock.teamId">
                      <v-row class="d-flex">
                        <v-col v-for="(
                                                      i, index
                                                  ) in teamLimit" :key="index">
                          <v-text-field density="compact" type="text" v-model="lock.teamMember[
                            index
                          ]
                            " />
                        </v-col>
                        <v-col>
                          <v-btn class="w-100 bg-error text-white" rounded="xl" variant="flat" @click="
                            deleteLockTeam(
                              indexl
                            )
                            ">ลบ</v-btn>
                        </v-col>
                      </v-row>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn variant="flat" @click="addLockTeam" class="w-100 text-primary" style="
                                                  background-color: #f1f2ff;
                                              " rounded="xl">เพิ่มทีม</v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-space-between my-2">
                <div style="font-size: 12px; color: #838383" class="d-flex align-center">
                  <div v-if="!showAdvanceSetting">
                    ตั้งค่าเพิ่มเติมที่ปุ่มข้างๆ
                  </div>
                </div>
                <div @click="
                  showAdvanceSetting = !showAdvanceSetting
                  ">
                  <span class="text-primary">Advance Settings</span>
                  <span>
                    <v-icon color="primary" :style="{
                      transform: showAdvanceSetting
                        ? ''
                        : 'scaleY(-1)',
                    }">
                      mdi-chevron-up
                    </v-icon>
                  </span>
                </div>
              </div>
              <div v-if="showAdvanceSetting">
                <TeamAdvanceSetting v-model:court-number="courtNumber" v-model:team-limit="teamLimit"
                  v-model:win-streak="winStreak" @update:win-score="(e: number) => {
                    winScore = e
                  }"></TeamAdvanceSetting>
              </div>
            </v-col>
          </v-row>
        </v-container>
       </div>
      </div>
      <v-btn style="position: fixed; bottom: 80px; right: 16px; z-index: 300" @click="randomTeam"
       >
        สร้างทีม
      </v-btn>
</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTeamStore } from '@/store/team'
import { useCourtStore } from '@/store/court'
import TeamAdvanceSetting from '@/components/page/randomTeam/AdvanceSetting.vue'
import router from '@/router'
import type { TeamMember } from '@/store/team'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const showAdvanceSetting = ref(false)
const roomName = ref('')

const { setTeamLimit, addTeamMember, resetTeam, addNewTeam, setTeam } =
  useTeamStore()
const { setCourtNumber, setWinScore, setWinStreak } = useCourtStore()
const { teamMember, teamState } = storeToRefs(useTeamStore())
const openSat = computed(() => saturdayMember.value.length != 0)
const openSun = computed(() => sundayMember.value.length != 0)
interface TeamLock {
  teamId: number
  teamMember: string[]
}
const teamLockList = computed(() => teamLocks.value)
const teamLocks = ref<TeamLock[]>([])
const textTwoDay = ref('')
const courtNumber = ref(
  isNaN(parseInt(localStorage.getItem('courtNumber') ?? ''))
    ? 1
    : parseInt(localStorage.getItem('courtNumber')!)
)
const winStreak = ref(
  isNaN(parseInt(localStorage.getItem('winStreak') ?? ''))
    ? 2
    : parseInt(localStorage.getItem('winStreak')!)
)
const teamLimit = ref(
  isNaN(parseInt(localStorage.getItem('teamLimit') ?? ''))
    ? 2
    : parseInt(localStorage.getItem('teamLimit')!)
)
const winScore = ref(
  isNaN(parseInt(localStorage.getItem('winScore') ?? ''))
    ? 15
    : parseInt(localStorage.getItem('winScore')!)
)
const openCopyDay = ref(false)
const textTeam = ref(localStorage.getItem('textTeam') ?? '')
const member = ref<string[]>([])
const saturdayMember = ref('')
const sundayMember = ref('')
watch(
  () => textTwoDay.value,
  (newValue) => {
    openCopyDay.value = false
  }
)
function addLockTeam() {
  const newTeamLock: TeamLock = {
    teamId: teamLocks.value.length + 1,
    teamMember: [],
  }
  for (let index = 0; index < teamLimit.value; index++) {
    newTeamLock.teamMember.push('')
  }
  teamLocks.value.push(newTeamLock)
}
function deleteLockTeam(teamlockIndex: number) {
  teamLocks.value.splice(teamlockIndex, 1)
}
function getFormat() {
  navigator.clipboard.writeText(`ตีแบดวันเสาร์ xx.xx-xx.xx
1.xxx
2.xxxx
--------

ตีแบดวันอาทิตย์ xx.xx-xx.xx
1.xxx
2.xxxx
`)
}
function splitTeam() {
  saturdayMember.value = ''
  textTwoDay.value = ''
  sundayMember.value = ''
}

function SplitTeam():string[] {
  const text = textTeam.value.split('\n')
  let pattern = [/ตีเเบด/,/ตีแบด/,/วันอาทิตย์/,/วันเสาร์/]
  if(text.length<1) return []
  
    if(pattern.some(x=>x.test(text[0]))){
      text.splice(0, 1)
    }
    return text.map((x)=>{
      const patternInner = /\d+\./
console.log(patternInner);

const indexPattern = x.search(patternInner);
console.log(indexPattern);
return indexPattern !== -1 ?
x.slice(0, indexPattern) + x.slice(indexPattern + (indexPattern.toString().length + 1)):
x})
}

function generateMember() {
  return textTeam.value.split('\n').length > 0
    ? textTeam.value.trim().split('\n')
    : []
}
function shufferMember(member: string[]) {
  for (let i = member.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[member[i], member[j]] = [member[j], member[i]]
  }
  return member
}
function shufferTeam(team: TeamMember[]) {
  const allTeam: string[][] = []
  team.forEach((e) => {
    allTeam.push(e.member)
  })
  console.log('suffer')
  const result = allTeam.slice().sort(() => Math.random() - 0.5)
  console.log(result)

  return result
}
watch(
  () => teamLimit.value,
  (value) => {
    const removeItem: TeamLock[] = []
    teamLocks.value.forEach((e: TeamLock, index) => {
      removeItem.push({
        teamId: e.teamId,
        teamMember: e.teamMember.slice(0, value),
      })
    })
    teamLocks.value = removeItem
  }
)
function resetTextTeam() {
  localStorage.removeItem('textTeam')
  localStorage.removeItem('courtNumber')
  localStorage.removeItem('winScore')
  localStorage.removeItem('winStreak')
  localStorage.removeItem('teamLimit')
  localStorage.removeItem('newbiesUser')
  textTeam.value = ''
  courtNumber.value = 1
  winScore.value = 15
  winStreak.value = 2
  teamLimit.value = 2
}
async function randomTeam() {
  if (textTeam.value.trim() === '') {
    alert('ใส่ชื่อผู้เล่นด้วย')
    return
  }
  if (
    teamLocks.value.some((e) => e.teamMember.some((x) => x.trim() === ''))
  ) {
    alert('ใส่ชื่อผู้เล่นทีมล็อคไม่ครบ')
    return
  }
  member.value = SplitTeam() 
  const splitTeam = Math.ceil(member.value.length / teamLimit.value)
  if (
    splitTeam +
    (teamLocks.value
      .map((subArray) => subArray.teamMember.length)
      .reduce((total, current) => total + current, 0) ?? 0) <
    courtNumber.value * 2
  ) {
    alert(
      `ใส่จำนวนคนไม่พอ ขั้นต่ำ ${courtNumber.value * 2 * teamLimit.value
      } คน`
    )
    return
  }
  // showAdvanceSetting.value = false
  // isActive.value = false
  localStorage.setItem('textTeam', textTeam.value)
  localStorage.setItem('courtNumber', courtNumber.value.toString())
  localStorage.setItem('winScore', winScore.value.toString())
  localStorage.setItem('winStreak', winStreak.value.toString())
  localStorage.setItem('teamLimit', teamLimit.value.toString())
  setCourtNumber(courtNumber.value)
  resetTeam()
  setTeamLimit(teamLimit.value)
  setWinScore(winScore.value)
  setWinStreak(winStreak.value)

  member.value = shufferMember(member.value)
  member.value.forEach((player) => {
    addTeamMember(player)
  })
  teamLocks.value.forEach((e) => {
    addNewTeam(e.teamMember)
  })
  const _team = teamState.value
  const sufferTeam = shufferTeam(_team)
  setTeam(sufferTeam)

  const payload = {
    roomName: roomName.value,
    allTeam: teamMember.value,
    teamLimit: teamLimit.value,
    winScore: winScore.value,
    winStreak: winStreak.value,
    courtNumber: courtNumber.value,
  }
  const data = await fetch('https://bad-boy-service.vercel.app/room', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // body data type must match "Content-Type" header
  }).then((e) => e.json())
  if (!data) return
  console.log(data)

  router.push({ name: 'TeamListPage', params: { roomId: data.id } })
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