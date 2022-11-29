import { App, Plugin } from 'vue'
import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import useUnleashProvide, { IProvideOptions } from './useUnleashProvide'


const plugin: Plugin = {
  install(app: App, { config, unleashClient, startClient }: IProvideOptions) {
    const { context, update, start } = useUnleashProvide({ config, unleashClient, startClient })

    app.provide(ContextStateSymbol, context)
    app.provide(ContextUpdateSymbol, update)

    start()
  }
}

export default plugin
