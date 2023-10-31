<template>
    <div>
        <div class="mt-2">
            <span class="text-gray-text">จำนวนคนในทีม</span>
            <v-text-field density="compact" :value="props.teamLimit" readonly>
                <template v-slot:append-inner>
                    <div class="d-flex">
                        <v-icon class="click-btn" color="red" @click="() => {
                            if (props.teamLimit > 1)
                                emits(
                                    'update:teamLimit',
                                    props.teamLimit - 1
                                )
                        }
                            ">
                            mdi-minus
                        </v-icon>
                        <v-icon class="ml-1 click-btn" color="green" @click="
                            emits('update:teamLimit', props.teamLimit + 1)
                            ">
                            mdi-plus
                        </v-icon>
                    </div>
                </template>
            </v-text-field>
        </div>
        <div class="mt-2">
            <span class="text-gray-text">จำนวนคอร์ท</span>
            <v-text-field readonly density="compact" :value="props.courtNumber">
                <template v-slot:append-inner>
                    <div class="d-flex">
                        <v-icon class="click-btn" color="red" @click="() => {
                            if (props.courtNumber > 1)
                                emits(
                                    'update:courtNumber',
                                    props.courtNumber - 1
                                )
                        }
                            ">
                            mdi-minus
                        </v-icon>
                        <v-icon class="ml-1 click-btn" color="green" @click="
                            emits(
                                'update:courtNumber',
                                props.courtNumber + 1
                            )
                            ">
                            mdi-plus
                        </v-icon>
                    </div>
                </template>
            </v-text-field>
        </div>
        <div class="mt-2">
            <span class="text-gray-text">ชนะติดต่อกัน</span>
            <v-text-field readonly :value="props.winStreak" density="compact">
                <template v-slot:append-inner>
                    <div class="d-flex">
                        <v-icon class="click-btn" color="red" @click="() => {
                            if (props.winStreak > 1)
                                emits(
                                    'update:winStreak',
                                    props.winStreak - 1
                                )
                        }
                            ">
                            mdi-minus
                        </v-icon>
                        <v-icon class="ml-1 click-btn" color="green" @click="
                            emits('update:winStreak', props.winStreak + 1)
                            ">
                            mdi-plus
                        </v-icon>
                    </div>
                </template>
            </v-text-field>
        </div>
        <div class="mt-2">
            <span class="text-gray-text">เเต้มชนะ</span>
            <v-text-field density="compact" :value="winScore" readonly>
                <template v-slot:append-inner>
                    <div class="d-flex">
                        <v-icon class="click-btn" color="red" @click="() => {
                            if (winScoreIndex < 1) return
                            winScoreIndex -= 1
                            hasChange = true
                            emits('update:winScore', winScore)
                        }
                            ">
                            mdi-chevron-left
                        </v-icon>
                        <v-icon class="ml-1 click-btn" color="green" @click="() => {
                            if (
                                winScoreIndex >=
                                listScoreGame.length - 1
                            )
                                return
                            hasChange = true
                            winScoreIndex += 1
                            emits('update:winScore', winScore)
                        }
                            ">
                            mdi-chevron-right
                        </v-icon>
                    </div>
                </template>
            </v-text-field>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const listScoreGame = [11, 15, 21]
const winScoreIndex = ref(1)
const hasChange = ref(false)
const winScore = computed(() => {
    return !hasChange.value &&
        !isNaN(parseInt(localStorage.getItem('winScore') ?? ''))
        ? parseInt(localStorage.getItem('winScore')!)
        : listScoreGame[winScoreIndex.value]
})
const rules = [
    (value: number) => !!value || 'Required.',
    (value: number) => value > 0 || 'not zero',
]
const props = withDefaults(
    defineProps<{
        courtNumber: number
        winStreak: number
        teamLimit: number
    }>(),
    {
        courtNumber: 1,
        teamLimit: 2,
        winStreak: 2,
        winScore: 15,
    }
)
const emits = defineEmits<{
    (e: 'update:courtNumber', value: number): void
    (e: 'update:teamLimit', value: number): void
    (e: 'update:winStreak', value: number): void
    (e: 'update:winScore', value: number): void
}>()
</script>
<style scoped lang="scss">
::v-deep(.v-input__details) {
    display: none;
}

.click-btn:active {
    border-radius: 20px;
    background-color: rgb(194, 194, 194);
}
</style>