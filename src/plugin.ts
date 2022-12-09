import { isVue3, Plugin } from 'vue-demi'
import { ContextStateSymbol, ContextUpdateSymbol } from './context'
import useUnleashProvide, { IProvideOptions } from './useUnleashProvide'

export function plugin({
  config,
  unleashClient,
  startClient
}: IProvideOptions): Plugin {
  const { context, update, start } = useUnleashProvide({
    config,
    unleashClient,
    startClient
  })

  return {
    install(vue) {
      if (isVue3) {
        const vue3 = vue

        vue3.provide(ContextStateSymbol, context)
        vue3.provide(ContextUpdateSymbol, update)
      } else {
        const vue2 = vue

        vue2.mixin({
          provide() {
            return {
              [ContextStateSymbol]: context,
              [ContextUpdateSymbol]: update
            }
          }
        })
      }

      start()
    }
  }
}

export default plugin
