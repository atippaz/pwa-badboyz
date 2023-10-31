import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export interface TeamMember {
    member: string[]
    order: number
}
export const useTeamStore = defineStore('teamStore', () => {
    const teamState = ref<TeamMember[]>([{ member: [], order: 1 }])
    const teamLimit = ref()
    const teamMember = computed(() => teamState.value)
    const nextTeam = ref(0)

    function getTeamQueue(number: number) {
        if (number < 1) return
        nextTeam.value = number
        return teamState.value.length >= number - 1
            ? teamState.value[number - 1]
            : teamState.value[0]
    }

    function getRemainQueue() {
        return teamState.value.slice(nextTeam.value) ?? []
    }

    function setTeamLimit(number: number) {
        teamLimit.value = number
    }

    function resetTeam() {
        teamState.value = []
    }

    function addTeamMember(player: string) {
        const index =
            teamState.value.length - 1 > 0 ? teamState.value.length - 1 : 0
        if (player === '') return
        if (
            teamState.value.length <= 0 ||
            teamState.value[index].member.length >= teamLimit.value
        ) {
            teamState.value.push({
                member: [player],
                order: teamState.value.length + 1,
            })
            return
        }
        teamState.value[index].member.push(player)
    }

    function addNewTeam(player: string[]) {
        teamState.value.push({
            member: player,
            order: teamState.value.length + 1,
        })
    }

    function setTeam(team: string[][]) {
        team.forEach((e, teamIndex) => {
            teamState.value[teamIndex].member = e
            teamState.value[teamIndex].order = teamIndex
        })
    }

    return {
        teamState,
        teamMember,
        setTeamLimit,
        addTeamMember,
        resetTeam,
        getRemainQueue,
        getTeamQueue,
        setTeam,
        addNewTeam
    }
})