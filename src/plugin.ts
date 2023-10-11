import { App, Plugin, ref } from 'vue'
import {
  ContextReadySymbol,
  ContextStateSymbol,
  ContextUpdateSymbol
} from './context'
import useUnleashProvide, { IProvideOptions } from './useUnleashProvide'

const plugin: Plugin = {
  install(app: App, { config, unleashClient, startClient }: IProvideOptions) {
    const { context, update, start } = useUnleashProvide({
      config,
      unleashClient,
      startClient
    })

    app.provide(ContextStateSymbol, context)
    app.provide(ContextUpdateSymbol, update)

    const isReady = ref(start())

    app.provide(ContextReadySymbol, isReady)
  },
}

export default plugin
