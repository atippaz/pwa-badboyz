import {
    type Plugin,
    type InjectionKey,
    ref,
    watch,
    reactive,
    computed,
} from 'vue'
export type PluginInstance = ReturnType<typeof $polling>
export const pollingPluginSymbol: InjectionKey<PluginInstance> =
    Symbol('$polling')
export function $polling() {
    const path = 'https://bad-boy-service.vercel.app/pollingGetData'
    let interval: any = null
    const event: any = []
    function addEventListening(fn: Function) {
        event.push(fn)
    }

    async function endConnection(callback?: Function) {
        console.log('remove interval')
        clearInterval(interval)
        setTimeout(() => {
            if (callback) callback()
        }, 1000)
    }

    function pullConnection() {
        console.log('call api')

        fetch(path)
            .then((e) => e.json())
            .then((e) => {
                event.forEach((fn: Function) => {
                    fn(e)
                })
            })
    }

    function startConection(fn: Function) {
        if (interval) return
        // pullConnection()
        interval = setInterval(() => {
            console.log('start polling')
            fn()
            // pullConnection()
        }, 1000)
    }

    return {
        addEventListening,
        endConnection,
        startConection,
    }
}

const plugin: Plugin = {
    install: (app, options) => {
        const sample = $polling()
        app.provide(pollingPluginSymbol, sample)
    },
}
export default plugin