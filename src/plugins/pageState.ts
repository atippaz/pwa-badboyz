import { type Plugin, type InjectionKey, ref, computed } from 'vue'
export type PluginInstance = ReturnType<typeof $pageState>
export const pageStatePluginSymbol: InjectionKey<PluginInstance> =
    Symbol('$pageState')
export function $pageState() {
    let createRoomTeam = ref(false)

    function setCreateRoomTeam() {
        createRoomTeam.value = true
    }
    function resetCreateRoomTeam() {
        createRoomTeam.value = false
    }

    return {
        isCreateTeam: computed(() => createRoomTeam.value),
        setCreateRoomTeam,
        resetCreateRoomTeam,
    }
}

const plugin: Plugin = {
    install: (app, options) => {
        const sample = $pageState()
        app.provide(pageStatePluginSymbol, sample)
    },
}
export default plugin