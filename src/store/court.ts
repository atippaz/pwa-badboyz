import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export interface Court {
    scoreTeamA: number
    scoreTeamB: number
    winScore: number
}
export const useCourtStore = defineStore('courtStore', () => {
    const courtNumberState = ref(1)
    const winScore = ref(0)
    const winStreak = ref(0)
    const courtState = ref<Court[]>()
    const court = computed(() => courtState.value)
    const courtNumber = computed(() => courtNumberState.value)
    function setCourtNumber(number: number) {
        if (number < 0) return
        courtNumberState.value = number
        courtState.value = []
        let courtMarker = 0
        while (courtMarker != courtNumberState.value) {
            courtState.value.push({
                scoreTeamA: 0,
                scoreTeamB: 0,
                winScore: winScore.value,
            })
            courtMarker++
        }
    }
    function setWinScore(number: number) {
        if (number < 0) return
        winScore.value = number
    }
    function setWinStreak(number: number) {
        if (number < 0) return
        winStreak.value = number
    }
    return {
        courtNumber,
        setCourtNumber,
        setWinStreak,
        setWinScore,
        court,
    }
})