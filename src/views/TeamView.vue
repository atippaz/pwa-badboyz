<template>
    <div class="h-100">
        <h1>ห้อง : {{ roomName }}</h1>
        <div class="mb-2" style="font-size: 20px; font-weight: bold">
            ทีมปัจจุบัน
        </div>
        <div>
            <CardVersus v-for="(team, index) in courtTeam" class="mb-4" :court-number="index + 1" :team-a="{ score: 0 }"
                :team-b="{ score: 0 }">
                <template #teamA>
                    team
                    {{ team.teamA.order }}
                    <div v-for="member in team.teamA.member" class="trunt-word">
                        {{ member }}
                    </div>
                </template>
                <template #teamB>
                    team
                    {{ team.teamB.order }}
                    <div v-for="member in team.teamB.member" class="trunt-word">
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
                <v-card v-for="team in nextTeam" class="mb-2" elevation="0" style="
                        border-radius: 8px;
                        border: 1px solid rgb(203, 203, 203);
                    ">
                    <template v-slot:text>
                        team {{ team.order }} : {{ team.member.join(' , ') }}
                    </template>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTeamStore } from '@/store/team'
import { storeToRefs } from 'pinia'
import { useCourtStore } from '@/store/court'
import CardVersus from '@/components/page/teamListView/CardTeamVersus.vue'
import { computed, onMounted, ref, inject } from 'vue'
import { pageStatePluginSymbol } from '@/plugins/pageState'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
const pageState = inject(pageStatePluginSymbol)!
const teamStore = useTeamStore()
const { court } = storeToRefs(useCourtStore())
const teamRemain = computed(() => teamStore.getRemainQueue())
const teams = ref<any>([])
import { loaderPluginSymbol } from '@/plugins/loading'
const loading = inject(loaderPluginSymbol)!
court.value?.forEach((e, index) => {
    const merge = []
    const dataA = teamStore.getTeamQueue(index * 2 + 1)
    merge.push(dataA)
    const dataB = teamStore.getTeamQueue((index + 1) * 2)
    merge.push(dataB)
    teams.value.push(merge)
})
const nextTeam = ref<any>([])
const courtTeam = ref<any>([])
const roomName = ref()
const courtNumber = ref(0)
const teamLimit = ref(0)
onMounted(async () => {
    try {
        loading.setLoadingOn()
        const roomId = route.params.roomId
        if (!roomId) throw new Error('')

        const { roomData: data, _id } = await fetch(
            'https://bad-boy-service.vercel.app/room/' + roomId
        ).then((e) => e.json())
        console.log(data)
        if (!data) throw new Error('')

        roomName.value = data.roomName
        courtNumber.value = data.courtNumber
        teamLimit.value = data.teamLimit
        setTeam(data)
        loading.setLoadingOff()

        // if (!court.value) {
        // } else {
        //     pageState.setCreateRoomTeam()
        // }
    } catch (e) {
        console.log(e)
        router.push({ name: 'HomePage' })
    }
})
function setTeam(team: any) {
    const needTeam = courtNumber.value * 2

    for (let index = 0; index < needTeam; index += 1) {
        if (index % 2 !== 0) {
            courtTeam.value.push({
                teamA: team.allTeam[index - 1],
                teamB: team.allTeam[index],
            })
        }
    }
    team.allTeam.forEach((e: any, index: number) => {
        if (index >= needTeam) {
            nextTeam.value.push(e)
        }
    })
}
</script>
<style scoped lang="scss">
.trunt-word {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>