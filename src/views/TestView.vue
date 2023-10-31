<template>
    <div v-show="counterTime === 0">{{ word }}</div>
    <div v-show="counterTime > 0">
        {{ counterTime }}
    </div>

    {{ pollingTest }}
</template>
<script setup lang="ts">
import { inject, ref, onMounted, watch } from 'vue'
import { pollingPluginSymbol } from '@/plugins/pollingEvent'
import { onUnmounted } from 'vue'
const counterTime = ref<number>(10)
const word = 'waiting api . . .'
const pollingStop = ref(false)
const pollingTest = ref('test polling Data')
const polling = inject(pollingPluginSymbol)!
let intervalMinus: any = setInterval(() => {
    counterTime.value -= 1
}, 1000)

function updateValue(e: any) {
    console.log(e)
    pollingTest.value = e
    if (intervalMinus === null && !pollingStop) {
        intervalMinus = setInterval(() => {
            counterTime.value -= 1
        }, 1000)
        counterTime.value = 10
    }
}
watch(
    () => counterTime.value,
    (newValue) => {
        if (newValue <= 0) {
            clearInterval(intervalMinus)
            intervalMinus = null
        }
    }
)
onMounted(async () => {
    polling.addEventListening(updateValue)
    polling.startConection(updateValue)
    setTimeout(() => {
        console.log('timeout')
        pollingStop.value = false
        polling.endConnection(() => {
            pollingTest.value = 'stop pulling test'
        })
        counterTime.value = -1
    }, 60000)
})
onUnmounted(() => {
    polling.endConnection()
})
</script>